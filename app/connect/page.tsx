"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function ConnectPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 3秒进度条动画
    const duration = 3000; // 3秒
    const interval = 100; // 每100ms更新一次
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    // 3秒后跳转
    const timeout = setTimeout(() => {
      router.push("/scan");
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <PageTransition>
      <div className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background-light dark:bg-background-dark font-display transition-colors duration-300">
        {/* Background Ambient Glow (Breathing Gradient) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-60 dark:opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none -ml-10 -mb-10"></div>
        {/* Spacer for vertical alignment */}
        <div className="flex-1"></div>
        {/* Main Content Area */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6 py-8">
          {/* Central Agent Orb (Modified ImageGrid) */}
          <div className="relative mb-12 group">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transform scale-110 group-hover:scale-125 transition-transform duration-1000"></div>
            {/* The Orb Container */}
            <div className="relative w-48 h-48 rounded-full shadow-[0_10px_40px_-10px_rgba(19,91,236,0.5)] dark:shadow-[0_10px_40px_-10px_rgba(19,91,236,0.3)] bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 p-1 flex items-center justify-center overflow-hidden border border-white/40 dark:border-white/10">
              {/* Image Texture */}
              <div
                className="w-full h-full rounded-full bg-cover bg-center opacity-90 mix-blend-overlay dark:mix-blend-normal dark:opacity-60"
                data-alt="Glowing abstract blue pearl sphere representing the AI agent"
                style={{
                  backgroundImage:
                    "url('https://via.placeholder.com/192x192/135bec/ffffff?text=AI')",
                }}
              ></div>
              {/* Inner Shine/Reflection for Pearl effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-white/60 pointer-events-none"></div>
            </div>
            {/* Orbiting Data Particles */}
            {/* Particle 1 */}
            <div
              className="absolute -top-2 right-4 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(19,91,236,0.8)] animate-bounce"
              style={{ animationDuration: "3s" }}
            ></div>
            {/* Particle 2 */}
            <div className="absolute top-1/2 -right-6 w-2 h-2 bg-blue-400 rounded-full shadow-lg opacity-80"></div>
            {/* Particle 3 */}
            <div className="absolute bottom-4 -left-2 w-2.5 h-2.5 bg-indigo-400 rounded-full shadow-lg opacity-90"></div>
            {/* Particle 4 */}
            <div className="absolute top-8 -left-4 w-1.5 h-1.5 bg-sky-300 rounded-full opacity-70"></div>
          </div>
          {/* Headline Text */}
          <div className="text-center w-full mb-2">
            <h2 className="text-slate-900 dark:text-white tracking-tight text-[26px] font-bold leading-tight pb-2">
              Initializing Student Agent...
            </h2>
            {/* Meta Text */}
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
              Preparing your academic companion
            </p>
          </div>
        </div>
        {/* Progress Section (Bottom pinned or just below) */}
        <div className="relative z-10 w-full max-w-md px-8 pb-16">
          {/* Progress Component */}
          <div className="flex flex-col gap-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-md p-5 shadow-sm border border-white/50 dark:border-white/5">
            <div className="flex gap-4 justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary text-lg animate-spin"
                  style={{ fontSize: "18px" }}
                >
                  sync
                </span>
                <p className="text-slate-700 dark:text-slate-200 text-sm font-semibold leading-normal">
                  Syncing academic calendar...
                </p>
              </div>
              <p className="text-primary text-sm font-bold leading-normal">
                {Math.round(progress)}%
              </p>
            </div>
            <div className="rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden h-1.5 w-full">
              <motion.div
                className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(19,91,236,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              ></motion.div>
            </div>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </PageTransition>
  );
}
