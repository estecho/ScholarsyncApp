"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: () => void;
}

export default function TriageModal({ isOpen, onClose, onExecute }: TriageModalProps) {
  const [isExecuting, setIsExecuting] = useState(false);

  // #region agent log
  if (typeof window !== "undefined" && isOpen) {
    const navBar = document.querySelector('nav.fixed.bottom-0');
    const modalContainer = document.querySelector('.fixed.inset-x-4.bottom-8');
    const executeButton = document.querySelector('button.mt-6.flex.w-full');
    const navBarHeight = navBar ? navBar.getBoundingClientRect().height : 0;
    const modalBottom = modalContainer ? modalContainer.getBoundingClientRect().bottom : 0;
    const buttonBottom = executeButton ? executeButton.getBoundingClientRect().bottom : 0;
    const viewportHeight = window.innerHeight;
    fetch('http://127.0.0.1:7244/ingest/c7158044-8971-4673-83ab-588906ca35c3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/chat/TriageModal.tsx:13',message:'Modal positioning check',data:{navBarHeight,modalBottom,buttonBottom,viewportHeight,buttonOverlap:buttonBottom > viewportHeight - navBarHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }
  // #endregion

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      onExecute();
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-slate-200/40 dark:bg-black/40 backdrop-blur-[6px] transition-all duration-500"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-x-4 bottom-[100px] top-auto md:top-1/2 md:-translate-y-1/2 md:bottom-auto z-[60] flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-glass backdrop-blur-2xl ring-1 ring-white/20 dark:bg-[#161e2e]/85 dark:border-white/10 dark:ring-white/5 transition-all"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full bg-gray-100/50 text-gray-500 hover:bg-gray-200/50 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              {/* Header Section */}
              <div className="flex flex-col items-center text-center mt-2">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-50 to-blue-100 text-primary shadow-inner dark:from-blue-900/20 dark:to-blue-800/20">
                  <span className="material-symbols-outlined text-[32px] drop-shadow-sm">auto_awesome</span>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  AI 收件箱整理
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-[260px]">
                  发现 <span className="font-bold text-primary dark:text-blue-400">150</span> 条低优先级消息。
                </p>
              </div>

              {/* Action List */}
              <div className="mt-8 space-y-3 w-full">
                {/* Row 1: Basketball Group */}
                <div className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl bg-white/60 p-3 pr-2 shadow-sm ring-1 ring-black/5 transition-all hover:bg-white/80 dark:bg-white/5 dark:ring-white/5 dark:hover:bg-white/10">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white dark:ring-white/10"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANf1HHDCVyOkYp0OFDlDAvlgSNHEGk9zFdgm45iT_WPxo_E1VTp3Iokv9DK7oPUS8gYI5EydEegwYo7ENDQjcOr--svR3rruNI6xnQhLSpMNXIiXFmIxdB1oAl4rqYEGjspP_QkLO-IH3-KzVXLr0HsIl1v4S7Gf8PiKBx4P-dyo0t57gm8aor5cVGqkwPZ5-2AlJxgQzQO2dnXQ4Mz-1eQlspmknxBCedw2NeLCaqJ0brPpl9OYIvY-vIfLOaMYH9muOZaKsnzJE")',
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div className="flex flex-col min-w-0 pr-2">
                    <span className="truncate text-sm font-bold text-slate-900 dark:text-white">篮球小组</span>
                    <span className="truncate text-xs font-medium text-slate-400">2 小时前</span>
                  </div>
                </div>
                {/* Smart Action Badge */}
                <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-primary dark:bg-blue-500/10 dark:text-blue-400">
                  <span className="material-symbols-outlined text-sm font-bold">summarize</span>
                  <span>摘要 1 条更新</span>
                </div>
              </div>

              {/* Row 2: Class Announce */}
              <div className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl bg-white/60 p-3 pr-2 shadow-sm ring-1 ring-black/5 transition-all hover:bg-white/80 dark:bg-white/5 dark:ring-white/5 dark:hover:bg-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white dark:ring-white/10"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCoUvyDn297_4tep8ZoWEYfMKXdSwBrZYKzmywr7RkXqVJKgYi3LLlJ0ZEYSLDySi0m7Mg2WRiQgf3jdOnNnXcPNWHwjXWYMvDl_H78Zumw4ikSA1u7b4_wAAudqACOy4l8Vhqs7_aD1yUt4MEQ9EcTKXDwns7iidwhgCvxZgUVxT0OiudYIC-FaFp9EzpooSYs_qeqreGe_lpN4wkMv2yavs6avl5jAbUo3SJPGgOIw5ES9mU2-42zjsXVXfHy8WeAeEGQFOI-WpI")',
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="truncate text-sm font-bold text-slate-900 dark:text-white">课程通知</span>
                    <span className="truncate text-xs font-medium text-slate-400">史密斯教授</span>
                  </div>
                </div>
                {/* Secondary Action Badge */}
                <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-500 dark:bg-white/5 dark:text-gray-400">
                  <span className="material-symbols-outlined text-sm">mark_chat_unread</span>
                  <span>保持未读</span>
                </div>
              </div>

              <div className="flex items-center justify-center pt-1">
                <span className="text-xs font-medium text-gray-400 dark:text-gray-600">+148 更多项</span>
              </div>
            </div>

            {/* Footer Primary Button */}
            <motion.button
              onClick={handleExecute}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-600 transition-all hover:bg-blue-600 hover:shadow-blue-500/40"
            >
              {isExecuting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="material-symbols-outlined text-lg"
                  >
                    sync
                  </motion.span>
                  <span>处理中...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">done_all</span>
                  <span>执行整理并标记为已读</span>
                </>
              )}
              </motion.button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

