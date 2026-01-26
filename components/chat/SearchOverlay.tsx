"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useNav } from "@/contexts/NavContext";

type SearchView = "trigger" | "results";

type MatchResultType = "file" | "message";

interface LowMatchResult {
  id: string;
  type: MatchResultType;
  title: string;
  subtitle?: string;
  matchPercentage: number;
  matchLabel: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

export default function SearchOverlay() {
  const { searchOverlayOpen, setSearchOverlayOpen } = useNav();
  const [view, setView] = useState<SearchView>("trigger");
  const [searchQuery, setSearchQuery] = useState("PPT from Alex last week");
  const [isClosing, setIsClosing] = useState(false);

  // Low match results data
  const lowMatchResults: LowMatchResult[] = [
    {
      id: "1",
      type: "file",
      title: "Project_Outline_Draft.docx",
      subtitle: "Word • 1.8 MB",
      matchPercentage: 65,
      matchLabel: "Low Match",
      icon: "description",
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: "2",
      type: "message",
      title: "Discussion about presentation",
      subtitle: "CS 101 Group • 3 days ago",
      matchPercentage: 58,
      matchLabel: "Low Match",
      icon: "forum",
      iconBgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  // Reset to trigger view when overlay opens
  useEffect(() => {
    if (searchOverlayOpen) {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SearchOverlay.tsx:useEffect',message:'SearchOverlay opened',data:{searchOverlayOpen,viewportWidth:typeof window!=='undefined'?window.innerWidth:0,viewportHeight:typeof window!=='undefined'?window.innerHeight:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      setView("trigger");
      setIsClosing(false);
    }
  }, [searchOverlayOpen]);

  const handleSearch = () => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SearchOverlay.tsx:handleSearch',message:'handleSearch called',data:{currentView:view},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    setView("results");
  };

  const handleClose = () => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SearchOverlay.tsx:handleClose',message:'handleClose called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    setSearchOverlayOpen(false);
    setView("trigger");
  };

  const handleOpenFile = () => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SearchOverlay.tsx:handleOpenFile',message:'handleOpenFile called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    // TODO: Implement file opening logic
    console.log("Open file clicked");
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragOffsetY = info.offset.y;
    const dragVelocityY = info.velocity.y;
    
    // 如果向下拖拽超过 80px 或向下速度超过 300px/s，则触发关闭动画
    if (dragOffsetY > 80 || dragVelocityY > 300) {
      setIsClosing(true);
      // 等待动画完成后关闭
      setTimeout(() => {
        handleClose();
      }, 300);
    }
  };

  // Get match label color based on percentage
  const getMatchLabelColor = (percentage: number) => {
    if (percentage < 70) {
      return "text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/50";
    } else if (percentage < 85) {
      return "text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/30";
    }
    return "text-primary bg-primary/10 dark:bg-primary/20";
  };

  if (!searchOverlayOpen) return null;

  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SearchOverlay.tsx:render',message:'Rendering SearchOverlay',data:{view,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,documentWidth:document.documentElement.clientWidth},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  }
  // #endregion

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col max-w-md mx-auto"
        // #region agent log
        ref={(el) => {
          if (el && typeof window !== 'undefined') {
            const rect = el.getBoundingClientRect();
            fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SearchOverlay.tsx:motion.div',message:'Container dimensions post-fix',data:{width:rect.width,height:rect.height,left:rect.left,top:rect.top,computedMaxWidth:window.getComputedStyle(el).maxWidth},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
          }
        }}
        // #endregion
      >
        {/* Background Blur Layer */}
        <div className="absolute inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-md z-0" onClick={handleClose}></div>

