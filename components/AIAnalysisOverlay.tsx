"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AIAnalysisOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizMe: () => void;
}

export default function AIAnalysisOverlay({
  isOpen,
  onClose,
  onQuizMe,
}: AIAnalysisOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Overlay Content */}
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-12 overflow-hidden pointer-events-none">
            {/* SVG Connection Lines */}
            <div className="absolute bottom-[100px] left-0 w-full h-[300px] flex justify-center items-end z-0">
              <svg
                className="overflow-visible w-full max-w-md mx-auto"
                height="300"
                viewBox="0 0 400 300"
                width="400"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0%" x2="0%" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0, 240, 255, 0)" />
                    <stop offset="40%" stopColor="rgba(0, 240, 255, 0.4)" />
                    <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
                  </linearGradient>
                </defs>
                <path
                  className="opacity-60"
                  d="M200 300 C200 250 100 220 100 160"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                />
                <path
                  className="opacity-60"
                  d="M200 300 L200 140"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                />
                <path
                  className="opacity-60"
                  d="M200 300 C200 250 300 220 300 160"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Action Buttons */}
            <div className="relative w-full max-w-[360px] h-[360px] pointer-events-auto z-10">
              {/* Summary Button (Left) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                className="absolute top-28 left-4 flex flex-col items-center gap-3 animate-float"
              >
                <button className="w-[88px] h-[88px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-glass flex items-center justify-center group hover:bg-white/20 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-4xl text-blue-200 drop-shadow-[0_0_8px_rgba(191,219,254,0.5)]">
                    description
                  </span>
                </button>
                <span className="text-sm font-semibold text-white tracking-wide drop-shadow-md">
                  Summary
                </span>
              </motion.div>

              {/* Quiz Me Button (Center Top) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-float"
              >
                <button
                  onClick={onQuizMe}
                  className="w-[96px] h-[96px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-glass flex items-center justify-center group hover:bg-white/20 active:scale-95 transition-all ring-1 ring-electric-blue/30"
                >
                  <span className="material-symbols-outlined text-[44px] text-electric-blue drop-shadow-[0_0_12px_rgba(0,240,255,0.8)] fill-1">
                    bolt
                  </span>
                </button>
                <span className="text-sm font-semibold text-white tracking-wide drop-shadow-md">
                  Quiz Me
                </span>
              </motion.div>

              {/* Find Buddy Button (Right) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
                className="absolute top-28 right-4 flex flex-col items-center gap-3 animate-float"
              >
                <button className="w-[88px] h-[88px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-glass flex items-center justify-center group hover:bg-white/20 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-4xl text-purple-200 drop-shadow-[0_0_8px_rgba(233,213,255,0.5)]">
                    group
                  </span>
                </button>
                <span className="text-sm font-semibold text-white tracking-wide drop-shadow-md">
                  Find Buddy
                </span>
              </motion.div>
            </div>

            {/* Central AI Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              className="relative z-20 -mt-10 pointer-events-auto"
            >
              <div className="absolute inset-0 bg-electric-blue/30 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-md border border-electric-blue/50 flex items-center justify-center shadow-ai-catch animate-pulseGlow overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover mix-blend-overlay"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-electric-blue/80 border-l-electric-blue/30 animate-[spin_3s_linear_infinite]"></div>
                <div className="relative z-10 flex flex-col items-center justify-center animate-float scale-75">
                  <div className="w-14 h-16 bg-white/90 rounded-lg shadow-lg flex flex-col items-center justify-center gap-1 border border-white/50 backdrop-blur-sm transform rotate-[-5deg]">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-orange-600">
                        functions
                      </span>
                    </div>
                    <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                    <div className="w-5 h-1 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute bottom-[-10px] w-[80%] h-[30px] bg-electric-blue/60 blur-lg rounded-[100%]"></div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}


