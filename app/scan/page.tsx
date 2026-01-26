"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function ScanPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(65);
  const [statusText, setStatusText] = useState("Parsing HTML table structure...");

  useEffect(() => {
    // 4秒模拟分析过程
    const statusMessages = [
      { time: 0, text: "Parsing HTML table structure...", progress: 65 },
      { time: 1000, text: "Extracting course data...", progress: 75 },
      { time: 2000, text: "Analyzing schedules...", progress: 85 },
      { time: 3000, text: "Finalizing...", progress: 95 },
      { time: 4000, text: "Complete!", progress: 100 },
    ];

    const timers: NodeJS.Timeout[] = [];

    statusMessages.forEach(({ time, text, progress: targetProgress }) => {
      const timer = setTimeout(() => {
        setStatusText(text);
        setProgress(targetProgress);
      }, time);
      timers.push(timer);
    });

    // 4秒后跳转
    const timeout = setTimeout(() => {
      router.push("/review");
    }, 4000);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <PageTransition>
      <div className="fixed inset-0 w-screen h-screen font-display bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white relative overflow-hidden flex flex-col" style={{ width: '100%' }}>
        {/* BACKGROUND LAYER: Web View Simulation */}
        {/* Represents the "Old World" portal being scanned */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-[#1a202c]">
          {/* Header of the simulated browser */}
          <div className="h-16 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2 opacity-50 blur-[2px] w-full">
            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="flex-1"></div>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          {/* Web Content (Simulated Timetable Image) */}
          <div
            className="w-full h-full bg-cover bg-top opacity-60 blur-[3px] scale-105"
            data-alt="Blurred interface of a legacy student portal showing a complex data table"
            style={{
              backgroundImage:
                "url('https://via.placeholder.com/800x1200/1a202c/ffffff?text=School+Portal')",
            }}
          ></div>
          {/* Dark Overlay for Contrast */}
          <div className="absolute inset-0 bg-background-dark/30 backdrop-blur-[2px]"></div>
        </div>
        {/* AI SCANNING BEAM OVERLAY */}
        {/* The "Laser" effect moving down the page */}
        <div className="absolute top-[35%] w-full z-10 pointer-events-none">
          {/* The glowing line */}
          <div className="h-[2px] w-full bg-primary shadow-[0_0_20px_4px_rgba(19,91,236,0.8)]"></div>
          {/* The trail gradient */}
          <div className="h-40 w-full bg-gradient-to-t from-primary/30 to-transparent -mt-40"></div>
        </div>
        {/* FOREGROUND PANEL: Bottom Sheet */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="bg-white dark:bg-background-dark rounded-t-[32px] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] pb-8 max-h-[85vh] flex flex-col transition-transform duration-300 ease-out translate-y-0">
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="px-6 flex flex-col gap-6">
              {/* Header Section: Status & Security */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </div>
                  <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                    AI Agent Active
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span className="text-xs font-medium">Secure Connection</span>
                </div>
              </div>
              {/* HeadlineText Component (Modified) */}
              <div className="text-center py-2">
                <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[32px] font-bold leading-none">
                  12 Courses Found
                </h1>
                <p className="text-[#4c669a] dark:text-gray-400 text-sm mt-2 font-medium">
                  Analyzing Fall 2024 Semester...
                </p>
              </div>
              {/* ReactionBar Component (Modified for Metrics) */}
              {/* Shows the extracted summary stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center gap-2 px-3 py-4 bg-background-light dark:bg-[#1e2433] rounded-2xl border border-transparent dark:border-gray-800 transition-all hover:border-primary/20">
                  <div className="text-primary p-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">book_2</span>
                  </div>
                  <p className="text-[#4c669a] dark:text-gray-300 text-xs font-bold uppercase tracking-wider text-center">
                    12 Courses
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 px-3 py-4 bg-background-light dark:bg-[#1e2433] rounded-2xl border border-transparent dark:border-gray-800 transition-all hover:border-primary/20">
                  <div className="text-primary p-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">
                      assignment_turned_in
                    </span>
                  </div>
                  <p className="text-[#4c669a] dark:text-gray-300 text-xs font-bold uppercase tracking-wider text-center">
                    5 Exams
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 px-3 py-4 bg-background-light dark:bg-[#1e2433] rounded-2xl border border-transparent dark:border-gray-800 transition-all hover:border-primary/20">
                  <div className="text-primary p-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">school</span>
                  </div>
                  <p className="text-[#4c669a] dark:text-gray-300 text-xs font-bold uppercase tracking-wider text-center">
                    32 Credits
                  </p>
                </div>
              </div>
              {/* ProgressBar Component (Modified) */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <p className="text-[#0d121b] dark:text-white text-sm font-semibold">
                    Extracting Schedule
                  </p>
                  <p className="text-primary text-sm font-bold">{Math.round(progress)}%</p>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full relative"
                    initial={{ width: "65%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Gradient overlay for "movement" feel */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"></div>
                  </motion.div>
                </div>
                <p className="text-[#4c669a] dark:text-gray-400 text-xs font-normal">
                  {statusText}
                </p>
              </div>
              {/* DescriptionList Component (Modified for Status Logs) */}
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                {/* Log Item 1 */}
                <div className="col-span-2 grid grid-cols-subgrid items-center py-3 border-b border-gray-50 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <p className="text-[#4c669a] dark:text-gray-300 text-sm font-medium">
                      Fall 2024 Schedule
                    </p>
                  </div>
                  <p className="text-[#0d121b] dark:text-white text-xs font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    Imported
                  </p>
                </div>
                {/* Log Item 2 */}
                <div className="col-span-2 grid grid-cols-subgrid items-center py-3 border-b border-gray-50 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[14px] animate-spin">
                        sync
                      </span>
                    </div>
                    <p className="text-[#4c669a] dark:text-gray-300 text-sm font-medium">
                      Final Exam Dates
                    </p>
                  </div>
                  <p className="text-primary text-xs font-semibold bg-primary/10 px-2 py-1 rounded">
                    Syncing...
                  </p>
                </div>
                {/* Log Item 3 */}
                <div className="col-span-2 grid grid-cols-subgrid items-center py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined text-[14px]">
                        hourglass_empty
                      </span>
                    </div>
                    <p className="text-[#4c669a] dark:text-gray-400 text-sm font-medium">
                      Academic Credits
                    </p>
                  </div>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded">
                    Pending
                  </p>
                </div>
              </div>
            </div>
            {/* Primary Action Button */}
            <div className="pt-2 px-6">
              <button
                className="w-full bg-primary disabled:opacity-80 disabled:cursor-wait text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all"
                disabled
              >
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  progress_activity
                </span>
                Processing Data...
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
