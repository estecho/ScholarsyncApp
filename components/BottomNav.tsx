"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNav } from "@/contexts/NavContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { viewMode, currentView, setSearchOverlayOpen } = useNav();
  const isDragging = viewMode === "dragging";

  // Hide navigation bar on focus timer page (fullscreen mode)
  if (pathname === "/profile/focus/timer") {
    return null;
  }

  // Hide navigation bar on authentication/onboarding pages
  const authPages = ["/login", "/import", "/scan", "/connect", "/review"];
  if (authPages.includes(pathname || "")) {
    return null;
  }

  // Hide navigation bar on navigation page (fullscreen map)
  if (pathname === "/navigation") {
    return null;
  }

  // Hide navigation bar on chat detail pages
  if (pathname?.startsWith("/chat/")) {
    return null;
  }

  // Hide navigation bar on GPA detail page
  if (pathname === "/profile/gpa") {
    return null;
  }

  const isHomeActive = pathname === "/home";
  const isScheduleActive = pathname?.startsWith("/dashboard/day") || pathname?.startsWith("/dashboard/week");
  const isChatActive = pathname?.startsWith("/chat") || pathname === "/tasks";
  const isProfileActive = pathname === "/profile";

  return (
    <>
      {/* Normal Navigation Bar */}
      <AnimatePresence>
        {!isDragging && (
          <motion.nav
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 z-50 w-full max-w-md glass-nav pb-safe-bottom"
            style={{ maxWidth: '430px', height: '75px' }}
          >
            <div className="flex items-end justify-between px-2 h-[80px] pb-2" style={{ width: '430px', height: '75px' }}>
              {/* Home */}
              <Link
                href="/home"
                className={`flex flex-1 flex-col items-center justify-center gap-1 p-2 transition-colors ${
                  isHomeActive
                    ? "text-primary"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[26px] ${
                    isHomeActive ? "fill-1" : ""
                  }`}
                  style={{
                    fontVariationSettings: isHomeActive
                      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 26"
                      : undefined,
                  }}
                >
                  home
                </span>
                <span className="text-[10px] font-medium">Home</span>
              </Link>

              {/* Schedule */}
              <Link
                href="/dashboard/day"
                className={`flex flex-1 flex-col items-center justify-center gap-1 p-2 transition-colors ${
                  isScheduleActive
                    ? "text-primary"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[26px] ${
                    isScheduleActive ? "fill-1" : ""
                  }`}
                  style={{
                    fontVariationSettings: isScheduleActive
                      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 26"
                      : undefined,
                  }}
                >
                  calendar_month
                </span>
                <span className="text-[10px] font-medium">Schedule</span>
              </Link>

              {/* AI Orb (Center, Protruding) */}
              <div className="relative flex flex-1 flex-col items-center justify-end -top-4">
                <button
                  onClick={() => setSearchOverlayOpen(true)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-blue-400 shadow-glow text-white hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-white dark:border-background-dark"
                >
                  <span className="material-symbols-outlined text-[32px]">smart_toy</span>
                </button>
              </div>

              {/* Chat */}
              <Link
                href="/chat"
                className={`relative flex flex-1 flex-col items-center justify-center gap-1 p-2 transition-colors ${
                  isChatActive
                    ? "text-primary"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[26px] relative ${
                    isChatActive ? "fill-1" : ""
                  }`}
                  style={{
                    fontVariationSettings: isChatActive
                      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 26"
                      : undefined,
                  }}
                >
                  chat_bubble
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-500 border border-white dark:border-background-dark"></span>
                </span>
                <span className="text-[10px] font-medium">Chat</span>
              </Link>

              {/* Profile */}
              <Link
                href="/profile"
                className={`flex flex-1 flex-col items-center justify-center gap-1 p-2 transition-colors ${
                  isProfileActive
                    ? "text-primary"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[26px] ${
                    isProfileActive ? "fill-1" : ""
                  }`}
                  style={{
                    fontVariationSettings: isProfileActive
                      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 26"
                      : undefined,
                  }}
                >
                  person
                </span>
                <span className="text-[10px] font-medium">Profile</span>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* AI Catch Orb (shown during dragging) */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 h-32 z-40 flex items-end justify-center pb-6 pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              {/* Gradient Background */}
              <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-t from-tech-blue/20 to-transparent blur-3xl -bottom-32"></div>
              
              {/* Particles */}
              <div className="absolute inset-0 w-full h-full flex justify-center">
                <div className="absolute bottom-10 w-1 h-1 bg-electric-blue rounded-full animate-particle" style={{ animationDelay: "0.1s", left: "45%" }}></div>
                <div className="absolute bottom-8 w-1 h-1 bg-electric-blue rounded-full animate-particle" style={{ animationDelay: "0.4s", left: "55%" }}></div>
                <div className="absolute bottom-12 w-1.5 h-1.5 bg-accent-purple rounded-full animate-particle" style={{ animationDelay: "0.7s", left: "48%" }}></div>
                <div className="absolute bottom-6 w-1 h-1 bg-electric-blue rounded-full animate-particle" style={{ animationDelay: "0.2s", left: "52%" }}></div>
              </div>

              {/* AI Orb */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 shadow-ai-catch flex items-center justify-center text-white scale-110 transition-transform duration-300 ring-4 ring-white/20 dark:ring-white/10 animate-pulse">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-50 blur-sm animate-[spin_4s_linear_infinite]"></div>
                <span className="material-symbols-outlined text-[40px] drop-shadow-lg z-10">smart_toy</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop Hint Text */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
            className="fixed bottom-32 left-0 right-0 w-full text-center z-50 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 dark:bg-white/10 backdrop-blur-md border border-white/10">
              <span className="material-symbols-outlined text-electric-blue text-sm animate-pulse">auto_awesome</span>
              <span className="text-sm font-semibold text-white tracking-wide">
                {currentView === "campus-life" ? "Drop to Do More" : "Drop to Analyze Syllabus & Quiz"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


