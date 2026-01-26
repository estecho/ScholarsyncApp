"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { PROFILE_DATA } from "@/constants/profile";
import StressLevelPopover from "@/components/profile/StressLevelPopover";

type StressLevel = "low" | "medium" | "high" | null;

export default function WellnessPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState("October");
  const [stressData, setStressData] = useState<Record<string, StressLevel>>({
    "1": "low",
    "2": "low",
    "3": "medium",
    "4": "medium",
    "5": "high",
    "6": "low",
    "7": "low",
    "8": "low",
    "9": "low",
    "10": "low",
    "11": "medium",
    "12": "high",
    "13": "low",
    "14": "medium",
    "15": "low",
    "16": "low",
    "17": "low",
    "18": "low",
    "19": "high",
    "20": "low",
    "21": "medium",
    "22": "low",
    "23": "low",
  });
  const [popoverState, setPopoverState] = useState<{
    isOpen: boolean;
    date: string;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    date: "",
    position: { x: 0, y: 0 },
  });

  const handleDateClick = (date: string, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverState({
      isOpen: true,
      date,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top,
      },
    });
  };

  const handleStressSelect = (level: StressLevel) => {
    setStressData((prev) => ({
      ...prev,
      [popoverState.date]: level,
    }));
  };

  const getStressStyle = (level: StressLevel) => {
    if (!level) return "text-gray-300";
    switch (level) {
      case "low":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      case "medium":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
      case "high":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 font-bold shadow-sm ring-2 ring-white dark:ring-gray-800";
      default:
        return "text-gray-300";
    }
  };

  // Generate calendar days (October 2024: starts on Tuesday, has 31 days)
  const calendarDays: (number | null)[] = [];
  // Fill empty cells for days before Oct 1 (Tuesday = 2nd day of week)
  for (let i = 0; i < 1; i++) {
    calendarDays.push(null);
  }
  // Add days 1-31
  for (let i = 1; i <= 31; i++) {
    calendarDays.push(i);
  }

  const focusData = [
    { day: "M", hours: 3.6, height: 60 },
    { day: "T", hours: 2.7, height: 45 },
    { day: "W", hours: 6.0, height: 100 },
    { day: "T", hours: 1.8, height: 30 },
    { day: "F", hours: 4.2, height: 70 },
    { day: "S", hours: 1.2, height: 20 },
    { day: "S", hours: 1.5, height: 25 },
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light overflow-x-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center px-6 py-6 justify-between sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <button
          onClick={() => router.back()}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-soft border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-text-main dark:text-white text-[20px]">arrow_back_ios_new</span>
        </button>
        <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Wellness & Focus</h2>
        <div className="flex size-10 shrink-0 items-center justify-center">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark shadow-sm"
            style={{ backgroundImage: `url('${PROFILE_DATA.user.avatar}')` }}
          ></div>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-6 pb-24">
        {/* Monthly Stress Heatmap */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-tight">
              Monthly Stress Heatmap
            </h3>
            <span className="text-sm text-text-soft dark:text-gray-400 font-medium bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              {currentMonth}
            </span>
          </div>
          <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            {/* Highlight current date (Oct 5) */}
            <div className="absolute top-[4.5rem] bottom-4 left-[28.5%] w-[14.28%] bg-primary/5 rounded-xl z-0 pointer-events-none border border-primary/10"></div>
            <div className="flex items-center justify-between mb-5 relative z-10">
              <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-primary">
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <div className="size-2 rounded-full bg-emerald-400"></div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">Low</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <div className="size-2 rounded-full bg-red-500"></div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">High</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-primary">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 relative z-10">
              {/* Weekday headers */}
              <div className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">S</div>
              <div className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">M</div>
              <div className="text-center text-xs font-bold text-primary mb-2">T</div>
              <div className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">W</div>
              <div className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">T</div>
              <div className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">F</div>
              <div className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">S</div>
              {/* Calendar days */}
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square"></div>;
                }
                const dayStr = day.toString();
                const stressLevel = stressData[dayStr] || null;
                return (
                  <div
                    key={day}
                    onClick={(e) => handleDateClick(dayStr, e)}
                    className={`aspect-square flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                      day === 5 ? "relative z-20" : ""
                    }`}
                  >
                    <div
                      className={`size-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                        stressLevel ? getStressStyle(stressLevel) : "text-gray-300 dark:text-gray-600"
                      }`}
                    >
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Focus Trends */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-tight">Focus Trends</h3>
          </div>
          <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[32px] font-bold text-text-main dark:text-white leading-none mb-1">
                  4.2 <span className="text-sm font-normal text-text-soft dark:text-gray-400">hrs</span>
                </p>
                <p className="text-xs text-text-soft dark:text-gray-400">Daily average this week</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">trending_up</span>
                <p className="text-primary text-xs font-bold">+12% vs last week</p>
              </div>
            </div>
            <div className="flex items-end justify-between h-40 gap-3">
              {focusData.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 group flex-1 relative">
                  {item.day === "W" && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 animate-bounce">
                      <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[4px] after:border-transparent after:border-t-primary">
                        6h Personal Best
                      </div>
                    </div>
                  )}
                  <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg relative h-32 overflow-hidden flex items-end justify-center">
                    <div
                      className="w-full gradient-bar group-hover:opacity-90 transition-all rounded-lg"
                      style={{
                        height: `${item.height}%`,
                        opacity: item.day === "W" ? 1 : item.height / 100,
                      }}
                    ></div>
                  </div>
                  <span
                    className={`text-[11px] font-medium text-text-soft dark:text-gray-400 ${
                      item.day === "W" ? "font-bold text-primary" : ""
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="relative overflow-hidden rounded-2xl glass-card p-6 shadow-glass">
          <div className="absolute inset-0 bg-white/40 dark:bg-white/5 z-0"></div>
          <div className="absolute -top-10 -right-10 size-40 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute bottom-0 left-0 size-32 bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-2xl z-0"></div>
          <div className="relative z-10 flex gap-4 items-start">
            <div className="flex-shrink-0">
              <div className="size-14 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center shadow-sm border border-white dark:border-gray-700">
                <span className="material-symbols-outlined text-[32px] text-orange-400">coffee</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI Insight</span>
                <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
              </div>
              <h4 className="text-lg font-bold text-text-main dark:text-white mb-2 leading-tight">Trend Alert</h4>
              <p className="text-sm text-text-soft dark:text-gray-400 leading-relaxed mb-4">
                You tend to burn out on Thursdays. Let's schedule a light break?
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-primary hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 group">
                  <span>Schedule Break</span>
                </button>
                <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-text-soft dark:text-gray-300 font-semibold py-2.5 px-4 rounded-xl text-sm transition-all border border-gray-200 dark:border-gray-700">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-4"></div>
      </div>

      {/* Stress Level Popover */}
      <StressLevelPopover
        isOpen={popoverState.isOpen}
        onClose={() => setPopoverState({ ...popoverState, isOpen: false })}
        onSelect={handleStressSelect}
        position={popoverState.position}
      />
    </div>
  );
}


