"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TimerSettingsModal from "@/components/profile/TimerSettingsModal";

export default function FocusTimerPage() {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(45 * 60); // 45 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleSettingsConfirm = (minutes: number) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const buttonText = isRunning ? "Pause" : timeLeft === initialTime ? "Start" : "Resume";

  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-full flex-col justify-between overflow-hidden bg-background-dark">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <button
          onClick={() => router.back()}
          className="text-white/50 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-[24px]">expand_more</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
          <span className="material-symbols-outlined text-primary text-[16px]">psychology</span>
          <span className="text-white/80 text-xs font-medium tracking-wide uppercase">深度专注</span>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="text-white/50 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-[24px]">more_horiz</span>
        </button>
      </div>

      {/* Central Timer */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-10">
        {/* Pulsing Circle Halo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-72 border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-64 h-64 border border-primary/20 rounded-full shadow-[0_0_60px_rgba(19,91,236,0.15)]"></div>
          </div>
        </div>
        <div className="relative text-center">
          <h1 className="text-white text-[100px] leading-none font-thin tracking-tighter tabular-nums select-none drop-shadow-2xl">
            {formatTime(timeLeft)}
          </h1>
          <p className="text-primary/80 text-sm font-medium tracking-[0.2em] uppercase mt-4">
            {isRunning ? "专注中" : timeLeft === initialTime ? "准备就绪" : "已暂停"}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 flex flex-col gap-6 p-6 pb-8 w-full max-w-md mx-auto">
        {/* Motivation Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-surface-dark/80 to-surface-dark/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-2 shadow-lg">
            <span className="material-symbols-outlined text-yellow-400 text-[18px]">emoji_events</span>
            <p className="text-white/90 text-xs font-medium">您今天的专注度排名前 10%。</p>
          </div>
        </div>

        {/* Soundscape Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-[#192233]/40 border border-white/10 backdrop-blur-xl p-4 shadow-xl transition-all hover:bg-[#192233]/60">
          <div className="flex items-center gap-4">
            {/* Play Icon Container */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-[28px] animate-pulse">equalizer</span>
            </div>
            {/* Text Info */}
            <div className="flex flex-1 flex-col justify-center min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white text-sm font-semibold leading-tight truncate">AI 混音：雨声 + LoFi</h3>
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
              </div>
              <p className="text-slate-400 text-xs font-normal leading-normal truncate mt-0.5">
                音景已激活 • 自适应音量
              </p>
            </div>
            {/* Fake Waveform Visualizer */}
            <div className="flex items-end gap-[3px] h-8 opacity-60">
              <div className="w-1 bg-primary rounded-t-sm h-3"></div>
              <div className="w-1 bg-primary rounded-t-sm h-5"></div>
              <div className="w-1 bg-primary rounded-t-sm h-8"></div>
              <div className="w-1 bg-primary rounded-t-sm h-4"></div>
              <div className="w-1 bg-primary rounded-t-sm h-6"></div>
              <div className="w-1 bg-primary rounded-t-sm h-2"></div>
              <div className="w-1 bg-primary rounded-t-sm h-5"></div>
              <div className="w-1 bg-primary rounded-t-sm h-3"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.back()}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95 border border-white/5"
          >
            <span className="material-symbols-outlined text-[20px]">flag</span>
            <span className="text-base font-medium">放弃</span>
          </button>
          <button
            onClick={isRunning ? handlePause : handleStart}
            className={`flex h-14 items-center justify-center gap-2 rounded-2xl transition-all active:scale-95 shadow-[0_0_20px_rgba(19,91,236,0.4)] ${
              isRunning
                ? "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{isRunning ? "pause" : "play_arrow"}</span>
            <span className="text-base font-semibold">{buttonText === "Pause" ? "暂停" : buttonText === "Start" ? "开始" : "继续"}</span>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      <TimerSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentTime={initialTime}
        onConfirm={handleSettingsConfirm}
      />
    </div>
  );
}

