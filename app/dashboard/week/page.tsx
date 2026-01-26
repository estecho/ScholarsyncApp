"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { COURSES } from "@/constants/courses";
import { getGroupMemberAvatars } from "@/lib/avatarUtils";

export default function DashboardWeekPage() {
  const router = useRouter();

  return (
    <PageTransition>
      <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark pb-24 overflow-hidden shadow-2xl">
        <DashboardHeader
          date="Oct 21-25"
          dayName="Week 9"
          weather="22°C"
          view="week"
          onViewChange={(view) => {
            router.push(`/dashboard/${view}`);
          }}
        />
      <main className="flex-1 relative overflow-y-auto hide-scrollbar pt-[203px]">
        <div className="flex min-h-[700px]">
          {/* Time labels */}
          <div className="w-10 shrink-0 flex flex-col justify-between py-4 text-[10px] text-slate-400 font-medium text-right pr-2 border-r border-slate-100 dark:border-slate-800 bg-background-light dark:bg-background-dark z-20 sticky left-0">
            <div className="h-10">8 AM</div>
            <div className="h-10">9 AM</div>
            <div className="h-10">10 AM</div>
            <div className="h-10">11 AM</div>
            <div className="h-10">12 PM</div>
            <div className="h-10">1 PM</div>
            <div className="h-10">2 PM</div>
            <div className="h-10">3 PM</div>
            <div className="h-10">4 PM</div>
            <div className="h-10">5 PM</div>
            <div className="h-10">6 PM</div>
          </div>

          {/* Grid container */}
          <div className="flex-1 grid grid-cols-5 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none z-0">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="border-b border-slate-100 dark:border-slate-800/50 h-10 w-full"
                ></div>
              ))}
            </div>

            {/* Current time indicator */}
            <div className="absolute w-full z-30 pointer-events-none top-[256px]">
              <div className="relative w-full">
                <div className="absolute -left-1 -top-2 bg-action-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded-r text-center shadow-md">
                  Now
                </div>
                <div className="border-t-2 border-action-red w-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              </div>
            </div>

            {/* Monday */}
            {(() => {
              const course = COURSES.find((c) => c.id === "calculus-i");
              if (!course) return null;
              return (
                <div className="relative border-r border-slate-50 dark:border-slate-800/30 bg-white dark:bg-transparent">
                  <motion.div
                    layoutId={`course-card-${course.id}`}
                    onClick={() => router.push(`/schedule/course/${course.id}`)}
                    whileHover={{ scale: 1.02 }}
                    className="absolute top-[76px] left-0.5 right-0.5 h-[100px] rounded-md bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 p-1 flex flex-col shadow-sm cursor-pointer transition-transform z-10"
                  >
                    <span className="text-[9px] font-bold text-blue-700 dark:text-blue-200">
                      {course.title}
                    </span>
                    <span className="text-[8px] text-blue-600 dark:text-blue-300">
                      {course.location}
                    </span>
                  </motion.div>
                </div>
              );
            })()}

            {/* Tuesday */}
            <div className="relative border-r border-slate-50 dark:border-slate-800/30 bg-white dark:bg-transparent">
              <div className="absolute top-[66px] left-0.5 right-0.5 h-[60px] rounded-md bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800 p-1 flex flex-col shadow-sm z-10 opacity-90">
                <span className="text-[9px] font-bold text-purple-700 dark:text-purple-200 leading-tight">
                  Physics
                </span>
              </div>
              <div className="absolute top-[96px] left-0.5 right-0.5 h-[60px] rounded-md bg-white dark:bg-surface-dark border-2 border-action-red/20 dark:border-action-red/30 p-1 flex flex-col shadow-md z-20">
                <span className="text-[9px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                  Bio Lab
                </span>
              </div>
              <div className="absolute top-[86px] -right-2 z-30 bg-action-red text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark shadow-action animate-bounce">
                <span className="text-[12px] font-bold">!</span>
              </div>
            </div>

            {/* Wednesday */}
            <div className="relative border-r border-slate-50 dark:border-slate-800/30 bg-orange-50/70 dark:bg-orange-900/20">
              {(() => {
                const course = COURSES.find((c) => c.id === "cs-101");
                if (!course) return null;
                return (
                  <motion.div
                    layoutId={`course-card-${course.id}`}
                    onClick={() => router.push(`/schedule/course/${course.id}`)}
                    whileHover={{ scale: 1.02 }}
                    className="absolute top-[136px] left-0.5 right-0.5 h-[120px] rounded-md bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 p-1 flex flex-col shadow-sm transition-transform z-10 cursor-pointer"
                  >
                    <span className="text-[9px] font-bold text-amber-700 dark:text-amber-200">
                      {course.title}
                    </span>
                    <span className="text-[8px] text-amber-600 dark:text-amber-300">
                      {course.location}
                    </span>
                  </motion.div>
                );
              })()}
              <div className="absolute top-[296px] left-0.5 right-0.5 h-[80px] rounded-md bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 p-1 flex flex-col shadow-sm z-10">
                <span className="text-[9px] font-bold text-slate-700 dark:text-slate-200">
                  Study
                </span>
              </div>
            </div>

            {/* Thursday */}
            {(() => {
              const course = COURSES.find((c) => c.id === "history-of-art");
              if (!course) return null;
              return (
                <div className="relative border-r border-slate-50 dark:border-slate-800/30 bg-white dark:bg-transparent">
                  <motion.div
                    layoutId={`course-card-${course.id}`}
                    onClick={() => router.push(`/schedule/course/${course.id}`)}
                    whileHover={{ scale: 1.02 }}
                    className="absolute top-[176px] left-0.5 right-0.5 h-[80px] rounded-md bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 p-1 flex flex-col shadow-sm transition-transform z-10 cursor-pointer"
                  >
                    <span className="text-[9px] font-bold text-indigo-700 dark:text-indigo-200">
                      {course.title}
                    </span>
                    <span className="text-[8px] text-indigo-600 dark:text-indigo-300">
                      {course.location}
                    </span>
                  </motion.div>
                </div>
              );
            })()}

            {/* Friday */}
            <div className="relative bg-emerald-50/60 dark:bg-emerald-900/20">
              <div className="absolute top-[56px] left-0.5 right-0.5 h-[60px] rounded-md bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 p-1 flex flex-col shadow-sm z-10">
                <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-200">
                  Gym
                </span>
              </div>
              <div className="absolute top-[336px] left-1 right-1 h-auto py-3 px-1 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 flex flex-col items-center justify-center shadow-glass cursor-pointer hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all group z-20">
                <div className="flex -space-x-2 mb-1.5">
                  {getGroupMemberAvatars().map((avatar, idx) => (
                    <img
                      key={idx}
                      alt="User"
                      className="w-5 h-5 rounded-full border border-white dark:border-surface-dark ring-1 ring-black/5"
                      src={avatar}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=User${idx + 1}&size=20&background=6366f1&color=ffffff&bold=true&format=png`;
                      }}
                    />
                  ))}
                </div>
                <span className="text-[8px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">
                  Group Free
                  <br />
                  Time
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
      </div>
    </PageTransition>
  );
}

