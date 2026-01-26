"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function BottomDrawer({
  isOpen,
  onClose,
  children,
  title,
}: BottomDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-surface-dark rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col max-w-md mx-auto"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            </div>

            {/* Title (if provided) */}
            {title && (
              <div className="px-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {title}
                </h2>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}






