"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ViewMode = "idle" | "dragging" | "analyzing" | "quizMode";

interface MyDayViewProps {
  viewMode: ViewMode;
  courseData: {
    name: string;
    time: string;
    location: string;
    professor: string;
  };
  onDragStart: () => void;
  onDragEnd: (event: any, info: any) => void;
  setTaskModalOpen?: (open: boolean) => void;
}

export default function MyDayView({
  viewMode,
  courseData,
  onDragStart,
  onDragEnd,
  setTaskModalOpen,
}: MyDayViewProps) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/8815c4eb-a792-4ce6-8842-8d12906f5e1d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MyDayView.tsx:21',message:'Component render with courseData',data:{courseName:courseData.name,time:courseData.time,location:courseData.location,professor:courseData.professor,viewMode:viewMode},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,C'})}).catch(()=>{});
  // #endregion
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleRecordingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTranscribing(!isTranscribing);
  };

  const handlePauseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(!isPaused);
  };

  const handleStopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTranscribing(false);
    setIsPaused(false);
  };

  // Audio waveform visualizer data
  // Each element: 6px width + 12px gap = 18px per element
  // Calculate number of elements that can fit in 342px width
  const generateWaveformBars = () => {
    const colors = ["teal", "lightblue", "purple", "darkgrey"];
    const bars = [];
    const elementWidth = 6;
    const gap = 12;
    const containerWidth = 342;
    // Calculate how many elements can fit: (containerWidth + gap) / (elementWidth + gap)
    const totalElements = Math.floor((containerWidth + gap) / (elementWidth + gap));
    const fixedHeight = 40; // All elements have the same height
    
    for (let i = 0; i < totalElements; i++) {
      const color = colors[i % colors.length];
      bars.push({ height: fixedHeight, color, type: "bar" });
    }
    
    return bars;
  };
  
  const waveformBars = generateWaveformBars();

  const getWaveformColor = (color: string) => {
    switch (color) {
      case "teal":
        return "bg-teal-400";
      case "lightblue":
        return "bg-blue-300";
      case "purple":
        return "bg-purple-400";
      case "darkgrey":
        return "bg-slate-500";
      default:
        return "bg-blue-400";
    }
  };

  return (
    <main className="px-4 mt-4 flex flex-col gap-2">
      {/* Current Class Card - Draggable */}
      <motion.div
        drag={!isTranscribing}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        whileDrag={{ scale: 1.05, rotate: -3 }}
        style={{ zIndex: viewMode === "dragging" ? 60 : 1, height: "313px" }}
        className={`group relative overflow-hidden rounded-3xl shadow-soft transition-all ${
          isTranscribing
            ? "bg-gradient-to-br from-slate-800 to-slate-900 p-4"
            : "bg-white dark:bg-surface-dark p-4 hover:shadow-lg border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30"
        } ${
          viewMode === "dragging" && !isTranscribing ? "cursor-grabbing" : isTranscribing ? "cursor-default" : "cursor-grab"
        }`}
      >
        <div className="relative z-10 flex flex-col h-full">
          {isTranscribing ? (
            /* Transcription Mode UI */
            <>
              {/* Top Section: Live Transcribing Indicator and Menu */}
              <div className="flex items-center justify-between mb-6" style={{ height: "35px" }}>
                <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1.5 border border-blue-400/30">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="text-xs font-semibold text-blue-200">Live Transcribing...</span>
                </div>
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-white/80 text-[20px]">more_vert</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white leading-tight mb-6 tracking-tight">
                {courseData.name}
              </h2>

              {/* Audio Waveform Visualizer */}
              <div className="flex items-end justify-center gap-3 mb-6 h-20">
                {waveformBars.map((bar, index) => {
                  const animationDuration = 1 + (index % 5) * 0.2;
                  const animationDelay = index * 0.1;
                  return (
                    <div
                      key={index}
                      className={`${getWaveformColor(bar.color)} w-[6px] rounded-full`}
                      style={{
                        height: `${bar.height}px`,
                        animation: !isPaused
                          ? `wave ${animationDuration}s ease-in-out infinite`
                          : "none",
                        animationDelay: !isPaused ? `${animationDelay}s` : "0s",
                      }}
                    />
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[20px]">flag</span>
                  <span>Mark Keypoint</span>
                </button>
                <button 
                  onClick={handlePauseClick}
                  className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {isPaused ? "play_arrow" : "pause"}
                  </span>
                </button>
                <button 
                  onClick={handleStopClick}
                  className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[24px]">stop</span>
                </button>
              </div>
            </>
          ) : (
            /* Normal Card Content */
            <>
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-2 text-primary font-bold bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full" style={{ height: "34px" }}>
              <span className="text-xs tracking-wide">{courseData.time}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full border border-red-100 dark:border-red-900/30 animate-pulseRed">
              <span className="material-symbols-outlined text-[16px] text-red-500 fill-1">
                warning
              </span>
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                Attendance Likely
              </span>
            </div>
          </div>
          <h2 
            className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight" 
            style={{ width: "364px", height: "41px", position: "absolute", top: "92px", paddingTop: "0px", paddingBottom: "0px" }}
            ref={(el) => {
              // #region agent log
              if (el) {
                const rect = el.getBoundingClientRect();
                const words = courseData.name.split(" ");
                fetch('http://127.0.0.1:7243/ingest/8815c4eb-a792-4ce6-8842-8d12906f5e1d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MyDayView.tsx:183',message:'H2 title layout data',data:{courseName:courseData.name,wordCount:words.length,words:words,h2Rect:{top:rect.top,left:rect.left,width:rect.width,height:rect.height},h2Style:{width:'364px',height:'41px',top:'92px'}},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,D,E'})}).catch(()=>{});
              }
              // #endregion
            }}
          >
            <span>{courseData.name}</span>
          </h2>
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm font-medium mb-6" style={{ gap: "17px", marginBottom: "0px", marginTop: "0px" }}>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">
                location_on
              </span>
              <span>{courseData.location}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>{courseData.professor}</span>
            </div>
          </div>
          <div 
            onClick={handleRecordingClick}
            className="flex items-center justify-between mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-3 border border-gray-100 dark:border-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
            style={{ position: "absolute", width: "364px", top: "156px" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  AI Recording
                </span>
                <span className="text-[10px] text-gray-500">
                  Capturing highlights...
                </span>
              </div>
            </div>
            <div className="flex items-center gap-[3px] h-6 px-2">
              <div className="w-1 bg-primary rounded-full h-3 animate-[wave_1s_ease-in-out_infinite]"></div>
              <div className="w-1 bg-primary rounded-full h-5 animate-[wave_1.2s_ease-in-out_infinite_0.1s]"></div>
              <div className="w-1 bg-primary rounded-full h-2 animate-[wave_0.8s_ease-in-out_infinite_0.2s]"></div>
              <div className="w-1 bg-accent-purple rounded-full h-6 animate-[wave_1.1s_ease-in-out_infinite_0.3s]"></div>
              <div className="w-1 bg-primary rounded-full h-4 animate-[wave_0.9s_ease-in-out_infinite_0.4s]"></div>
              <div className="w-1 bg-primary rounded-full h-2 animate-[wave_1.3s_ease-in-out_infinite_0.5s]"></div>
              <div className="w-1 bg-accent-purple rounded-full h-5 animate-[wave_1.1s_ease-in-out_infinite_0.3s]"></div>
              <div className="w-1 bg-primary rounded-full h-3 animate-[wave_1s_ease-in-out_infinite]"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3" style={{ position: "absolute", top: "230px", left: "0px", width: "364px", columnGap: "16px", rowGap: "16px" }}>
            <button className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-white hover:bg-gray-800 text-white dark:text-gray-900 px-4 py-3 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95">
              <span className="material-symbols-outlined text-[18px]">
                auto_awesome
              </span>
              <span>Smart Note</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">
                co_present
              </span>
              <span>View Slides</span>
            </button>
          </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-soft flex flex-col justify-between h-40 relative overflow-hidden group" style={{ height: "137px", paddingLeft: "20px", paddingRight: "20px" }}>
          <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity" style={{ paddingTop: "18px", paddingBottom: "18px" }}>
            <span className="material-symbols-outlined text-6xl text-primary">
              assignment
            </span>
          </div>
          <div className="flex justify-between items-start" style={{ height: "40px" }}>
            <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">2</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
              Assignments<br />Due Today
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-soft flex flex-col justify-between h-40 relative overflow-hidden group" style={{ height: "137px", paddingLeft: "20px", paddingRight: "20px" }}>
          <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity" style={{ paddingTop: "18px", paddingBottom: "18px", top: "29px" }}>
          </div>
          <span className="material-symbols-outlined text-6xl text-purple-500" style={{ position: "absolute", top: "15px", left: "-24px" }}>
            timelapse
          </span>
          <div className="flex justify-between items-start" style={{ height: "40px" }}>
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-accent-purple">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
            <div className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-lg" style={{ position: "absolute", top: "17px", left: "131px", color: "rgba(24, 175, 79, 1)", backgroundColor: "rgba(201, 253, 217, 1)" }}>
              +15%
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">3h 20m</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
              Focus Time<br />Today
            </p>
          </div>
        </div>
      </div>

      {/* Up Next Section */}
      <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 shadow-soft" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Up Next</h3>
          <button className="text-primary text-sm font-semibold hover:opacity-80">
            Full Schedule
          </button>
        </div>
        <div className="relative pl-2">
          <div className="absolute left-[19px] top-2 bottom-4 w-[2px] bg-gray-100 dark:bg-gray-700"></div>
          <div className="relative flex gap-4 mb-8 group" style={{ marginBottom: "24px", gap: "8px" }}>
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-4 border-white dark:border-surface-dark bg-gradient-to-br from-purple-100 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/20 flex items-center justify-center text-accent-purple shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px] animate-pulse">
                auto_awesome
              </span>
            </div>
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-purple-50/90 to-indigo-50/50 dark:from-purple-900/30 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-500/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold text-accent-purple uppercase tracking-wider flex items-center gap-1">
                    Gap Time Detected
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    11:30 - 12:00
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-snug">
                  Library 3F is quiet now.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Perfect for finishing that reading assignment.
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex gap-4 mb-8 group">
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-4 border-white dark:border-surface-dark bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-status-green group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">restaurant</span>
            </div>
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-gray-800 dark:text-gray-100 text-base">
                  Lunch Recommendation
                </h4>
                <span className="text-xs font-semibold text-gray-400">12:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Student Center</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-[10px] font-bold tracking-tight">
                  Low Crowd
                </span>
              </div>
            </div>
          </div>
          <div className="relative flex gap-4 group">
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-4 border-white dark:border-surface-dark bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </div>
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-gray-800 dark:text-gray-100 text-base">
                  Find Study Buddy
                </h4>
                <span className="text-xs font-semibold text-gray-400">Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400 text-[14px]">
                  sync
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Schedule Match: 3 friends free
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Find Lunch Partner Card */}
      <div className="relative rounded-3xl mb-6 shadow-neon group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/40 via-pink-200/40 to-purple-200/40 blur-2xl dark:from-orange-900/20 dark:via-pink-900/20 dark:to-purple-900/20"></div>
        <div className="absolute inset-0 bg-white/70 dark:bg-surface-dark/60 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl"></div>
        <div className="relative p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between z-10" style={{ paddingTop: "10px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <span className="material-symbols-outlined text-[22px]">diversity_3</span>
              <span className="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-surface-dark"></span>
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white leading-tight text-lg">
                Find Lunch Partner
              </h3>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-0.5">
                3 friends are free around 12:00 PM.
              </p>
            </div>
          </div>
          <button className="flex-shrink-0 w-full sm:w-auto bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 pl-5 pr-5 py-3 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 self-end sm:self-center" style={{ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "20px", paddingRight: "20px" }}>
            <span>Match Now</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  );
}


