"use client";

import { motion, AnimatePresence } from "framer-motion";

type StressLevel = "low" | "medium" | "high";

interface StressLevelPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (level: StressLevel) => void;
  position: { x: number; y: number };
}

export default function StressLevelPopover({ isOpen, onClose, onSelect, position }: StressLevelPopoverProps) {
  if (!isOpen) return null;

  const handleSelect = (level: StressLevel) => {
    onSelect(level);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed z-[100] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -100%)",
          marginTop: "-8px",
        }}
      >
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleSelect("low")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-left"
          >
            <div className="size-3 rounded-full bg-emerald-400"></div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Low</span>
          </button>
          <button
            onClick={() => handleSelect("medium")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-left"
          >
            <div className="size-3 rounded-full bg-orange-400"></div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Medium</span>
          </button>
          <button
            onClick={() => handleSelect("high")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
          >
            <div className="size-3 rounded-full bg-red-500"></div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">High</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}


