"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";
import { getCourseById, Course, CourseTask } from "@/constants/courses";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const course = getCourseById(courseId);
  const [showAIComposer, setShowAIComposer] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<CourseTask[]>(() => {
    const courseData = getCourseById(courseId);
    return courseData?.tasks ? [...courseData.tasks] : [];
  });
  const [newTaskInput, setNewTaskInput] = useState("");

  if (!course) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Course not found</p>
        </div>
      </PageTransition>
    );
  }

  const handleAcknowledgeRoomChange = () => {
    // TODO: Update course data to mark as acknowledged
  };

  const handleStartNavigation = () => {
    if (course.location && course.id) {
      const destination = encodeURIComponent(course.location);
      const courseId = encodeURIComponent(course.id);
      router.push(`/navigation?destination=${destination}&courseId=${courseId}`);
    }
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    const trimmedInput = newTaskInput.trim();
    if (!trimmedInput) return;

    const newTask: CourseTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: trimmedInput,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskInput("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <PageTransition>
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden pb-24 bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white antialiased transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-30 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
          <button
            onClick={() => router.back()}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[#0d121b] dark:text-white" style={{ fontSize: "24px" }}>
              arrow_back
            </span>
          </button>
          <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight flex-1 text-center">
            Course Details
          </h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-[#0d121b] dark:text-white" style={{ fontSize: "24px" }}>
                more_horiz
              </span>
            </button>
          </div>
        </div>

        {/* Main Content - Hero Element with layoutId */}
        <motion.div
          layoutId={`course-card-${course.id}`}
          layout
          className="flex-1 overflow-y-auto px-4 pt-2 flex flex-col gap-[21px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          {/* Course Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-[#0d121b] dark:text-white text-3xl font-extrabold leading-tight tracking-tight">
              {course.title}
            </h1>
          </motion.div>

          {/* Professor Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-4 relative z-20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    alt={`Portrait of ${course.professor.name}`}
                    className="h-full w-full object-cover"
                    src={course.professor.avatar}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.professor.name)}&size=48&background=6366f1&color=ffffff&bold=true&format=png`;
                    }}
                  />
                </div>
                <div>
                  <p className="text-[#0d121b] dark:text-white text-base font-semibold">
                    {course.professor.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                    {course.professor.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative">
                <button className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-[54px]">
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    mail
                  </span>
                  Email
                </button>
                <button
                  onClick={() => setShowAIComposer(!showAIComposer)}
                  className="relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-ai-start/10 to-ai-end/10 border border-indigo-200 dark:border-indigo-800 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-indigo-500" style={{ fontSize: "18px" }}>
                    article
                  </span>
                  Request Leave
                </button>
                {showAIComposer && (
                  <div className="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-[#1a2235] rounded-xl shadow-ai-glow border border-indigo-100 dark:border-indigo-900 overflow-hidden transform transition-all animate-[fadeIn_0.3s_ease-out]">
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined ai-gradient-text" style={{ fontSize: "16px" }}>
                          auto_awesome
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                          AI Composer
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-200 font-medium leading-snug font-mono bg-indigo-50/50 dark:bg-indigo-900/10 p-2 rounded-lg">
                        "Dear {course.professor.name.split(" ")[0]}, I am writing to request...
                        <span className="inline-block w-0.5 h-4 bg-indigo-500 align-middle ml-0.5 animate-cursor"></span>"
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Room Change Alert */}
          {course.roomChangeAlert && !course.roomChangeAlert.acknowledged && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full rounded-2xl bg-[#FFF4E5] dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 p-4 flex items-start gap-3 shadow-sm"
            >
              <div className="rounded-full bg-orange-100 dark:bg-orange-800/40 p-1.5 shrink-0 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  warning
                </span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-[#0d121b] dark:text-orange-50 text-sm font-bold leading-snug">
                  {course.roomChangeAlert.message}
                </p>
                <button
                  onClick={handleAcknowledgeRoomChange}
                  className="text-orange-600 dark:text-orange-400 text-xs font-semibold underline text-left w-fit hover:text-orange-700 dark:hover:text-orange-300"
                >
                  Acknowledge
                </button>
              </div>
            </motion.div>
          )}

          {/* Time and Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl bg-white dark:bg-[#1a2235] p-1 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="p-4 pb-2 flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>
                schedule
              </span>
              <span className="text-sm font-medium">
                {course.time.start} - {course.time.end}
              </span>
              <span className="mx-1 text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm font-medium">{course.location}</span>
            </div>
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${course.mapImage}')` }}
              ></div>
              <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
              <div className="absolute top-3 left-3 right-3 bg-white/95 dark:bg-[#101622]/95 backdrop-blur-md rounded-lg p-2.5 shadow-lg flex items-center gap-3 border-l-4 border-indigo-500 animate-[slideDown_0.5s_ease-out]">
                <div className="text-xl">🌧️</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800 dark:text-white">Rain detected</p>
                  <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                    Leave in 5 min to arrive on time.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)]">
                <button 
                  onClick={handleStartNavigation}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-blue-600 text-white font-bold h-12 shadow-lg transition-transform active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    near_me
                  </span>
                  Start Navigation
                </button>
              </div>
            </div>
          </motion.div>

          {/* Course Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-white dark:bg-[#1a2235] p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[#0d121b] dark:text-white text-base font-bold">Course Tasks</h3>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                  sync
                </span>
                Syncs to Home
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <div key={task.id}>
                  {task.breakdown ? (
                    <div className="rounded-xl bg-white dark:bg-[#1a2235] border border-indigo-100 dark:border-indigo-900/50 shadow-sm overflow-hidden ring-1 ring-indigo-50 dark:ring-indigo-900/30">
                      <label
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-900/20 cursor-pointer group"
                        onClick={() =>
                          setExpandedTaskId(expandedTaskId === task.id ? null : task.id)
                        }
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleTaskToggle(task.id);
                          }}
                          className="peer form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600 focus:ring-primary focus:ring-offset-0 bg-transparent"
                        />
                        <span className="flex-1 text-sm font-bold text-[#0d121b] dark:text-white">
                          {task.title}
                        </span>
                        <span
                          className={`material-symbols-outlined text-gray-400 transform transition-transform ${
                            expandedTaskId === task.id ? "" : "rotate-180"
                          }`}
                          style={{ fontSize: "20px" }}
                        >
                          expand_more
                        </span>
                      </label>
                      {expandedTaskId === task.id && (
                        <div className="px-3 pb-3 pt-1">
                          <div className="ml-2 pl-4 border-l-2 border-dashed border-indigo-200 dark:border-indigo-800 space-y-3 relative">
                            <div className="absolute -left-[19px] top-0 flex items-center gap-1 bg-white dark:bg-[#1a2235] pr-2 py-1">
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
                                <span className="material-symbols-outlined" style={{ fontSize: "10px" }}>
                                  auto_awesome
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider">
                                  AI Breakdown
                                </span>
                              </div>
                            </div>
                            {task.breakdown.map((phase, idx) => {
                              const colorClasses: Record<string, string> = {
                                indigo: "bg-indigo-300 dark:bg-indigo-700",
                                purple: "bg-purple-300 dark:bg-purple-700",
                                pink: "bg-pink-300 dark:bg-pink-700",
                              };
                              return (
                                <div key={idx} className={`${idx === 0 ? "pt-6" : ""} flex items-center gap-2`}>
                                  <div className={`w-2 h-2 rounded-full ${colorClasses[phase.color] || colorClasses.indigo}`}></div>
                                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                    {phase.phase}
                                  </span>
                                  <span className="text-[10px] text-gray-400">{phase.duration}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-background-light dark:bg-background-dark/50 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleTaskToggle(task.id)}
                        className="peer form-checkbox h-5 w-5 text-primary rounded border-gray-300 dark:border-gray-600 focus:ring-primary focus:ring-offset-0 bg-transparent"
                      />
                      <span className="text-sm font-medium text-gray-500 peer-checked:text-gray-400 peer-checked:line-through transition-colors">
                        {task.title}
                      </span>
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                style={{ fontSize: "20px" }}
              >
                add
              </span>
              <input
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="w-full rounded-full bg-background-light dark:bg-background-dark/50 border-none py-2.5 pl-10 pr-4 text-sm font-medium text-[#0d121b] dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20"
                placeholder="Add a task..."
                type="text"
              />
            </div>
          </motion.div>

          {/* Classmates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col gap-4 pb-0"
          >
            <div className="flex flex-col gap-3">
              <div className="flex grid-cols-3 grid-rows-1 gap-[132px] items-center px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[#0d121b] dark:text-white text-base font-bold">Classmates</h3>
                  <div className="flex items-center gap-1 pl-2 pr-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-100 dark:border-indigo-500/30">
                    <span className="material-symbols-outlined text-indigo-500 animate-pulse-slow" style={{ fontSize: "14px" }}>
                      auto_awesome
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                      AI Matched
                    </span>
                  </div>
                </div>
                <button className="text-primary text-sm font-medium hover:text-indigo-600 transition-colors">
                  View All
                </button>
              </div>
              <div className="flex gap-[3px] overflow-x-auto py-[5px] px-0 hide-scrollbar snap-x snap-mandatory justify-center items-end w-full overflow-visible">
                {course.students.map((student, idx) => (
                  <div
                    key={idx}
                    className="snap-center shrink-0 w-[130px] p-3 rounded-2xl bg-white dark:bg-[#1a2235] border border-indigo-200 dark:border-indigo-800 shadow-[0_4px_20px_-8px_rgba(99,102,241,0.3)] flex flex-col items-center gap-2 relative group hover:scale-[1.02] transition-transform"
                  >
                    {student.match && (
                      <div className="absolute -top-2 right-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                        {student.match}% Match
                      </div>
                    )}
                    <div className="relative mt-1">
                      <img
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-50 dark:ring-indigo-900/50"
                        src={student.avatar}
                        alt={student.name}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&size=56&background=6366f1&color=ffffff&bold=true&format=png`;
                        }}
                      />
                      <div className="absolute bottom-0 right-0 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#1a2235]"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#0d121b] dark:text-white">{student.name}</p>
                      {student.subtitle && (
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{student.subtitle}</p>
                      )}
                    </div>
                    {student.tag && (
                      <div className="w-full bg-indigo-50 dark:bg-indigo-900/20 rounded-lg py-1.5 px-1 text-center">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
                          {student.tag}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="snap-center shrink-0 w-[130px] h-[173px] p-3 rounded-2xl bg-gray-50 dark:bg-[#151b28] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center items-center gap-4">
                  <div className="flex -space-x-3 items-center justify-center pt-2">
                    {course.students.slice(0, 3).map((student, idx) => (
                      <img
                        key={idx}
                        className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-[#151b28] object-cover opacity-80"
                        src={student.avatar}
                        alt={student.name}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&size=36&background=6366f1&color=ffffff&bold=true&format=png`;
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-center pb-2">
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500">+12 Others</p>
                    <button className="mt-2 text-[10px] font-semibold text-primary underline">See All</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About this course */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-1 mt-2 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[#0d121b] dark:text-white text-base font-bold">About this course</h3>
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-sm">psychology</span>
                AI Parsed
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 text-xs font-semibold border border-blue-100 dark:border-blue-800"
                >
                  {tag}
                </span>
              ))}
              {course.examDate && (
                <span className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200 text-xs font-semibold border border-rose-100 dark:border-rose-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">event</span>
                  Exam: {course.examDate}
                </span>
              )}
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 group hover:border-indigo-500 transition-all">
              <span
                className="material-symbols-outlined text-indigo-500 group-hover:scale-110 transition-transform"
                style={{ fontSize: "18px" }}
              >
                download
              </span>
              <span className="text-sm font-semibold ai-gradient-text">
                Import 4 Deadlines from Syllabus
              </span>
            </button>
          </motion.div>
        </motion.div>

        <BottomNav />
      </div>
    </PageTransition>
  );
}

