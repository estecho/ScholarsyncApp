"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface GPAEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGPA: number;
  onConfirm: (gpa: number) => void;
}

export default function GPAEditModal({ isOpen, onClose, currentGPA, onConfirm }: GPAEditModalProps) {
  const [gpaValue, setGpaValue] = useState(currentGPA.toString());

  const handleConfirm = () => {
    const numValue = parseFloat(gpaValue);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 4.0) {
      onConfirm(numValue);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-0 left-0 right-0 z-[100] max-w-md mx-auto bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">编辑 GPA 目标</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">close</span>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                目标 GPA (0.0 - 4.0)
              </label>
              <input
                type="number"
                min="0"
                max="4"
                step="0.1"
                value={gpaValue}
                onChange={(e) => setGpaValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-2xl font-bold text-center focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
              >
                确认
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


