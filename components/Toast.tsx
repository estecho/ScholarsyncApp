"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-2xl shadow-lg shadow-black/20 border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-400">check_circle</span>
              <span className="text-sm font-medium">{message}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


