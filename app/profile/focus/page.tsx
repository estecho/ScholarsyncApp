"use client";

import { useRouter } from "next/navigation";
import { PROFILE_DATA } from "@/constants/profile";

export default function FocusReportPage() {
  const router = useRouter();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col group/design-root overflow-x-hidden max-w-md mx-auto bg-white dark:bg-[#0A1120] sm:border-x sm:border-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1">
          Focus Session Report
        </h2>
        <button
          onClick={() => router.push("/profile")}
          className="flex w-16 items-center justify-end hover:opacity-70 transition-opacity"
        >
          <p className="text-primary dark:text-blue-400 text-base font-bold leading-normal tracking-[0.015em] shrink-0">Done</p>
        </button>
      </div>

      {/* Central Timer */}
      <div className="flex flex-col items-center justify-center pt-8 pb-6 px-6">
        <div className="relative w-48 h-48 rounded-full conic-progress flex items-center justify-center shadow-soft mb-6">
          <div className="w-40 h-40 bg-white dark:bg-gray-900 rounded-full flex flex-col items-center justify-center relative z-10 shadow-inner">
            <span className="text-text-secondary dark:text-gray-400 text-sm font-medium mb-1">Focus Quality</span>
            <h1 className="text-6xl font-black text-text-main dark:text-white tracking-tighter leading-none">92</h1>
            <div className="flex items-center gap-1 mt-2 text-primary">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span className="text-xs font-bold">+4%</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-0"></div>
        </div>
        <div className="text-center space-y-1 max-w-[280px]">
          <h3 className="text-text-main dark:text-white text-xl font-bold">Deep Work State</h3>
          <p className="text-text-secondary dark:text-gray-400 text-sm font-medium">Deep Work State achieved for 45 mins.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 px-4 mb-8">
        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl flex flex-col gap-2 border border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <span className="text-xs font-medium">Total Duration</span>
          </div>
          <p className="text-xl font-bold text-text-main dark:text-white">
            52 <span className="text-sm font-normal text-gray-500">mins</span>
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl flex flex-col gap-2 border border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
            <span className="material-symbols-outlined text-[20px]">notifications_off</span>
            <span className="text-xs font-medium">Blocked</span>
          </div>
          <p className="text-xl font-bold text-text-main dark:text-white">
            3 <span className="text-sm font-normal text-gray-500">Notifications</span>
          </p>
        </div>
      </div>

      <div className="h-2 bg-slate-50 dark:bg-white/5 w-full"></div>

      {/* Focus Timeline */}
      <div className="flex flex-col pt-6 pb-2">
        <div className="flex items-center justify-between px-4 mb-4">
          <h3 className="text-text-main dark:text-white tracking-tight text-lg font-bold">Focus Timeline</h3>
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-gray-400">info</span>
          </button>
        </div>
        <div className="px-4 pb-4">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="min-w-[600px] flex flex-col gap-2">
              <div className="flex justify-between text-xs text-text-secondary dark:text-gray-400 font-medium px-1 min-w-[600px]">
                <span>14:00</span>
                <span>14:15</span>
                <span>14:30</span>
                <span>14:45</span>
                <span>15:00</span>
                <span>15:15</span>
                <span>15:30</span>
                <span>15:45</span>
                <span>16:00</span>
              </div>
              <div className="relative h-14 bg-primary-light dark:bg-white/10 rounded-xl min-w-[600px] flex items-center overflow-visible">
                {/* Deep Work Zone */}
                <div className="absolute left-[10%] w-[70%] h-full bg-primary/10 dark:bg-primary/30 border-l-2 border-r-2 border-primary/40 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary dark:text-blue-300 uppercase tracking-wider bg-white/60 dark:bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Deep Work
                  </span>
                </div>
                {/* Timeline line */}
                <div className="absolute top-1/2 left-0 w-[600px] h-0.5 bg-primary/20 -translate-y-1/2"></div>
                {/* Start marker */}
                <div className="absolute left-0 h-full w-1 bg-primary rounded-l-xl"></div>
                {/* Blocked notification markers */}
                <div className="absolute left-[35%] top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-[#10221f] border-2 border-rose-400 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-rose-400">notifications_off</span>
                  </div>
                  <div className="absolute -top-8 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    Instagram Blocked
                  </div>
                </div>
                <div className="absolute left-[62%] top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-[#10221f] border-2 border-rose-400 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-rose-400">notifications_off</span>
                  </div>
                  <div className="absolute -top-8 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    WeChat Blocked (2)
                  </div>
                </div>
                {/* End marker */}
                <div className="absolute right-0 h-full w-1 bg-gray-300 dark:bg-gray-600 rounded-r-xl"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Legend - Fixed below scrollable area */}
        <div className="flex gap-4 mt-1 justify-center px-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-xs text-text-secondary dark:text-gray-400">Deep Focus</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full border-2 border-rose-400"></div>
            <span className="text-xs text-text-secondary dark:text-gray-400">Blocked Notifications</span>
          </div>
        </div>
      </div>

      <div className="h-2 bg-slate-50 dark:bg-white/5 w-full"></div>

      {/* AI Insight */}
      <div className="flex flex-col px-4 pt-6 pb-24">
        <h3 className="text-text-main dark:text-white tracking-tight text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">auto_awesome</span>
          AI Insight
        </h3>
        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-white/10 dark:to-white/5 rounded-2xl p-5 border border-primary/10 shadow-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <p className="text-text-main dark:text-gray-100 text-sm font-medium leading-relaxed mb-3">
                  You focus <span className="text-primary font-bold">20%</span> better when listening to{" "}
                  <span className="bg-blue-100 dark:bg-primary/30 text-primary dark:text-blue-200 px-1.5 py-0.5 rounded text-xs mx-0.5 font-bold">
                    'Rain Sounds'
                  </span>{" "}
                  compared to{" "}
                  <span className="bg-gray-100 dark:bg-white/20 px-1.5 py-0.5 rounded text-xs mx-0.5">'White Noise'</span>.
                </p>
                <p className="text-xs text-text-secondary dark:text-gray-400 leading-normal">
                  Suggestion: Try the "Rainy Cafe" playlist for your next deep reading session.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex gap-3">
              <button className="flex-1 bg-white dark:bg-black/20 hover:bg-gray-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-text-main dark:text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
                Preview Rain
              </button>
              <button className="flex-1 bg-primary text-white hover:bg-primary/90 text-xs font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-colors shadow-soft">
                Apply Suggestion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Report Button */}
      <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center pointer-events-none">
        <button className="pointer-events-auto bg-text-main dark:bg-white text-white dark:text-text-main shadow-xl hover:scale-105 active:scale-95 transition-all rounded-full px-6 py-3 font-semibold text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">ios_share</span>
          Share Report
        </button>
      </div>
    </div>
  );
}

