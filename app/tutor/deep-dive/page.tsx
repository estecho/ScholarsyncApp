"use client";

import { useRouter } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";

export default function DeepDivePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleReturn = () => {
    router.push("/home?restoreQuiz=true");
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      // TODO: Handle message send
      setInputValue("");
    }
  };

  return (
    <PageTransition>
      <div className="bg-background-light dark:bg-background-dark font-display h-screen flex flex-col overflow-hidden text-slate-800 dark:text-slate-200 antialiased selection:bg-primary/20 selection:text-primary">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-30 sticky top-0 border-b border-slate-200/50 dark:border-slate-800/50">
          <button
            onClick={handleReturn}
            className="p-2 -ml-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-3xl">expand_more</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              AI 导师：算法
            </h1>
            <span className="text-[10px] font-medium text-primary uppercase tracking-widest opacity-80">
              深度探讨模式
            </span>
          </div>
          <div className="w-10"></div>
        </header>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto px-4 pb-40 w-full max-w-lg mx-auto scroll-smooth">
          {/* Context Anchor */}
          <div className="sticky top-0 z-10 flex justify-center py-6 pointer-events-none">
            <div className="glass-panel px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                参考：快速排序复杂度
              </p>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex flex-col gap-3 animate-fade-in-down">
            {/* Avatar */}
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-300 p-[1.5px] shadow-glow">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    smart_toy
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  ScholarSync AI
                </span>
                <span className="text-[10px] text-slate-400">09:41 AM</span>
              </div>
            </div>

            {/* Message Card */}
            <div className="glass-panel rounded-2xl p-5 shadow-glass relative overflow-hidden group">
              {/* Background decorative gradient */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

              {/* Text Content */}
              <div className="relative z-10 space-y-4 mb-6">
                <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 font-normal">
                  Great attempt! The average case is{" "}
                  <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    O(n log n)
                  </span>{" "}
                  because the partition splits the array into two roughly equal halves.
                </p>
                <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 font-normal">
                  However, the efficiency heavily depends on the choice of the{" "}
                  <span className="font-bold text-primary bg-primary/5 px-1 rounded">
                    Pivot
                  </span>
                  . If the pivot is the smallest or largest element, the split is unbalanced.
                </p>
              </div>

              {/* Visual Aid: High-End Vector Chart */}
              <div className="relative z-10 bg-white dark:bg-slate-900/80 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Time Complexity
                  </p>
                  <div className="flex gap-3 text-[10px] font-medium">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Average Case
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-2 h-2 rounded-full border border-slate-400 border-dashed bg-transparent"></span>
                      Worst Case
                    </div>
                  </div>
                </div>

                <div className="relative h-40 w-full pl-2 pb-2">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                    <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                    <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                    <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                  </div>

                  {/* SVG Chart */}
                  <svg
                    className="w-full h-full overflow-visible z-10 relative"
                    preserveAspectRatio="none"
                    viewBox="0 0 300 150"
                  >
                    <defs>
                      <linearGradient id="gradientBlue" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#135bec" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#135bec" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area Fill */}
                    <path
                      d="M0,150 C60,145 150,120 300,50 L300,150 L0,150 Z"
                      fill="url(#gradientBlue)"
                    />
                    {/* O(n log n) Curve - Smooth, Elegant */}
                    <path
                      className="drop-shadow-md"
                      d="M0,150 C60,145 150,120 300,50"
                      fill="none"
                      stroke="#135bec"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                    {/* O(n^2) Curve - Steep, Warning */}
                    <path
                      className="opacity-60"
                      d="M0,150 C80,145 140,80 180,0"
                      fill="none"
                      stroke="#94a3b8"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                    {/* Data Point Highlight */}
                    <circle
                      className="shadow-sm"
                      cx="225"
                      cy="85"
                      fill="white"
                      r="4"
                      stroke="#135bec"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Axes Labels */}
                  <div className="absolute left-0 bottom-0 top-0 w-px bg-slate-200 dark:bg-slate-700"></div>
                  <div className="absolute left-0 bottom-0 right-0 h-px bg-slate-200 dark:bg-slate-700"></div>
                  <div className="absolute -bottom-5 right-0 text-[10px] text-slate-400 font-medium">
                    Input Size (n)
                  </div>
                  <div className="absolute -left-5 top-0 text-[10px] text-slate-400 font-medium -rotate-90 origin-bottom-right">
                    Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer - Input Area (Sticky Bottom) */}
        <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark via-80% pt-12 pb-6 px-4 z-40">
          <div className="max-w-lg mx-auto">
            {/* Smart Suggestions */}
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-4 pb-2 px-1 snap-x">
              <button className="snap-start shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm transition-all active:scale-95 group">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  code
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  显示代码示例
                </span>
              </button>
              <button className="snap-start shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm transition-all active:scale-95 group">
                <span className="material-symbols-outlined text-orange-500 text-[18px] group-hover:scale-110 transition-transform">
                  warning
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Explain Worst Case
                </span>
              </button>
              <button className="snap-start shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm transition-all active:scale-95 group">
                <span className="material-symbols-outlined text-emerald-500 text-[18px]">
                  play_circle
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Visualize
                </span>
              </button>
            </div>

            {/* Input Bar */}
            <div className="relative flex items-end gap-2">
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-[28px] shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:shadow-none transition-shadow group-focus-within:shadow-[0_8px_30px_rgb(19,91,236,0.15)]"></div>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="relative block w-full bg-transparent border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary/50 rounded-[28px] pl-5 pr-12 py-3.5 text-[15px] resize-none overflow-hidden text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
                  placeholder="Ask a follow-up..."
                  rows={1}
                />
                <button className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                  <span className="material-symbols-outlined text-[22px]">mic</span>
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="flex-shrink-0 size-[46px] mb-[1px] flex items-center justify-center bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_upward</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
