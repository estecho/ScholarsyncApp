"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardHeader } from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import BottomDrawer from "@/components/BottomDrawer";
import SmartSuggestionDetail from "@/components/SmartSuggestionDetail";
import DynamicAlertCard from "@/components/DynamicAlertCard";
import TaskBreakdownModal from "@/components/TaskBreakdownModal";
import { COURSES } from "@/constants/courses";

export default function DashboardDayPage() {
  const router = useRouter();
  const [suggestionDrawerOpen, setSuggestionDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<"Cafeteria" | "Library">("Cafeteria");
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [suggestion1Expanded, setSuggestion1Expanded] = useState(false);
  const [suggestion2Expanded, setSuggestion2Expanded] = useState(false);

  const getTimeToday = (hour: number, minute: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setHours(hour, minute, 0, 0);
    if (target.getTime() < now.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    return target;
  };
  // 任务状态管理：courseId -> taskId -> completed
  const [taskStates, setTaskStates] = useState<Map<string, Map<string, boolean>>>(() => {
    const initialStates = new Map<string, Map<string, boolean>>();
    COURSES.forEach((course) => {
      const courseTasks = new Map<string, boolean>();
      course.tasks.forEach((task) => {
        courseTasks.set(task.id, task.completed);
      });
      initialStates.set(course.id, courseTasks);
    });
    return initialStates;
  });

  // Next class time: 10:00 AM today (uses helper for consistency)
  const getNextClassTime = () => getTimeToday(10, 0);

  const handleSuggestionClick = (location: "Cafeteria" | "Library") => {
    setSelectedLocation(location);
    setSuggestionDrawerOpen(true);
  };

  // 切换任务完成状态
  const handleTaskToggle = (courseId: string, taskId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 防止触发卡片导航
    setTaskStates((prev) => {
      const newStates = new Map(prev);
      const courseTasks = new Map(newStates.get(courseId) || new Map());
      const currentState = courseTasks.get(taskId) || false;
      courseTasks.set(taskId, !currentState);
      newStates.set(courseId, courseTasks);
      return newStates;
    });
  };

  // 获取任务完成状态
  const getTaskCompleted = (courseId: string, taskId: string): boolean => {
    return taskStates.get(courseId)?.get(taskId) || false;
  };

  return (
    <PageTransition>
      <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark pb-24 overflow-hidden shadow-2xl">
        <DashboardHeader
          date="10 月 24 日"
          dayName="星期三"
          weather="22°C"
          view="day"
          onViewChange={(view) => {
            router.push(`/dashboard/${view}`);
          }}
        />
      <main className="flex-1 px-4 py-6 relative pt-[203px]">
        <div className="absolute left-[70px] top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 h-full"></div>

        {/* 8 AM */}
        <div className="flex w-full mb-8 relative group">
          <div className="w-14 flex flex-col items-end pr-3 pt-1 shrink-0">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              8 AM
            </span>
          </div>
          <div className="flex-1 relative pl-4">
            <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-background-light dark:bg-background-dark z-10"></div>
          </div>
        </div>

        {/* 9 AM - Morning Coffee */}
        <div className="flex w-full mb-6 relative group">
          <div className="w-14 flex flex-col items-end pr-3 pt-1 shrink-0">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              9 AM
            </span>
          </div>
          <div className="flex-1 relative pl-4">
            <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-background-light dark:bg-background-dark z-10"></div>
            <div className="p-3 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3 w-fit">
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <span className="material-symbols-outlined text-[18px]">coffee</span>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                晨间咖啡
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Alert Card - urgent */}
        <DynamicAlertCard
          nextClassTime={getNextClassTime()}
          location="Room 304"
          courseId="cs-101"
          statusOverride="urgent"
          textOverride="立即前往 304 室"
          onClick={() => router.push(`/navigation?destination=Room 304&courseId=cs-101`)}
        />

        {/* 10:00 AM - CS 101 Class */}
        {(() => {
          const course = COURSES.find((c) => c.id === "cs-101");
          if (!course) return null;
          return (
            <div className="flex w-full relative group">
              <div className="w-14 flex flex-col items-end pr-3 shrink-0">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  10:00
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">AM</span>
              </div>
              <div className="flex-1 relative pl-4 pb-12">
                <div className="absolute left-[-6px] top-1.5 h-3.5 w-3.5 rounded-full border-4 border-white dark:border-background-dark bg-primary shadow-sm z-10"></div>
                <div className="absolute left-[-1px] top-4 bottom-0 w-0.5 bg-primary/20 z-0"></div>
                <motion.div
                  layoutId={`course-card-${course.id}`}
                  layout
                  onClick={() => router.push(`/schedule/course/${course.id}`)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                  className="relative overflow-hidden rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-[0.99] cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-[80px]">terminal</span>
                  </div>
                  <div className="p-5 relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/10">
                        {course.type || "Lecture"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTaskModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-red-500/90 text-white border border-red-400 shadow-sm animate-pulse hover:bg-red-500 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        作业今日到期
                      </button>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <span className="material-symbols-outlined text-[16px]">
                          location_on
                        </span>
                        <span>{course.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <span className="material-symbols-outlined text-[16px]">person</span>
                        <span>{course.professor.name}</span>
                      </div>
                    </div>
                    {course.tasks.length > 0 && (() => {
                      const task = course.tasks[0];
                      const isCompleted = getTaskCompleted(course.id, task.id);
                      return (
                        <div 
                          className="mt-4 bg-white/10 rounded-xl p-3 flex items-center gap-3 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors cursor-pointer group/task"
                          onClick={(e) => handleTaskToggle(course.id, task.id, e)}
                        >
                          <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                            isCompleted 
                              ? "bg-white border-white" 
                              : "border-white/60 group-hover/task:border-white"
                          }`}>
                            {isCompleted && (
                              <span className="material-symbols-outlined text-primary text-sm">
                                check
                              </span>
                            )}
                          </div>
                          <span className={`text-sm font-medium transition-all ${
                            isCompleted 
                              ? "line-through opacity-60 text-white/70" 
                              : "text-white group-hover/task:text-white"
                          }`}>
                            {task.title}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
                <div className="absolute left-4 bottom-0 z-20 opacity-60 grayscale">
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-white dark:border-slate-700 px-3 py-1.5 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[14px]">
                      schedule
                    </span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      课程结束 {course.time.end}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 12:00 PM - Smart Suggestions */}
        <div className="flex w-full relative group">
          <div className="w-14 flex flex-col items-end pr-3 shrink-0 pt-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              12:00
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">PM</span>
          </div>
          <div className="flex-1 relative pl-4 pb-10">
            <div className="absolute left-[-5px] top-3 h-2.5 w-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-background-light dark:bg-background-dark z-10"></div>
            <div className="absolute left-[-1px] top-4 bottom-0 w-0.5 border-l-2 border-dashed border-slate-300 dark:border-slate-700 z-0 h-[calc(100%-20px)] ml-[0.5px]"></div>
            <motion.div
              className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 dark:bg-primary/10 overflow-hidden cursor-pointer"
              onClick={() => setSuggestion1Expanded(!suggestion1Expanded)}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ height: suggestion1Expanded ? "auto" : "auto" }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-[24px]">
                        smart_toy
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                        AI 建议
                      </h4>
                      <motion.span
                        className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]"
                        animate={{ rotate: suggestion1Expanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        expand_more
                      </motion.span>
                    </div>
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {!suggestion1Expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 flex items-center gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">☕</span>
                          <span className="text-2xl">📚</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          您有 2 小时空闲时间
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                    {suggestion1Expanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3"
                      >
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                          您有 2 小时空闲时间。根据人流情况：
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSuggestionClick("Cafeteria");
                            }}
                            className="flex flex-col items-start gap-2 p-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:border-green-500/50 hover:shadow-md transition-all text-left active:scale-95"
                          >
                            <span className="text-xl">☕</span>
                            <div>
                              <span className="block text-xs font-bold text-slate-800 dark:text-white">
                                食堂
                              </span>
                              <span className="block text-[10px] text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-md w-fit mt-0.5">
                                人少
                              </span>
                            </div>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSuggestionClick("Library");
                            }}
                            className="flex flex-col items-start gap-2 p-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all text-left active:scale-95"
                          >
                            <span className="text-xl">📚</span>
                            <div>
                              <span className="block text-xs font-bold text-slate-800 dark:text-white">
                                图书馆
                              </span>
                              <span className="block text-[10px] text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded-md w-fit mt-0.5">
                                安静
                              </span>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 2:30 PM - Art History */}
        {(() => {
          const course = COURSES.find((c) => c.id === "history-of-art");
          if (!course) return null;
          return (
            <div className="flex w-full relative group">
              <div className="w-14 flex flex-col items-end pr-3 shrink-0 pt-1">
                <span className="text-xs font-medium text-slate-800 dark:text-slate-300">
                  2:30
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">PM</span>
              </div>
              <div className="flex-1 relative pl-4 pb-8">
                <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-indigo-500 bg-background-light dark:bg-background-dark z-10"></div>
                <div className="absolute left-[-1px] top-4 bottom-0 w-0.5 bg-indigo-500/20 z-0 h-full"></div>
                <motion.div
                  layoutId={`course-card-${course.id}`}
                  layout
                  onClick={() => router.push(`/schedule/course/${course.id}`)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                  className="flex items-stretch overflow-hidden rounded-2xl bg-white dark:bg-surface-dark border-l-4 border-indigo-500 shadow-soft cursor-pointer"
                >
                  <div className="p-4 flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {course.location} • {course.professor.name}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                        {course.type || "Seminar"}
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-24 bg-cover bg-center"
                    data-alt="Abstract colorful art details representing art history class"
                    style={{
                      backgroundImage: `url('https://placehold.co/200x200/png?text=${encodeURIComponent(course.name)}')`,
                    }}
                  >
                    <div className="h-full w-full bg-indigo-900/10 dark:bg-indigo-900/40 backdrop-blur-[1px]"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })()}

        {/* 4:30 PM Alert - non urgent (green) */}
        <DynamicAlertCard
          nextClassTime={getTimeToday(16, 30)}
          location="Room 405"
          courseId="advanced-psychology"
          statusOverride="ok"
          textOverride="30 分钟后前往 405 室"
          onClick={() => router.push(`/navigation?destination=Room 405&courseId=advanced-psychology`)}
        />

        {/* 4:30 PM - Advanced Psychology */}
        {(() => {
          const course = COURSES.find((c) => c.id === "advanced-psychology");
          if (!course) return null;
          return (
            <div className="flex w-full relative group">
              <div className="w-14 flex flex-col items-end pr-3 shrink-0">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  4:30
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">PM</span>
              </div>
              <div className="flex-1 relative pl-4 pb-12">
                <div className="absolute left-[-6px] top-1.5 h-3.5 w-3.5 rounded-full border-4 border-white dark:border-background-dark bg-primary shadow-sm z-10"></div>
                <div className="absolute left-[-1px] top-4 bottom-0 w-0.5 bg-primary/20 z-0"></div>
                <motion.div
                  layoutId={`course-card-${course.id}`}
                  layout
                  onClick={() => router.push(`/schedule/course/${course.id}`)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                  className="relative overflow-hidden rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-[0.99] cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-[80px]">psychology</span>
                  </div>
                  <div className="p-5 relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/10">
                        {course.type || "Lecture"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <span className="material-symbols-outlined text-[16px]">
                          location_on
                        </span>
                        <span>{course.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <span className="material-symbols-outlined text-[16px]">person</span>
                        <span>{course.professor.name}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute left-4 bottom-0 z-20 opacity-60 grayscale">
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-white dark:border-slate-700 px-3 py-1.5 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[14px]">
                      schedule
                    </span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Class ends 6:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 6:10 PM - End of day */}
        <div className="flex w-full mb-8 relative group">
          <div className="w-14 flex flex-col items-end pr-3 pt-1 shrink-0">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              6:10 PM
            </span>
          </div>
          <div className="flex-1 relative pl-4">
            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600 z-10"></div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 italic">
              Classes finished for the day
            </p>
          </div>
        </div>

        {/* Evening Smart Suggestions */}
        <div className="flex w-full relative group">
          <div className="w-14 flex flex-col items-end pr-3 shrink-0 pt-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              7:00
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">PM</span>
          </div>
          <div className="flex-1 relative pl-4 pb-10">
            <div className="absolute left-[-5px] top-3 h-2.5 w-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-background-light dark:bg-background-dark z-10"></div>
            <div className="absolute left-[-1px] top-4 bottom-0 w-0.5 border-l-2 border-dashed border-slate-300 dark:border-slate-700 z-0 h-[calc(100%-20px)] ml-[0.5px]"></div>
            <motion.div
              className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 dark:bg-primary/10 overflow-hidden cursor-pointer"
              onClick={() => setSuggestion2Expanded(!suggestion2Expanded)}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ height: suggestion2Expanded ? "auto" : "auto" }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-[24px]">
                        smart_toy
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                        AI 建议
                      </h4>
                      <motion.span
                        className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]"
                        animate={{ rotate: suggestion2Expanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        expand_more
                      </motion.span>
                    </div>
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {!suggestion2Expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 flex items-center gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">📚</span>
                          <span className="text-2xl">🥗</span>
                          <span className="text-2xl">🧘‍♂️</span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Evening ideas
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                    {suggestion2Expanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3"
                      >
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                          Evening ideas based on energy and crowd levels:
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSuggestionClick("Library");
                            }}
                            className="flex flex-col items-start gap-2 p-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all text-left active:scale-95"
                          >
                            <span className="text-xl">📚</span>
                            <div>
                              <span className="block text-xs font-bold text-slate-800 dark:text-white">
                                Quiet Review
                              </span>
                              <span className="block text-[10px] text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded-md w-fit mt-0.5">
                                Library - Calm
                              </span>
                            </div>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSuggestionClick("Cafeteria");
                            }}
                            className="flex flex-col items-start gap-2 p-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:border-green-500/50 hover:shadow-md transition-all text-left active:scale-95"
                          >
                            <span className="text-xl">🥗</span>
                            <div>
                              <span className="block text-xs font-bold text-slate-800 dark:text-white">
                                Light Dinner
                              </span>
                              <span className="block text-[10px] text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-md w-fit mt-0.5">
                                Cafeteria - Low crowd
                              </span>
                            </div>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSuggestionClick("Cafeteria");
                            }}
                            className="flex flex-col items-start gap-2 p-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all text-left active:scale-95 col-span-2"
                          >
                            <span className="text-xl">🧘‍♂️</span>
                            <div>
                              <span className="block text-xs font-bold text-slate-800 dark:text-white">
                                Wind-down & Stretch
                              </span>
                              <span className="block text-[10px] text-amber-600 dark:text-amber-400 font-medium bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-md w-fit mt-0.5">
                                20 min mobility before bedtime
                              </span>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <BottomNav />

      {/* Smart Suggestion Drawer */}
      <BottomDrawer
        isOpen={suggestionDrawerOpen}
        onClose={() => setSuggestionDrawerOpen(false)}
      >
        <SmartSuggestionDetail location={selectedLocation} />
      </BottomDrawer>

      {/* Task Breakdown Modal */}
      <TaskBreakdownModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        assignmentId="assignment-due-today"
        courseName="计算机科学 101"
      />
      </div>
    </PageTransition>
  );
}

