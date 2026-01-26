"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractionMode, CampusItem, getInitialMode } from "@/types/campus";

interface OmniPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: InteractionMode;
  contextItem?: CampusItem | null;
}

export default function OmniPostModal({
  isOpen,
  onClose,
  initialMode,
  contextItem,
}: OmniPostModalProps) {
  const [mode, setMode] = useState<InteractionMode>(
    initialMode || getInitialMode(contextItem || null)
  );

  // Update mode when initialMode or contextItem changes
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    } else if (contextItem) {
      setMode(getInitialMode(contextItem));
    }
  }, [initialMode, contextItem]);

  if (!isOpen) return null;

  const getTitle = () => {
    if (mode === "photo") return "AI Omni-Post";
    return "AI Composer";
  };

  const getIcon = () => {
    if (mode === "photo") return "view_in_ar";
    if (mode === "talk") return "smart_toy";
    return "auto_awesome";
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end">
      {/* Background Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white/60 dark:bg-slate-950/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-[90%] sm:max-w-sm mx-auto bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.2)] rounded-t-[2.5rem] rounded-b-none px-4 py-[10px] overflow-y-auto max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              {mode === "talk" && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30 animate-ping"></span>
              )}
              <span
                className={`material-symbols-outlined text-primary dark:text-blue-400 text-2xl drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]`}
              >
                {getIcon()}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
              {getTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-200/50 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-300 text-lg">
              close
            </span>
          </button>
        </div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          {mode === "talk" && (
            <TalkModeContent key="talk" contextItem={contextItem} />
          )}
          {mode === "photo" && (
            <PhotoModeContent key="photo" contextItem={contextItem} />
          )}
          {mode === "type" && (
            <TypeModeContent key="type" contextItem={contextItem} />
          )}
        </AnimatePresence>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center justify-center gap-8 px-4 mt-3">
          {/* Mic Button (Talk Mode) */}
          <button
            onClick={() => setMode("talk")}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-md border transition-transform hover:scale-105 active:scale-95 ${
              mode === "talk"
                ? "bg-gradient-to-br from-primary to-blue-600 shadow-[0_0_30px_rgba(13,89,242,0.5)] border-[3px] border-white/20"
                : "bg-slate-100/60 dark:bg-slate-700/60 border-white/50 dark:border-white/10"
            }`}
          >
            {mode === "talk" && (
              <span className="absolute inset-0 rounded-full border border-white/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
            )}
            <span
              className={`material-symbols-outlined text-2xl transition-colors ${
                mode === "talk"
                  ? "text-white"
                  : "text-slate-600 dark:text-slate-300 group-hover:text-primary"
              }`}
            >
              mic
            </span>
          </button>

          {/* Camera Button (Photo Mode) */}
          <button
            onClick={() => setMode("photo")}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-md border transition-transform hover:scale-105 active:scale-95 ${
              mode === "photo"
                ? "bg-gradient-to-br from-cyan-400 to-primary shadow-[0_0_30px_rgba(13,89,242,0.6)] border-[3px] border-white/20 h-20 w-20"
                : "bg-slate-100/60 dark:bg-slate-700/60 border-white/50 dark:border-white/10"
            }`}
          >
            {mode === "photo" && (
              <span className="absolute inset-0 rounded-full border border-white/30 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
            )}
            <span
              className={`material-symbols-outlined transition-colors ${
                mode === "photo"
                  ? "text-white text-[32px] drop-shadow-md"
                  : "text-slate-400 dark:text-slate-500 text-2xl group-hover:text-primary"
              }`}
            >
              photo_camera
            </span>
          </button>

          {/* Edit Button (Type Mode) */}
          <button
            onClick={() => setMode("type")}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-md border transition-transform hover:scale-105 active:scale-95 ${
              mode === "type"
                ? "bg-gradient-to-br from-indigo-500 to-blue-600 shadow-[0_0_25px_rgba(79,70,229,0.5)] border-[3px] border-white/20 dark:border-white/10 h-16 w-16"
                : "bg-slate-100/60 dark:bg-slate-700/60 border-white/50 dark:border-white/10"
            }`}
          >
            <span
              className={`material-symbols-outlined transition-colors ${
                mode === "type"
                  ? "text-white text-[32px]"
                  : "text-slate-400 dark:text-slate-500 text-2xl group-hover:text-primary"
              }`}
            >
              edit_note
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Talk Mode Content Component
function TalkModeContent({ contextItem }: { contextItem?: CampusItem | null }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col"
    >
      {/* Waveform Animation */}
      <div className="flex flex-col items-center justify-center mb-[17px]">
        <div className="h-[83px] w-full flex items-center justify-center gap-[6px] mb-5">
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-6 opacity-60"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-10 opacity-80"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-16"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-24 shadow-[0_0_15px_rgba(139,92,246,0.6)]"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-14"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-20"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-8 opacity-80"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-4 opacity-50"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-10 opacity-70"></div>
          <div className="w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-500 h-5 opacity-40"></div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Listening...
          </p>
          <p className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed mt-0">
            {contextItem
              ? `"Looking for ${contextItem.title.toLowerCase()}..."`
              : '"Looking for a math study buddy..."'}
          </p>
        </div>
      </div>

      {/* Intent Analysis Card */}
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 border border-white/50 dark:border-white/10 pt-4 pb-4 px-4 mb-0 shadow-sm backdrop-blur-md">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-indigo-500 mt-0.5 text-[20px] animate-pulse">
            auto_awesome
          </span>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Analyzing intent:
              </span>
              <span className="text-xs font-bold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/50">
                🧠 {contextItem?.type === "social" ? "Social" : contextItem?.type === "event" ? "Event" : "General"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Extracting topic:
              </span>
              <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/50 w-[234px]">
                📐 {contextItem?.title || "General"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Photo Mode Content Component
function PhotoModeContent({ contextItem }: { contextItem?: CampusItem | null }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col"
    >
      {/* Camera Viewfinder */}
      <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-black mb-8 shadow-inner border border-white/20 dark:border-slate-700 group">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage:
              contextItem?.image ||
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLCilZw6LhHI-blW_mf74-Y-uDsEo4kgtet6D3MoOgJ3lNTq5Q6JLBhzrvK-RLV7KGY1j72YU5jJAI4HxrmsuB-iZb70BTG7aEhNOXk91l-aJYbFQg86bHSsUusgz0YbFqZZrunVycB3rKVTJR78OyIXG6Uva1TesgYb--WhTPa_dnAPhwkGmtd0C3IJSRPLJxoQKWfuzCAjpBynOfC2-hhZAoodrMyMlu4u5wOzCNrLhy0uK2Y3YrKX9xLThDLFatXwMKntq_vfU')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>

        {/* Detection Frame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/20 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-[3px] border-l-[3px] border-primary rounded-tl-xl drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-[3px] border-r-[3px] border-primary rounded-tr-xl drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-[3px] border-l-[3px] border-primary rounded-bl-xl drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-[3px] border-r-[3px] border-primary rounded-br-xl drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/80 rounded-full shadow-glow"></div>
        </div>

        {/* Detection Label */}
        <div className="absolute top-1/3 right-8 z-10 flex flex-col items-end gap-1.5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="absolute top-4 -left-12 w-12 h-[1px] bg-white/60">
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-glow"></div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-xl border border-white/40 shadow-lg">
            <span className="material-symbols-outlined text-white text-[16px] drop-shadow-md">
              view_in_ar
            </span>
            <span className="text-xs font-bold text-white tracking-wide text-shadow-sm">
              Detected: {contextItem?.title || "Yeti Rambler 20oz"}
            </span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-md">
            <span className="text-[10px] font-medium text-white/90">
              Category: {contextItem?.type === "marketplace" ? "Lost & Found" : "Item"}
            </span>
          </div>
        </div>

        {/* Scanning Hint */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center">
          <div className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
            <p className="text-xs font-medium text-white/90 tracking-wide flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Scanning object... Tap to capture.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Type Mode Content Component
function TypeModeContent({ contextItem }: { contextItem?: CampusItem | null }) {
  const [text, setText] = useState(
    contextItem?.type === "marketplace"
      ? `Selling my old ${contextItem.title.toLowerCase()}`
      : `Looking for ${contextItem?.title.toLowerCase() || "help"}...`
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col"
    >
      {/* Text Input Area */}
      <div className="flex flex-col mb-6">
        <div className="w-full relative min-h-[100px] outline-none">
          <p className="text-[22px] font-medium text-slate-900 dark:text-white leading-relaxed">
            {text}
            <span className="text-blue-400 dark:text-blue-300/80 opacity-70 italic">
              {contextItem?.type === "marketplace"
                ? "...for Math 101? Condition: Good?"
                : "...need help?"}
            </span>
            <span className="animate-pulse text-primary ml-0.5 inline-block w-0.5 h-6 align-middle bg-primary rounded-full"></span>
          </p>
        </div>

        {/* Quick Action Tags */}
        <div className="flex flex-wrap gap-2.5 mt-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-indigo-100 dark:border-indigo-500/30 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all group">
            <span className="text-sm">🏷️</span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 group-hover:text-indigo-700">
              Add Price
            </span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-blue-100 dark:border-blue-500/30 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800 transition-all group">
            <span className="text-sm">📚</span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-300 group-hover:text-blue-700">
              Link Course
            </span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-500/30 shadow-sm hover:shadow-md transition-all group">
            <span className="text-sm">✨</span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-300 group-hover:text-purple-700">
              Rephrase
            </span>
          </button>
        </div>
      </div>

      {/* Mock Keyboard */}
      <div className="w-full bg-[#d1d5db]/80 dark:bg-[#1c1c1e]/90 backdrop-blur-xl rounded-t-2xl p-1.5 pb-0 shadow-inner border-t border-white/20 dark:border-white/5 -mb-6 pb-6">
        <div className="flex justify-center gap-1.5 px-1 pt-2 mb-2">
          <div className="keyboard-key">q</div>
          <div className="keyboard-key">w</div>
          <div className="keyboard-key">e</div>
          <div className="keyboard-key">r</div>
          <div className="keyboard-key">t</div>
          <div className="keyboard-key">y</div>
          <div className="keyboard-key">u</div>
          <div className="keyboard-key">i</div>
          <div className="keyboard-key">o</div>
          <div className="keyboard-key">p</div>
        </div>
        <div className="flex justify-center gap-1.5 px-4 mb-2">
          <div className="keyboard-key">a</div>
          <div className="keyboard-key">s</div>
          <div className="keyboard-key">d</div>
          <div className="keyboard-key">f</div>
          <div className="keyboard-key">g</div>
          <div className="keyboard-key">h</div>
          <div className="keyboard-key">j</div>
          <div className="keyboard-key">k</div>
          <div className="keyboard-key">l</div>
        </div>
        <div className="flex justify-center gap-1.5 px-8 mb-2">
          <div className="keyboard-key !bg-[#b4b8bf] dark:!bg-[#3a3a3c] !grow-0 w-12">
            <span className="material-symbols-outlined text-lg">arrow_upward</span>
          </div>
          <div className="keyboard-key">z</div>
          <div className="keyboard-key">x</div>
          <div className="keyboard-key">c</div>
          <div className="keyboard-key">v</div>
          <div className="keyboard-key">b</div>
          <div className="keyboard-key">n</div>
          <div className="keyboard-key">m</div>
          <div className="keyboard-key !bg-[#b4b8bf] dark:!bg-[#3a3a3c] !grow-0 w-12">
            <span className="material-symbols-outlined text-lg">backspace</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


