"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TimerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTime: number; // in seconds
  onConfirm: (minutes: number) => void;
}

export default function TimerSettingsModal({ isOpen, onClose, currentTime, onConfirm }: TimerSettingsModalProps) {
  const [selectedMinutes, setSelectedMinutes] = useState(Math.floor(currentTime / 60));

  const presetTimes = [25, 45, 60, 90];

  const handleConfirm = () => {
    onConfirm(selectedMinutes);
    onClose();
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Set Focus Duration</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">close</span>
              </button>
            </div>

            {/* Preset Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {presetTimes.map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => setSelectedMinutes(minutes)}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    selectedMinutes === minutes
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {minutes}m
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(Math.max(1, Math.min(120, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


