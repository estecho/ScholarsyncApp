"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName?: string;
}

export default function QuizModal({
  isOpen,
  onClose,
  courseName = "Advanced Calculus",
}: QuizModalProps) {
  const router = useRouter();

  const handleDeepDive = () => {
    router.push("/tutor/deep-dive");
  };

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

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col justify-end h-full pointer-events-none"
          >
            <div className="pointer-events-auto glass-panel rounded-t-[32px] shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-md mx-auto h-auto min-h-[55%]">
              {/* Drag Handle */}
              <div className="w-full flex justify-center pt-3 pb-2">
                <div className="h-1.5 w-12 rounded-full bg-gray-300/80"></div>
              </div>

              <div className="px-6 pb-8 pt-2 flex flex-col h-full">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/5">
                        <span
                          className="material-symbols-outlined text-primary text-[16px] fill-1"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          auto_awesome
                        </span>
                        <span className="text-primary text-xs font-bold uppercase tracking-wide">
                          Generated from Syllabus
                        </span>
                      </div>
                    </div>
                    <h3 className="text-gray-500 font-semibold text-sm pl-1 mt-1">
                      {courseName}
                    </h3>
                  </div>

                  {/* Deep Dive Button */}
                  <button
                    onClick={handleDeepDive}
                    className="group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
                  >
                    <span className="text-xs font-bold text-primary">Deep Dive</span>
                    <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-0.5 transition-transform">
                      open_in_new
                    </span>
                  </button>
                </div>

                {/* The Question */}
                <div className="mb-8">
                  <h1 className="text-[28px] leading-tight font-extrabold text-[#0d121b] dark:text-white tracking-tight">
                    What is the time complexity of QuickSort?
                  </h1>
                </div>

                {/* Options Stack */}
                <div className="flex flex-col gap-3.5 w-full mb-4">
                  {/* Option A */}
                  <button className="group w-full p-4 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow text-left transition-all duration-200 flex items-center justify-between relative overflow-hidden">
                    <span className="text-lg font-semibold text-gray-600 dark:text-gray-300 pl-2">
                      O(n)
                    </span>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-primary/50 mr-1"></div>
                  </button>

                  {/* Option B (Correct/Active) */}
                  <button className="relative w-full p-4 rounded-full bg-primary text-left transition-all duration-300 flex items-center justify-between shadow-glow transform scale-[1.02] ring-2 ring-primary ring-offset-2 ring-offset-[#f8f9fc] dark:ring-offset-background-dark">
                    <span className="text-lg font-bold text-white pl-2">O(n log n)</span>
                    {/* Checkmark Circle */}
                    <div className="flex items-center justify-center w-7 h-7 bg-white rounded-full shadow-sm mr-1">
                      <span className="material-symbols-outlined text-primary text-[20px] font-bold">
                        check
                      </span>
                    </div>
                    {/* Sparkle Decorations */}
                    <div
                      className="absolute -top-3 -right-2"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <span
                        className="material-symbols-outlined filled text-yellow-400 text-[28px] drop-shadow-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        spark
                      </span>
                    </div>
                    <div
                      className="absolute -bottom-1 right-8"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <span
                        className="material-symbols-outlined filled text-blue-300 text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </div>
                    {/* Success Feedback Text */}
                    <div className="absolute -right-2 -bottom-8 flex items-center gap-1 opacity-0 animate-[fadeIn_0.5s_0.4s_forwards]">
                      <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        Correct! +50xp
                      </span>
                    </div>
                  </button>

                  {/* Option C */}
                  <button className="group w-full p-4 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow text-left transition-all duration-200 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-600 dark:text-gray-300 pl-2">
                      O(n<sup>2</sup>)
                    </span>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-primary/50 mr-1"></div>
                  </button>
                </div>

                {/* Spacer for bottom safe area */}
                <div className="h-8"></div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


