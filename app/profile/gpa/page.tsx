"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GPAEditModal from "@/components/profile/GPAEditModal";
import GPAHistoryModal, { HistoryGPAData } from "@/components/profile/GPAHistoryModal";

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  value: number; // 0-100 for slider
}

export default function GPAPage() {
  const router = useRouter();
  const [currentGPA, setCurrentGPA] = useState(3.8);
  const [projectedGPA, setProjectedGPA] = useState(3.85);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isInsightExpanded, setIsInsightExpanded] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Linear Algebra", credits: 4, grade: "B+", value: 75 },
    { id: "2", name: "World History", credits: 3, grade: "A-", value: 88 },
    { id: "3", name: "CS 101: Intro", credits: 4, grade: "A", value: 95 },
  ]);
  
  // Load history GPA from localStorage on mount
  const [historyGPA, setHistoryGPA] = useState<HistoryGPAData[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gpa_history");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [
            { id: "1", semester: "S1", gpa: 3.5 },
            { id: "2", semester: "S2", gpa: 3.6 },
          ];
        }
      }
    }
    // Default history data
    return [
      { id: "1", semester: "S1", gpa: 3.5 },
      { id: "2", semester: "S2", gpa: 3.6 },
    ];
  });
  
  // Save to localStorage whenever historyGPA changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gpa_history", JSON.stringify(historyGPA));
    }
  }, [historyGPA]);
  
  // History GPA handlers
  const handleAddHistory = (data: HistoryGPAData) => {
    setHistoryGPA((prev) => [...prev, data]);
  };
  
  const handleUpdateHistory = (id: string, data: Partial<HistoryGPAData>) => {
    setHistoryGPA((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };
  
  const handleDeleteHistory = (id: string) => {
    setHistoryGPA((prev) => prev.filter((item) => item.id !== id));
  };

  const handleInsightClick = () => {
    setIsInsightExpanded(!isInsightExpanded);
  };

  const gradeToValue = (grade: string): number => {
    const gradeMap: Record<string, number> = {
      F: 0,
      "D-": 10,
      D: 20,
      "D+": 25,
      "C-": 30,
      C: 40,
      "C+": 45,
      "B-": 50,
      B: 60,
      "B+": 65,
      "A-": 75,
      A: 85,
      "A+": 100,
    };
    return gradeMap[grade] || 0;
  };

  const valueToGrade = (value: number): string => {
    if (value >= 97) return "A+";
    if (value >= 93) return "A";
    if (value >= 90) return "A-";
    if (value >= 87) return "B+";
    if (value >= 83) return "B";
    if (value >= 80) return "B-";
    if (value >= 77) return "C+";
    if (value >= 73) return "C";
    if (value >= 70) return "C-";
    if (value >= 67) return "D+";
    if (value >= 63) return "D";
    if (value >= 60) return "D-";
    return "F";
  };

  const handleCourseChange = (id: string, newValue: number) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, value: newValue, grade: valueToGrade(newValue) } : course))
    );
    // Recalculate projected GPA (simplified)
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const newProjected = courses.reduce((sum, c) => {
      const courseValue = c.id === id ? newValue : c.value;
      const gradePoints = (courseValue / 100) * 4;
      return sum + gradePoints * c.credits;
    }, 0) / totalCredits;
    setProjectedGPA(Math.min(4.0, newProjected));
  };

  const handleGPAConfirm = (gpa: number) => {
    setCurrentGPA(gpa);
  };

  // Chart calculation functions
  // Convert GPA (0-4.0) to Y coordinate (0 = top, 120 = bottom)
  const gpaToY = (gpa: number): number => {
    const maxGPA = 4.0;
    const svgHeight = 120;
    // Invert: GPA 4.0 = y=0 (top), GPA 0.0 = y=120 (bottom)
    return svgHeight - (gpa / maxGPA) * svgHeight;
  };

  // Generate chart path from data points
  const generateChartPath = (points: Array<{ x: number; y: number }>): string => {
    if (points.length === 0) return "";
    if (points.length === 1) return `M${points[0].x},${points[0].y}`;

    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) / 3;
      const cp1y = prev.y;
      const cp2x = curr.x - (curr.x - prev.x) / 3;
      const cp2y = curr.y;
      path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }
    return path;
  };

  // Calculate chart data points
  const sortedHistory = [...historyGPA].sort((a, b) => a.semester.localeCompare(b.semester));
  const totalPoints = Math.max(2, sortedHistory.length + 2); // At least 2 points (current + projected)
  const chartWidth = Math.max(320, totalPoints * 100); // Minimum 320, scale with data points
  const segmentWidth = chartWidth / totalPoints;
  
  // Generate historical data points
  const historicalPoints = sortedHistory.map((item, index) => ({
    x: segmentWidth * (index + 1),
    y: gpaToY(item.gpa),
    label: item.semester,
    gpa: item.gpa,
  }));

  // Current point position (after all historical points, or at position 1 if no history)
  const currentIndex = sortedHistory.length;
  const currentPoint = {
    x: segmentWidth * (currentIndex + 1),
    y: gpaToY(currentGPA),
    label: "现在",
    gpa: currentGPA,
  };

  // Projected point position
  const projectedPoint = {
    x: segmentWidth * (currentIndex + 2),
    y: gpaToY(projectedGPA),
    label: "Proj",
    gpa: projectedGPA,
  };

  // Combine all points for path generation
  const allHistoricalPoints = historicalPoints.map(p => ({ x: p.x, y: p.y }));
  const allPoints = [...allHistoricalPoints, { x: currentPoint.x, y: currentPoint.y }];
  
  // Generate paths
  let historicalPath = "";
  let historicalWithCurrentPath = "";
  let projectedPath = "";
  let fillAreaPath = "";

  if (allHistoricalPoints.length > 0) {
    // Has history: generate path through all historical points
    historicalPath = generateChartPath(allHistoricalPoints);
    historicalWithCurrentPath = generateChartPath(allPoints);
    fillAreaPath = `${historicalWithCurrentPath} L${currentPoint.x},120 L${allHistoricalPoints[0].x},120 Z`;
  } else {
    // No history: create a path from left edge to current point
    const startX = segmentWidth * 0.5; // Start slightly from left edge
    historicalWithCurrentPath = `M${startX},${currentPoint.y} L${currentPoint.x},${currentPoint.y}`;
    fillAreaPath = `M${startX},${currentPoint.y} L${currentPoint.x},${currentPoint.y} L${currentPoint.x},120 L${startX},120 Z`;
  }

  projectedPath = generateChartPath([
    { x: currentPoint.x, y: currentPoint.y },
    { x: projectedPoint.x, y: projectedPoint.y },
  ]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3">
        <button
          onClick={() => router.back()}
          className="group flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span className="material-symbols-outlined text-text-main dark:text-white" style={{ fontSize: "24px" }}>
            arrow_back
          </span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-text-main dark:text-white flex-1 text-center">
          Academic Simulator
        </h1>
        <button className="flex items-center justify-center rounded-full px-3 py-1.5 transition-colors hover:bg-primary/10">
          <p className="text-primary text-sm font-bold leading-normal tracking-wide">Reset</p>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-4 pb-24 pt-2 gap-6 overflow-y-auto">
        {/* Data Viz / Chart Section */}
        <section className="flex flex-col gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-5 shadow-soft">
          <div className="flex flex-col gap-1">
            <div className="flex items-end justify-between">
              <p className="text-text-sub dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                GPA 轨迹
              </p>
              <div className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5">
                <span className="material-symbols-outlined text-success" style={{ fontSize: "16px" }}>
                  trending_up
                </span>
                <p className="text-success text-xs font-bold">+0.15</p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-primary text-5xl font-bold tracking-tighter">{projectedGPA.toFixed(2)}</h2>
              <span className="text-text-sub dark:text-gray-400 font-medium">Projected</span>
              <button
                onClick={() => setShowEditModal(true)}
                className="ml-auto p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">edit</span>
              </button>
            </div>
          </div>
          {/* Chart Visualization */}
          <div className="relative h-[160px] w-full pt-4">
            <div className="relative h-full overflow-x-auto">
              <svg 
                className="h-full overflow-visible" 
                preserveAspectRatio="none" 
                viewBox={`0 0 ${chartWidth} 120`}
                style={{ minWidth: '100%', width: `${chartWidth}px` }}
              >
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#135bec" stopOpacity="0.1"></stop>
                    <stop offset="100%" stopColor="#135bec" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth="1" x1="0" x2={chartWidth} y1="120" y2="120"></line>
                <line stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth="1" x1="0" x2={chartWidth} y1="60" y2="60"></line>
                <line stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth="1" x1="0" x2={chartWidth} y1="0" y2="0"></line>
                {/* Fill Area */}
                {fillAreaPath && (
                  <path
                    d={fillAreaPath}
                    fill="url(#chartGradient)"
                  ></path>
                )}
                {/* Historical Line (Solid) */}
                {historicalPath && (
                  <path
                    className="dark:stroke-white"
                    d={historicalPath}
                    fill="none"
                    stroke="#0d121b"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                )}
                {/* Line from last historical point to current */}
                {historicalPoints.length > 0 && (
                  <line
                    className="dark:stroke-white"
                    x1={historicalPoints[historicalPoints.length - 1].x}
                    y1={historicalPoints[historicalPoints.length - 1].y}
                    x2={currentPoint.x}
                    y2={currentPoint.y}
                    stroke="#0d121b"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></line>
                )}
                {/* Projected Line (Dotted Electric Blue) */}
                {projectedPath && (
                  <path
                    d={projectedPath}
                    fill="none"
                    stroke="#135bec"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                )}
                {/* Historical Points */}
                {historicalPoints.map((point, index) => (
                  <circle
                    key={`history-${index}`}
                    className="dark:fill-white"
                    cx={point.x}
                    cy={point.y}
                    fill="#0d121b"
                    r="4"
                  ></circle>
                ))}
                {/* Current Point */}
                <circle
                  cx={currentPoint.x}
                  cy={currentPoint.y}
                  fill="#135bec"
                  r="6"
                  stroke="#ffffff"
                  strokeWidth="2"
                ></circle>
                {/* Projected Point */}
                <circle
                  cx={projectedPoint.x}
                  cy={projectedPoint.y}
                  fill="#ffffff"
                  r="6"
                  stroke="#135bec"
                  strokeWidth="3"
                ></circle>
              </svg>
            </div>
            {/* X-Axis Labels - Fixed position, not scrolling */}
            <div className="flex pt-2 text-xs font-semibold text-text-sub dark:text-gray-400 w-full">
              {historicalPoints.map((point, index) => (
                <span key={`label-${index}`} className="text-center flex-1">
                  {point.label}
                </span>
              ))}
              <span className="text-center text-primary flex-1">{currentPoint.label}</span>
              <span className="text-center text-primary flex-1">{projectedPoint.label}</span>
            </div>
          </div>
        </section>

        {/* Simulator Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-text-main dark:text-white text-lg font-bold">Current Courses</h3>
            <span className="text-xs font-medium text-text-sub dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
              Fall 2024
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group relative flex flex-col gap-3 rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm transition-all hover:shadow-md border border-transparent hover:border-primary/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-text-main dark:text-white font-semibold">{course.name}</p>
                    <p className="text-text-sub dark:text-gray-400 text-xs">{course.credits} Credits</p>
                  </div>
                  <div
                    className={`flex h-8 w-12 items-center justify-center rounded-lg font-bold ${
                      course.value >= 95
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {course.grade}
                  </div>
                </div>
                <div className="relative flex h-6 w-full items-center">
                  {/* Track Background */}
                  <div className="absolute h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  {/* Active Track */}
                  <div
                    className="absolute h-1.5 rounded-full bg-primary"
                    style={{ width: `${course.value}%` }}
                  ></div>
                  {/* Input Range Overlay */}
                  <input
                    className="absolute h-full w-full cursor-pointer opacity-0 z-10 hover:opacity-100"
                    type="range"
                    min="0"
                    max="100"
                    value={course.value}
                    onChange={(e) => handleCourseChange(course.id, parseInt(e.target.value))}
                  />
                  {/* Visual Thumb */}
                  <div
                    className="absolute h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-primary bg-white shadow-md z-0 pointer-events-none"
                    style={{ left: `${course.value}%` }}
                  ></div>
                </div>
                <div className="flex justify-between px-1">
                  <span className="text-[10px] font-bold text-text-sub dark:text-gray-400">F</span>
                  <span className="text-[10px] font-bold text-text-sub dark:text-gray-400">A+</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* AI Insight Floating Bubble */}
      <div className="fixed bottom-6 left-0 right-0 px-4 z-40 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {isInsightExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="glass-panel flex items-start gap-4 rounded-2xl p-4 shadow-glass ring-1 ring-white/60 dark:ring-white/10 dark:bg-gray-900/80 cursor-pointer"
              onClick={handleInsightClick}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-400 text-white shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined" style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}>
                  smart_toy
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Scholar AI</p>
                  <p className="text-sm font-medium leading-relaxed text-text-main dark:text-white">
                    To reach your goal of <span className="font-bold">3.9</span>, you need an{" "}
                    <span className="font-bold text-primary">A-</span> in History. I've prepared a revision schedule.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle View Study Plan action
                    }}
                    className="flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <span>查看学习计划</span>
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                      arrow_forward
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHistoryModal(true);
                      setIsInsightExpanded(false);
                    }}
                    className="flex w-fit items-center gap-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                      history
                    </span>
                    <span>补充历史 GPA</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={handleInsightClick}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-400 text-white shadow-lg shadow-blue-500/30 cursor-pointer hover:scale-110 transition-transform"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px", fontVariationSettings: "'FILL' 1" }}>
                smart_toy
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GPA Edit Modal */}
      <GPAEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        currentGPA={currentGPA}
        onConfirm={handleGPAConfirm}
      />

      {/* GPA History Modal */}
      <GPAHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        historyGPA={historyGPA}
        onAdd={handleAddHistory}
        onUpdate={handleUpdateHistory}
        onDelete={handleDeleteHistory}
      />
    </div>
  );
}