        {/* Trigger View */}
        <AnimatePresence mode="wait">
          {view === "trigger" && (
            <motion.div
              key="trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col h-full w-full justify-between items-center px-4 pt-[33px] pb-8"
              // #region agent log
              ref={(el) => {
                if (el && typeof window !== 'undefined') {
                  const rect = el.getBoundingClientRect();
                  const styles = window.getComputedStyle(el);
                  fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SearchOverlay.tsx:trigger.motion.div',message:'Trigger view container dimensions',data:{width:rect.width,height:rect.height,computedWidth:styles.width,computedMaxWidth:styles.maxWidth,computedPadding:styles.padding,parentWidth:el.parentElement?.getBoundingClientRect().width},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                }
              }}
              // #endregion
            >
              {/* Top Section: Search Interface */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md flex flex-col gap-5 items-center"
              >
                {/* Search Bar */}
                <div className="w-full glass-panel shadow-[0_8px_32px_rgba(19,91,236,0.1)] rounded-2xl p-1 flex items-center gap-2 pr-4 pl-4 h-14 ring-1 ring-white/50 hover:ring-primary/30 transition-all">
                  <span className="material-symbols-outlined text-primary">search</span>
                  <input
                    autoFocus
                    className="flex-1 bg-transparent border-none focus:ring-0 text-[#0d121b] dark:text-white font-medium text-lg placeholder-gray-400 outline-none"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="Search messages..."
                  />
                  <button
                    onClick={handleSearch}
                    className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-primary transition-colors"
                  >
                    mic
                  </button>
                </div>

                {/* Smart Chips */}
                <div className="flex flex-nowrap justify-start items-start gap-2.5 w-full">
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 dark:bg-primary/20 backdrop-blur-md rounded-full border border-primary/20 shadow-sm cursor-pointer hover:bg-primary/20 hover:scale-105 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-primary text-[18px]">person</span>
                    <span className="text-primary text-sm font-semibold">Alex</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 dark:bg-primary/20 backdrop-blur-md rounded-full border border-primary/20 shadow-sm cursor-pointer hover:bg-primary/20 hover:scale-105 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                    <span className="text-primary text-sm font-semibold">Last 7 Days</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 dark:bg-primary/20 backdrop-blur-md rounded-full border border-primary/20 shadow-sm cursor-pointer hover:bg-primary/20 hover:scale-105 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-primary text-[18px]">attachment</span>
                    <span className="text-primary text-sm font-semibold">PPT</span>
                  </button>
                </div>
              </motion.div>

              {/* Middle Section: Result Card (Projected) */}
              <div className="flex-1 w-full max-w-[400px] flex flex-col items-center justify-center gap-3 relative z-20">
                {/* Main Result Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="float-animation relative w-full glass-panel px-5 pt-5 pb-5 rounded-2xl shadow-[0_20px_50px_rgba(19,91,236,0.25)] border border-white/60 dark:border-white/10 flex flex-col gap-4 transform translate-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="size-12 rounded-xl bg-[#FCEBE9] flex items-center justify-center shrink-0 shadow-inner">
                        <span className="material-symbols-outlined text-[#EA4335] text-[28px]">slideshow</span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[#0d121b] dark:text-white font-bold text-lg leading-tight">Group_Presentation_v2.pptx</h3>
                        <p className="text-gray-500 text-xs mt-1 font-medium uppercase tracking-wide">PowerPoint • 4.2 MB</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                  <div className="bg-background-light dark:bg-gray-800/80 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="material-symbols-outlined text-gray-400 text-[16px]">forum</span>
                      <span className="text-gray-600 dark:text-gray-300 text-xs font-semibold">CS 101 Group</span>
                      <span className="text-gray-400 text-[10px]">•</span>
                      <span className="text-gray-400 text-xs">2 days ago</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm italic line-clamp-2">
                      "Here is the draft for the presentation, please review slides 4-6..."
                    </p>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="w-full h-11 bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                    Open File
                  </button>
                </motion.div>

                {/* Low Match Results Cards */}
                {lowMatchResults.slice(0, 2).map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="float-animation relative w-full glass-panel px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(19,91,236,0.25)] border border-white/60 dark:border-white/10 flex items-center gap-3 transform translate-y-4 transition-all cursor-pointer group"
                  >
                    {/* Icon */}
                    <div className={`size-10 rounded-lg ${result.iconBgColor} flex items-center justify-center shrink-0 border ${result.iconBgColor.replace('bg-', 'border-').replace('-50', '-100')}`}>
                      <span className={`material-symbols-outlined ${result.iconColor} text-[20px]`}>
                        {result.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#0d121b] dark:text-white truncate">
                        {result.title}
                      </h4>
                      {result.subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                          {result.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Match Label */}
                    <div className={`flex flex-col items-end gap-0.5 shrink-0 px-2 py-1 rounded-md ${getMatchLabelColor(result.matchPercentage)}`}>
                      <span className="text-xs font-bold leading-none">
                        {result.matchPercentage}%
                      </span>
                      <span className="text-[10px] font-medium leading-none opacity-80">
                        {result.matchLabel}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Section: AI Orb & Beam */}
              <div className="relative w-full h-24 flex justify-center items-end mt-4">
                {/* The Light Beam (Vertical Gradient Projection) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "50vh", opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[320px] bg-gradient-to-t from-primary/30 via-primary/5 to-transparent blur-3xl pointer-events-none z-[-1]"
                ></motion.div>

                {/* The AI Orb */}
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulse Rings */}
                  <div className="absolute size-24 rounded-full border border-primary/40 orb-ring bg-primary/5"></div>
                  <div className="absolute size-24 rounded-full border border-primary/20 orb-ring orb-ring-delay bg-primary/5"></div>
                  {/* Main Core */}
                  <div className="size-20 rounded-full bg-gradient-to-tr from-[#135bec] via-[#5b4eff] to-[#a78bfa] shadow-[0_0_50px_rgba(91,78,255,0.6)] flex items-center justify-center relative z-20 cursor-pointer group hover:scale-105 transition-transform duration-300 border-2 border-white/20">
                    <span className="material-symbols-outlined text-white text-[32px] animate-pulse">graphic_eq</span>
                  </div>
                  {/* Glow Aura */}
                  <div className="absolute size-32 rounded-full bg-primary/40 blur-2xl z-10 animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results View */}
          {view === "results" && (
            <motion.div
              key="results"
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              dragDirectionLock={true}
              onDragEnd={handleDragEnd}
              onClick={handleClose}
              initial={{ opacity: 0, y: 20 }}
              animate={isClosing ? { y: "100%", opacity: 0 } : { y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto overflow-hidden"
            >
              {/* Content container */}
              <div className="flex flex-col h-full w-full mx-2 my-2">
                {/* Top Handle */}
                <div className="h-14 w-full flex items-end justify-center pb-2 px-6 cursor-grab active:cursor-grabbing" onClick={(e) => e.stopPropagation()}>
                  <div className="w-12 h-1.5 bg-slate-300 rounded-full opacity-50"></div>
                </div>

                <div className="px-4 pt-2 pb-6 flex-1 flex flex-col overflow-y-auto">
                {/* Search Box */}
                <div className="glass-panel rounded-xl shadow-lg shadow-primary/5 mb-6 transition-all duration-300" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center px-4 py-3.5 gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px]">search</span>
                    <input
                      autoFocus
                      className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-lg font-medium p-0 focus:ring-0"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages..."
                    />
                    <button className="flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">mic</span>
                    </button>
                  </div>
                </div>

                {/* NER Chips */}
                <div className="mb-6" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    <div className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full shrink-0 snap-start animate-[fadeIn_0.3s_ease-out]">
                      <span className="material-symbols-outlined text-primary text-[18px]">person</span>
                      <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">Sender:</span>
                      <span className="text-sm font-semibold text-primary">Alex</span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full shrink-0 snap-start animate-[fadeIn_0.4s_ease-out]">
                      <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                      <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">Time:</span>
                      <span className="text-sm font-semibold text-primary">Last 7 Days</span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full shrink-0 snap-start animate-[fadeIn_0.5s_ease-out]">
                      <span className="material-symbols-outlined text-primary text-[18px]">attach_file</span>
                      <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">Type:</span>
                      <span className="text-sm font-semibold text-primary">Documents</span>
                    </div>
                  </div>
                </div>

                {/* Results List */}
                <div className="flex flex-col gap-4 overflow-y-auto pb-32 no-scrollbar">
                  {/* Best Match */}
                  <div className="flex justify-between items-end px-1" onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Best Match</h2>
                    <span className="text-xs text-primary font-medium">AI Confidence: 98%</span>
                  </div>
                  <div 
                    className="glass-panel rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center border border-red-100 shadow-sm group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-red-500 text-[32px]">picture_as_pdf</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-0.5 shadow-sm border border-slate-100 dark:border-slate-700">
                          <span className="material-symbols-outlined text-primary text-[14px]">auto_awesome</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white truncate pr-2">Lecture_Notes_v2.pdf</h3>
                          <span className="text-xs text-slate-400 whitespace-nowrap">2d ago</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-3 mt-0.5 flex items-center gap-1">
                          2.4 MB
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          Shared in "Study Group A"
                        </p>
                        {/* Context Snippet */}
                        <div className="bg-white/60 dark:bg-white/5 rounded-lg p-3 border border-white/50 dark:border-white/10 relative mt-2">
                          <div className="absolute top-0 left-3 -mt-1.5 w-3 h-3 bg-white/60 dark:bg-white/5 border-t border-l border-white/50 dark:border-white/10 rotate-45 transform"></div>
                          <div className="flex gap-2">
                            <div className="w-1 bg-primary/30 rounded-full h-auto"></div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                              "...here are the <span className="bg-yellow-200/50 dark:bg-yellow-500/30 text-slate-900 dark:text-white font-semibold px-0.5 rounded">notes</span> you asked for regarding the mid-terms..."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2 border-t border-slate-200/50 dark:border-slate-700/50 pt-3">
                      <button 
                        onClick={handleOpenFile}
                        className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                      >
                        Open File
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-white dark:bg-white/10 border border-slate-200/50 dark:border-slate-600 text-slate-700 dark:text-white text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/20 transition-colors">
                        Jump to Chat
                      </button>
                    </div>
                  </div>

                  {/* Other Related Files */}
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mt-4 px-1" onClick={(e) => e.stopPropagation()}>Other Related Files</h2>
                  <div 
                    className="glass-panel rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <span className="material-symbols-outlined text-blue-600 text-[24px]">description</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Project_Outline_Draft.docx</p>
                      <p className="text-xs text-slate-500 truncate">Sent by Alex • 5 days ago</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">chevron_right</span>
                  </div>
                  <div 
                    className="glass-panel rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                      <span className="material-symbols-outlined text-orange-500 text-[24px]">image</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Whiteboard_Session_3.jpg</p>
                      <p className="text-xs text-slate-500 truncate">Sent by Alex • 6 days ago</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">chevron_right</span>
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

