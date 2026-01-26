"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";
import { getCourseById } from "@/constants/courses";
export const dynamic = "force-dynamic";

export default function NavigationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") || "Unknown Location";
  const courseId = searchParams.get("courseId");
  const [isNavigating, setIsNavigating] = useState(false);
  
  const course = courseId ? getCourseById(courseId) : null;
  const mapImage = course?.mapImage || "https://placehold.co/400x600/png?text=Map";

  const handleStartNavigation = () => {
    setIsNavigating(true);
    // 这里可以添加实际的导航逻辑，比如：
    // - 调用导航 API
    // - 显示导航进行中的 UI
    // - 播放导航提示音等
    console.log("Navigation started to:", destination);
  };

  return (
    <PageTransition>
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden pb-24 bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white antialiased transition-colors duration-200">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 w-full">
          <div className="flex items-center justify-between p-4 pb-2 max-w-md mx-auto w-full">
            <button
              onClick={() => router.back()}
              className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[#0d121b] dark:text-white" style={{ fontSize: "24px" }}>
                arrow_back
              </span>
            </button>
            <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight flex-1 text-center">
              Navigation
            </h2>
            <div className="flex w-10 items-center justify-end">
              <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined text-[#0d121b] dark:text-white" style={{ fontSize: "24px" }}>
                  more_horiz
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto px-4 pt-20 flex flex-col gap-6"
        >
          {/* Destination Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: "24px" }}>
                  location_on
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Destination</p>
                <p className="text-base font-bold text-[#0d121b] dark:text-white break-words">{destination}</p>
                {course && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 break-words">{course.title}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Map View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl bg-white dark:bg-[#1a2235] p-1 shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${mapImage}')` }}
              ></div>
              <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
              
              {/* Route Line Overlay (simulated) */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
                <path
                  d="M 50 350 Q 150 200, 250 150 T 350 100"
                  fill="none"
                  stroke="#135bec"
                  strokeWidth="4"
                  strokeDasharray="8 4"
                  opacity="0.8"
                />
                {/* Start point */}
                <circle cx="50" cy="350" r="8" fill="#22c55e" />
                {/* End point */}
                <circle cx="350" cy="100" r="10" fill="#ef4444" />
              </svg>

              {/* Navigation Info Card */}
              <div className="absolute top-3 left-3 right-3 bg-white/95 dark:bg-[#101622]/95 backdrop-blur-md rounded-lg p-3 shadow-lg border-l-4 border-primary z-20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary text-base">
                    directions_walk
                  </span>
                  <p className="text-xs font-bold text-gray-800 dark:text-white">Walking Route</p>
                </div>
                <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  Estimated time: 5-7 minutes
                </p>
              </div>

              {/* Start Navigation Button */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] z-30">
                <button 
                  onClick={handleStartNavigation}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-blue-600 text-white font-bold h-12 shadow-lg transition-transform active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    near_me
                  </span>
                  Start Navigation
                </button>
              </div>
            </div>
          </motion.div>

          {/* Route Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white dark:bg-[#1a2235] p-4 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-base font-bold text-[#0d121b] dark:text-white mb-3">Route Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-white text-xs">check</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#0d121b] dark:text-white">Start from current location</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Main Building, Floor 2</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#0d121b] dark:text-white">Walk straight for 200m</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Follow the main corridor</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#0d121b] dark:text-white">Turn right at Science Block</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Look for Room 304 sign</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-white text-xs">location_on</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#0d121b] dark:text-white">Arrive at {destination}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Destination reached</p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </PageTransition>
  );
}

