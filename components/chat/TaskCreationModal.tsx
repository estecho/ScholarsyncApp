"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Toast from "@/components/Toast";

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  taskData?: {
    title: string;
    dueDate: string;
    source: string;
  };
}

export default function TaskCreationModal({ isOpen, onClose, onSuccess, taskData }: TaskCreationModalProps) {
  const [title, setTitle] = useState(taskData?.title || "提交草稿给詹金斯教授");
  const [dueDate, setDueDate] = useState(taskData?.dueDate || "周五，10 月 24 日 @ 11:59 PM");

  const handleAddToCalendar = () => {
    // 先关闭弹窗
    onClose();
    // 然后通知父组件显示 Toast
    if (onSuccess) {
      // 延迟一点确保弹窗关闭动画完成
      setTimeout(() => {
        onSuccess();
      }, 100);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-[60] bg-black/30 dark:bg-black/50 backdrop-blur-md transition-opacity"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[60] flex flex-col justify-end max-w-md mx-auto"
            >
              {/* Modal Card */}
              <div className="w-full bg-background-light dark:bg-gray-900 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                {/* BottomSheetHandle */}
                <div className="flex w-full flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
                  <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>

                {/* TopAppBar / Header */}
                <div className="px-6 pb-2 pt-2 flex items-center justify-between">
                  <h2 className="text-[#0d121b] dark:text-white text-xl font-bold leading-tight tracking-tight">
                    新任务
                  </h2>
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200/50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-500 dark:text-gray-300"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="px-6 pb-8 pt-2 overflow-y-auto max-h-[70vh]">
                  {/* Chips (AI Extracted Badge) */}
                  <div className="mb-6">
                    <div className="inline-flex h-8 items-center justify-center gap-x-1.5 rounded-full bg-primary/10 pl-3 pr-4 border border-primary/20">
                      <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                      <p className="text-primary text-xs font-semibold uppercase tracking-wide">AI 提取</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-5">
                    {/* Title Field */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold ml-1">标题</label>
                      <input
                        className="form-input w-full rounded-xl border-none bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary/50 text-[#0d121b] dark:text-white placeholder:text-gray-400 p-4 text-base font-medium shadow-sm transition-all"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* Time Field (Highlighted) */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[#0d121b] dark:text-gray-200 text-sm font-semibold ml-1">截止日期</label>
                      <div className="relative flex items-center w-full">
                        <input
                          className="form-input w-full rounded-xl border-none bg-primary/5 dark:bg-primary/10 focus:ring-2 focus:ring-primary/50 text-primary dark:text-blue-400 placeholder:text-gray-400 p-4 pr-12 text-base font-bold shadow-sm transition-all"
                          type="text"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                        <div className="absolute right-4 flex items-center pointer-events-none">
                          <span className="material-symbols-outlined text-primary dark:text-blue-400">calendar_month</span>
                        </div>
                      </div>
                    </div>

                    {/* Context Link */}
                    <div className="flex items-center gap-2 px-1">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 group cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined text-gray-500 text-[16px] rotate-45">link</span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          来源：{taskData?.source || "邮件线程"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-8 pt-4">
                    <button
                      onClick={handleAddToCalendar}
                      className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary hover:bg-blue-600 py-4 px-6 text-white shadow-lg shadow-primary/30 transition-all active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[20px]">event_available</span>
                      <span className="text-base font-bold">添加到日历并提醒我</span>
                    </button>
                  </div>
                  <div className="h-6"></div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

