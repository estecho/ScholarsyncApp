"use client";

import { useState, useEffect } from "react";
import BottomDrawer from "./BottomDrawer";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentId: string;
  courseName: string;
}

// Default AI-generated task breakdown
const DEFAULT_TASKS: Omit<Task, "completed">[] = [
  { id: "1", text: "阅读PDF文档" },
  { id: "2", text: "撰写草稿" },
  { id: "3", text: "提交作业" },
];

const STORAGE_KEY_PREFIX = "task-cs101";

export default function TaskBreakdownModal({
  isOpen,
  onClose,
  assignmentId,
  courseName,
}: TaskBreakdownModalProps) {
  const storageKey = `${STORAGE_KEY_PREFIX}-${assignmentId}`;
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on mount and when assignmentId changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setTasks(parsed.tasks || []);
      } else {
        // Initialize with default tasks (all incomplete)
        const initialTasks: Task[] = DEFAULT_TASKS.map((task) => ({
          ...task,
          completed: false,
        }));
        setTasks(initialTasks);
        // Save initial state
        localStorage.setItem(
          storageKey,
          JSON.stringify({ tasks: initialTasks })
        );
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      // Fallback to default tasks
      const initialTasks: Task[] = DEFAULT_TASKS.map((task) => ({
        ...task,
        completed: false,
      }));
      setTasks(initialTasks);
    }
  }, [storageKey]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (typeof window === "undefined" || tasks.length === 0) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify({ tasks }));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks, storageKey]);

  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose} title="任务拆解">
      <div className="flex flex-col gap-6">
        {/* Header Info */}
        <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 border border-primary/20">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1">
            {courseName}
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            AI 生成的任务拆解
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              进度
            </span>
            <span className="text-sm font-bold text-primary">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="w-full flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all text-left active:scale-[0.98]"
            >
              <div
                className={`flex-shrink-0 h-6 w-6 rounded border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? "bg-primary border-primary"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              >
                {task.completed && (
                  <span className="material-symbols-outlined text-white text-sm">
                    check
                  </span>
                )}
              </div>
              <span
                className={`flex-1 text-sm font-medium transition-colors ${
                  task.completed
                    ? "text-slate-500 dark:text-slate-400 line-through"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {task.text}
              </span>
            </button>
          ))}
        </div>

        {/* Completion Message */}
        {completedCount === totalCount && totalCount > 0 && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400">
                check_circle
              </span>
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                所有任务已完成！
              </p>
            </div>
          </div>
        )}
      </div>
    </BottomDrawer>
  );
}





