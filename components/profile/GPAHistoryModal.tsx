"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export interface HistoryGPAData {
  id: string;
  semester: string;
  gpa: number;
  year?: string;
}

interface GPAHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyGPA: HistoryGPAData[];
  onAdd: (data: HistoryGPAData) => void;
  onUpdate: (id: string, data: Partial<HistoryGPAData>) => void;
  onDelete: (id: string) => void;
}

export default function GPAHistoryModal({
  isOpen,
  onClose,
  historyGPA,
  onAdd,
  onUpdate,
  onDelete,
}: GPAHistoryModalProps) {
  const [semester, setSemester] = useState("");
  const [gpaValue, setGpaValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSemester("");
      setGpaValue("");
      setEditingId(null);
    }
  }, [isOpen]);

  // Initialize form when editing
  const handleEdit = (item: HistoryGPAData) => {
    setSemester(item.semester);
    setGpaValue(item.gpa.toString());
    setEditingId(item.id);
  };

  const handleCancelEdit = () => {
    setSemester("");
    setGpaValue("");
    setEditingId(null);
  };

  const handleSubmit = () => {
    const numValue = parseFloat(gpaValue);
    if (!semester.trim() || isNaN(numValue) || numValue < 0 || numValue > 4.0) {
      return;
    }

    if (editingId) {
      onUpdate(editingId, { semester: semester.trim(), gpa: numValue });
    } else {
      onAdd({
        id: Date.now().toString(),
        semester: semester.trim(),
        gpa: numValue,
      });
    }

    setSemester("");
    setGpaValue("");
    setEditingId(null);
  };

  // Sort history by semester or GPA (you might want to sort by date if you add dates)
  const sortedHistory = [...historyGPA].sort((a, b) => a.semester.localeCompare(b.semester));

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
            className="fixed bottom-0 left-0 right-0 z-[100] max-w-md mx-auto bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col"
          >
            <div className="p-6 pb-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">历史 GPA 数据</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">close</span>
                </button>
              </div>

              {/* Add/Edit Form */}
              <div className="mb-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    学期名称
                  </label>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="例如: Fall 2023, S1, Year 1"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GPA 值 (0.0 - 4.0)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    step="0.01"
                    value={gpaValue}
                    onChange={(e) => setGpaValue(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-xl font-bold focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  {editingId && (
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      取消编辑
                    </button>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={!semester.trim() || !gpaValue}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors shadow-lg ${
                      !semester.trim() || !gpaValue
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90 shadow-primary/30"
                    }`}
                  >
                    {editingId ? "更新" : "添加"}
                  </button>
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {sortedHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">history</span>
                  <p className="text-sm">暂无历史数据</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    历史记录 ({sortedHistory.length})
                  </p>
                  {sortedHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.semester}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">GPA: {item.gpa.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="material-symbols-outlined text-primary text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <span className="material-symbols-outlined text-red-500 text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

