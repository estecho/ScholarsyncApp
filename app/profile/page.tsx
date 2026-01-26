"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PROFILE_DATA } from "@/constants/profile";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"tasks" | "activity">("tasks");

  // Calculate GPA percentage (3.8/4.0 = 95%)
  const gpaPercentage = (PROFILE_DATA.gpa.value / 4.0) * 100;
  const circumference = 2 * Math.PI * 15.9155; // radius = 15.9155
  const strokeDasharray = `${(gpaPercentage / 100) * circumference}, ${circumference}`;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-[#101622] shadow-2xl overflow-hidden">
      {/* Header Section */}
      <header className="flex flex-col pt-5 pb-3 px-5 bg-white dark:bg-[#101622] z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-16 rounded-full p-[3px] border-2 border-red-500">
                <div
                  className="w-full h-full rounded-full bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url('${PROFILE_DATA.user.avatar}')` }}
                ></div>
              </div>
              <div className="absolute bottom-1 right-1 size-4 bg-red-500 border-2 border-white dark:border-[#101622] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {PROFILE_DATA.user.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {PROFILE_DATA.user.major} • {PROFILE_DATA.user.year}
              </p>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">settings</span>
          </button>
        </div>
        <div className="glass-pill self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm">
          <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-white">Mode: {PROFILE_DATA.mode}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Card A: Wellness (Large - Spans 2 cols) */}
          <div
            onClick={() => router.push("/profile/wellness")}
            className="col-span-2 bg-white dark:bg-[#1a2230] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                  <span className="material-symbols-outlined text-[20px]">spa</span>
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white">Wellness</h3>
              </div>
              <span className="text-xs font-medium text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-md">
                {PROFILE_DATA.wellness.stressLevel}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="gradient-thermometer absolute left-0 top-0 bottom-0 rounded-full opacity-80"
                  style={{ width: `${PROFILE_DATA.wellness.stressValue}%` }}
                ></div>
                {/* Indicator Tick */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white border-x border-gray-200 dark:border-gray-600 shadow-sm z-10"
                  style={{ left: `${PROFILE_DATA.wellness.stressValue}%`, transform: "translateX(-50%)" }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Feeling a bit overwhelmed?</p>
                <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20">
                  <span className="material-symbols-outlined text-[18px]">self_improvement</span>
                  <span>Decompress</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card B: Deep Work (Medium) */}
          <div
            onClick={() => {
              // #region agent log
              fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'profile/page.tsx:DeepWorkCardClick',message:'Deep Work card clicked',data:{target:'/profile/focus'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
              // #endregion
              router.push("/profile/focus");
            }}
            className="bg-white dark:bg-[#1a2230] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-40 group relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10 pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-primary">
                  <span className="material-symbols-outlined text-[20px]">timer</span>
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Deep Work</h3>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {PROFILE_DATA.deepWork.totalHours}h
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">this week</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // #region agent log
                fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'profile/page.tsx:StartButtonClick',message:'Start button clicked',data:{target:'/profile/focus/timer'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
                // #endregion
                router.push("/profile/focus/timer");
              }}
              className="mt-auto relative z-20 flex items-center justify-center w-full h-10 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25 pointer-events-auto"
            >
              <span className="material-symbols-outlined">play_arrow</span>
              <span className="ml-1 text-sm font-semibold">Start</span>
            </button>
          </div>

          {/* Card C: Academic GPA (Small) */}
          <div
            onClick={() => router.push("/profile/gpa")}
            className="bg-white dark:bg-[#1a2230] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center relative cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h3 className="absolute top-4 left-4 font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <span className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined text-[16px]">school</span>
              </span>
              GPA
            </h3>
            <div className="relative size-20 mt-6">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                {/* Background Circle */}
                <path
                  className="text-gray-100 dark:text-gray-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                ></path>
                {/* Progress Circle (GPA 3.8/4.0 is roughly 95%) */}
                <path
                  className="text-primary drop-shadow-[0_0_4px_rgba(19,91,236,0.5)]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{PROFILE_DATA.gpa.value}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Stream */}
        <div className="flex flex-col gap-4">
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-full">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-semibold text-center transition-all ${
                activeTab === "tasks"
                  ? "bg-white dark:bg-[#1a2230] shadow-sm text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Smart Tasks
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium text-center transition-all ${
                activeTab === "activity"
                  ? "bg-white dark:bg-[#1a2230] shadow-sm text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Activity
            </button>
          </div>
          <div className="space-y-3">
            {activeTab === "tasks" &&
              PROFILE_DATA.smartTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center p-4 bg-white dark:bg-[#1a2230] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 group active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div
                      className={`size-10 rounded-full ${task.iconBg} flex items-center justify-center ${
                        task.iconBg.includes("red")
                          ? "text-red-500 group-hover:bg-red-500 group-hover:text-white"
                          : "text-primary group-hover:bg-primary group-hover:text-white"
                      } transition-colors`}
                    >
                      <span className="material-symbols-outlined">{task.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">{task.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{task.description}</p>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${task.badgeColor}`}>
                      {task.badge === "Campus" && <span className="material-symbols-outlined text-[14px]">location_on</span>}
                      {task.badge}
                    </span>
                  </div>
                </div>
              ))}
            {activeTab === "activity" && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No activity yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
