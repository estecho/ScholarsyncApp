"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useNav } from "@/contexts/NavContext";
import AIAnalysisOverlay from "@/components/AIAnalysisOverlay";
import QuizModal from "@/components/QuizModal";
import MyDayView from "@/components/home/MyDayView";
import CampusLifeView from "@/components/home/CampusLifeView";
import OmniPostModal from "@/components/campus/OmniPostModal";
import { CampusItem, getInitialMode } from "@/types/campus";
import { PanInfo } from "framer-motion";
import { getCurrentUserAvatar } from "@/lib/avatarUtils";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { viewMode, setViewMode, currentView, setCurrentView } = useNav();
  
  const [courseData, setCourseData] = useState({
    name: "Advanced Algorithms",
    time: "10:00 - 11:30 AM",
    location: "Room 304",
    professor: "Prof. Smith",
  });

  // OmniPostModal state
  const [omniPostModalOpen, setOmniPostModalOpen] = useState(false);
  const [draggedCampusItem, setDraggedCampusItem] = useState<CampusItem | null>(null);
  const [campusLifeResetKey, setCampusLifeResetKey] = useState(0);

  // Scroll detection state
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setIsScrolled(false);
    isScrolledRef.current = false;
  }, [currentView]);

  // Optimized scroll detection with useCallback
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const newIsScrolled = currentScrollY > 50;
    
    if (newIsScrolled !== isScrolledRef.current) {
      isScrolledRef.current = newIsScrolled;
      setIsScrolled(newIsScrolled);
    }
  }, []);

  // Scroll detection with throttling
  useEffect(() => {
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll]);

  // Handle drag start for My Day view
  const handleDragStart = () => {
    setViewMode("dragging");
  };

  // Handle drag start for Campus Life view
  const handleCampusDragStart = (item: CampusItem) => {
    setViewMode("dragging");
    setDraggedCampusItem(item);
  };

  // Handle drag end for My Day view
  const handleDragEnd = (event: any, info: any) => {
    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // AI orb is positioned at bottom center
    // Check if card is dropped near the bottom center area (within ~150px radius)
    const orbCenterX = viewportWidth / 2;
    const orbCenterY = viewportHeight - 100; // Approximate orb position

    // Get the drop position relative to viewport
    const dropX = info.point.x;
    const dropY = info.point.y;

    // Calculate distance from drop point to orb center
    const distance = Math.sqrt(
      Math.pow(dropX - orbCenterX, 2) + Math.pow(dropY - orbCenterY, 2)
    );

    // If dropped within 150px of the orb, trigger analyzing
    if (distance < 150 && dropY > viewportHeight - 200) {
      setViewMode("analyzing");
    } else {
      setViewMode("idle");
    }
  };

  // Handle drag end for Campus Life view
  const handleCampusDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    item: CampusItem
  ) => {
    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // AI orb is positioned at bottom center
    const orbCenterX = viewportWidth / 2;
    const orbCenterY = viewportHeight - 100;

    // Get drag information
    const dropX = info.point.x;
    const dropY = info.point.y;
    const dragOffsetY = info.offset.y; // 向下拖拽的距离
    const dragVelocityY = info.velocity.y; // 向下拖拽的速度

    // Calculate distance from drop point to orb center
    const distance = Math.sqrt(
      Math.pow(dropX - orbCenterX, 2) + Math.pow(dropY - orbCenterY, 2)
    );

    // 多条件检测：满足任一条件即可触发
    const isNearOrb = distance < 250 && dropY > viewportHeight - 300; // 放宽位置检测
    const hasDownwardDrag = dragOffsetY > 80; // 向下拖拽超过 80px
    const hasDownwardVelocity = dragVelocityY > 300; // 向下速度超过 300px/s
    const isInBottomHalf = dropY > viewportHeight / 2; // 在屏幕下半部分

    // 如果满足以下任一条件，打开 OmniPostModal：
    // 1. 在AI球附近
    // 2. 有明显的向下拖拽趋势（拖拽距离 > 80px 且最终位置在屏幕下半部分）
    // 3. 有快速的向下拖拽速度（速度 > 300px/s）
    if (
      isNearOrb ||
      (hasDownwardDrag && isInBottomHalf) ||
      (hasDownwardVelocity && isInBottomHalf)
    ) {
      // Ensure we use the current dropped item
      setDraggedCampusItem(item);
      setOmniPostModalOpen(true);
      setViewMode("idle");
    } else {
      setViewMode("idle");
      setDraggedCampusItem(null);
    }
  };

  const handleCloseOmniPostModal = () => {
    setOmniPostModalOpen(false);
    setDraggedCampusItem(null);
    // Reset card positions by incrementing resetKey
    setCampusLifeResetKey((prev) => prev + 1);
  };

  const handleQuizMe = () => {
    setViewMode("quizMode");
  };

  const handleCloseOverlay = () => {
    setViewMode("idle");
  };

  const handleCloseQuiz = () => {
    setViewMode("idle");
  };

  // Check for restoreQuiz parameter on mount
  useEffect(() => {
    const restoreQuiz = searchParams.get("restoreQuiz");
    if (restoreQuiz === "true") {
      // Restore Quiz modal state
      setViewMode("quizMode");
      // Clean up URL parameter without adding to history
      router.replace("/home");
    }
  }, [searchParams, router]);

  const handleViewChange = (view: "my-day" | "campus-life") => {
    // 重置 viewMode 为 idle，避免模糊 overlay 继续显示
    setViewMode("idle");
    // 关闭任何打开的 modal
    setOmniPostModalOpen(false);
    setDraggedCampusItem(null);
    // 切换视图
    setCurrentView(view);
  };

  return (
    <PageTransition>
      <div className="relative w-full max-w-md mx-auto min-h-screen pb-32 bg-background-light dark:bg-background-dark" style={{ overflow: "visible", paddingBottom: "69px" }}>
        {/* Header Spacer - prevents content jump when header becomes fixed */}
        {isScrolled && (
          <div 
            className="h-[100px]"
            // #region agent log
            ref={(el) => {
              if (el && typeof window !== 'undefined') {
                const rect = el.getBoundingClientRect();
                fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/home/page.tsx:spacer',message:'Spacer rendered',data:{height:rect.height,top:rect.top,isScrolled,scrollY:window.scrollY},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
              }
            }}
            // #endregion
          />
        )}
        
        {/* Header */}
        <motion.header
          animate={{
            paddingTop: isScrolled ? "1rem" : "20px",
            paddingBottom: "0.5rem",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm px-5 transition-all ${
            isScrolled ? "fixed" : "sticky"
          }`}
          style={{
            top: 0,
            left: isScrolled ? 0 : "auto",
            right: isScrolled ? 0 : "auto",
            width: isScrolled ? "100%" : "auto",
            maxWidth: isScrolled ? "28rem" : "none",
            marginLeft: isScrolled ? "auto" : 0,
            marginRight: isScrolled ? "auto" : 0,
            willChange: "padding-top, padding-bottom",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`flex flex-col ${isScrolled ? "gap-0" : "gap-1"}`}>
              <div
                className={`flex items-center gap-2 text-gray-500 dark:text-gray-400 transition-all duration-200 ${
                  isScrolled ? "opacity-0 h-0 mb-0 overflow-hidden" : "opacity-100 h-auto mb-1"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  partly_cloudy_day
                </span>
                <span className="text-sm font-medium">24°C Sunny</span>
              </div>
              <h1
                className={`font-bold tracking-tight text-[#1d1d1f] dark:text-white transition-all duration-200 ${
                  isScrolled ? "text-lg" : "text-2xl"
                }`}
              >
                Good Morning, Alex
              </h1>
            </div>
            <button
              aria-label="Profile"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shrink-0 overflow-hidden"
            >
              <img
                src={getCurrentUserAvatar()}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=Alex+Chen&size=40&background=6366f1&color=ffffff&bold=true&format=png`;
                }}
              />
            </button>
          </div>
          {/* Toggle Switch */}
          <div
            className={`relative flex w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 p-1 shadow-inner max-w-[280px] transition-all duration-200 ${
              isScrolled ? "h-10 mb-1" : "h-12 mb-1"
            }`}
          >
            {/* Animated Background Slider */}
            <motion.div
              layoutId="toggle-background"
              layout
              className="absolute rounded-full bg-primary shadow-md"
              style={{
                width: "calc(50% - 4px)",
                height: "calc(100% - 8px)",
                left: currentView === "my-day" ? "4px" : "calc(50% + 0px)",
                top: "4px",
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
            <button
              onClick={() => handleViewChange("my-day")}
              className="relative flex h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-all duration-300 z-10"
            >
              <span
                className={`text-sm font-semibold transition-colors ${
                  currentView === "my-day"
                    ? "text-white"
                    : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                }`}
              >
                My Day
              </span>
            </button>
            <button
              onClick={() => handleViewChange("campus-life")}
              className="relative flex h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-all duration-300 z-10"
            >
              <span
                className={`text-sm font-semibold transition-colors ${
                  currentView === "campus-life"
                    ? "text-white"
                    : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                }`}
              >
                Campus Life
              </span>
            </button>
          </div>
        </motion.header>

        {/* Background Blur Overlay */}
        <AnimatePresence>
          {(viewMode === "dragging" || viewMode === "analyzing" || viewMode === "quizMode" || omniPostModalOpen) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed inset-0 z-30 pointer-events-none ${
                viewMode === "analyzing" || viewMode === "quizMode" || omniPostModalOpen
                  ? "filter blur-xl brightness-[0.3]"
                  : "filter blur-[2px] opacity-60"
              }`}
            >
              <div className="relative w-full max-w-md mx-auto min-h-screen pb-32">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm pt-12 pb-2 px-6 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">
                          partly_cloudy_day
                        </span>
                        <span className="text-sm font-medium">24°C Sunny</span>
                      </div>
                      <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
                        Good Morning, Alex
                      </h1>
                    </div>
                    <button
                      aria-label="Profile"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors overflow-hidden"
                    >
                      <img
                        src={getCurrentUserAvatar()}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=Alex+Chen&size=40&background=6366f1&color=ffffff&bold=true&format=png`;
                        }}
                      />
                    </button>
                  </div>
                  <div className="relative flex h-12 w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 p-1 shadow-inner mb-1 max-w-[280px]">
                    <motion.div
                      layoutId="toggle-background"
                      className="absolute rounded-full bg-primary shadow-md"
                      style={{
                        width: "calc(50% - 4px)",
                        height: "calc(100% - 8px)",
                        left: currentView === "my-day" ? "4px" : "calc(50% + 0px)",
                        top: "4px",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                    <button className="relative flex h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-all duration-300 z-10">
                      <span className="text-sm font-semibold text-white">My Day</span>
                    </button>
                    <button className="relative flex h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-all duration-300 z-10">
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        Campus Life
                      </span>
                    </button>
                  </div>
                </header>

                {/* Main Content */}
                <main className="px-5 mt-4 flex flex-col gap-5">
                  {/* Current Class Card (Blurred) */}
                  {currentView === "my-day" && (
                    <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-surface-dark p-6 shadow-soft transition-all hover:shadow-lg border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30">
                      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-transparent blur-3xl dark:from-blue-900/20 dark:via-purple-900/10"></div>
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-5">
                          <div className="flex items-center gap-2 text-primary font-bold bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                            <span className="text-xs tracking-wide">{courseData.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full border border-red-100 dark:border-red-900/30 animate-pulseRed">
                            <span className="material-symbols-outlined text-[16px] text-red-500 fill-1">
                              warning
                            </span>
                            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                              Attendance Likely
                            </span>
                          </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
                          <span>{courseData.name}</span>
                        </h2>
                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm font-medium mb-6">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">
                              location_on
                            </span>
                            <span>{courseData.location}</span>
                          </div>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">person</span>
                            <span>{courseData.professor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </main>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content with View Switching */}
        <AnimatePresence mode="wait">
          {currentView === "my-day" ? (
            <motion.div
              key="my-day"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MyDayView
                viewMode={viewMode}
                courseData={courseData}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            </motion.div>
          ) : (
            <motion.div
              key="campus-life"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CampusLifeView
                onDragStart={handleCampusDragStart}
                onDragEnd={handleCampusDragEnd}
                isDragging={viewMode === "dragging"}
                resetKey={campusLifeResetKey}
                isScrolled={isScrolled}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Analysis Overlay */}
        <AIAnalysisOverlay
          isOpen={viewMode === "analyzing"}
          onClose={handleCloseOverlay}
          onQuizMe={handleQuizMe}
        />

        {/* Quiz Modal */}
        <QuizModal
          isOpen={viewMode === "quizMode"}
          onClose={handleCloseQuiz}
          courseName={courseData.name}
        />

        {/* OmniPostModal */}
        <OmniPostModal
          isOpen={omniPostModalOpen}
          onClose={handleCloseOmniPostModal}
          initialMode={draggedCampusItem ? getInitialMode(draggedCampusItem) : undefined}
          contextItem={draggedCampusItem}
        />
      </div>
    </PageTransition>
  );
}
