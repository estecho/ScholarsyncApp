"use client";

import { useState, useEffect } from "react";

interface DynamicAlertCardProps {
  nextClassTime: Date;
  location: string;
  courseId?: string;
  onClick?: () => void;
  statusOverride?: "urgent" | "warning" | "ok";
  textOverride?: string;
}

export default function DynamicAlertCard({
  nextClassTime,
  location,
  courseId,
  onClick,
  statusOverride,
  textOverride,
}: DynamicAlertCardProps) {
  const [minutesUntilClass, setMinutesUntilClass] = useState<number>(0);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = nextClassTime.getTime() - now.getTime();
      const minutes = Math.floor(diff / 1000 / 60);
      setMinutesUntilClass(Math.max(0, minutes));
    };

    // Calculate immediately
    calculateTime();

    // Update every second
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [nextClassTime]);

  const getStatus = (): "urgent" | "warning" | "ok" => {
    if (statusOverride) return statusOverride;
    if (minutesUntilClass > 20) return "ok";
    if (minutesUntilClass >= 10) return "warning";
    return "urgent";
  };

  const status = getStatus();

  const bgColor =
    status === "ok"
      ? "bg-green-500"
      : status === "warning"
      ? "bg-amber-500"
      : "bg-action-red";

  // Triangle color should match the parent container's background color
  const triangleColor =
    status === "ok"
      ? "#22c55e" // green-500 - matches bg-green-500
      : status === "warning"
      ? "#f59e0b" // amber-500 - matches bg-amber-500
      : "#ef4444"; // action-red - matches bg-action-red

  const pulseClass = status === "urgent" ? "animate-pulse" : "";

  const getText = () => {
    if (textOverride) return textOverride;
    if (minutesUntilClass <= 0) {
      return "Time to leave now!";
    }
    if (minutesUntilClass === 1) {
      return "Leave in 1 min";
    }
    return `Leave in ${minutesUntilClass} min`;
  };

  return (
    <div className="flex w-full relative group mb-2 z-20">
      <div className="w-14 flex flex-col items-end pr-3 shrink-0 pt-2">
        <span
          className={`text-xs font-bold ${
            status === "urgent"
              ? "text-action-red"
              : status === "ok"
              ? "text-green-600"
              : "text-amber-600"
          }`}
        >
          {nextClassTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
        <span
          className={`text-[10px] mt-0.5 ${
            status === "urgent"
              ? "text-red-400"
              : status === "ok"
              ? "text-green-500"
              : "text-amber-500"
          }`}
        >
          {nextClassTime
            .toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            })
            .split(" ")[1]
            .toUpperCase()}
        </span>
      </div>
      <div className="flex-1 relative pl-4 pb-6">
        <div
          className={`absolute left-[-6px] top-3 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-background-dark ${bgColor} shadow-[0_0_0_4px_rgba(239,68,68,0.2)] z-30 ${pulseClass}`}
        >
          {status === "urgent" && (
            <div className="absolute inset-0 rounded-full bg-action-red animate-ping opacity-75"></div>
          )}
        </div>
        <div
          className={`absolute left-[-1px] top-6 -bottom-6 w-1 bg-gradient-to-b ${
            status === "ok"
              ? "from-green-500/80 to-primary/80"
              : status === "warning"
              ? "from-amber-500/80 to-primary/80"
              : "from-action-red/80 to-primary/80"
          } z-0 rounded-full`}
        ></div>
        <div
          onClick={onClick}
          className={`relative ${bgColor} text-white rounded-2xl rounded-tl-none shadow-action p-3 flex items-center justify-between transform transition-all hover:scale-[1.02] w-full max-w-[280px] ${pulseClass} ${onClick ? 'cursor-pointer' : ''}`}
        >
          <div
            className="absolute -left-2 top-0 w-0 h-0 border-t-[10px] border-l-[10px] border-l-transparent"
            style={{
              borderTopColor: triangleColor,
            }}
          ></div>
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-9 w-9 shrink-0 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span
                className={`material-symbols-outlined text-[20px] ${
                  minutesUntilClass < 10 ? "animate-pulse" : ""
                }`}
              >
                directions_walk
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm leading-tight break-words">{getText()}</p>
              <p className="text-xs text-white/80 font-medium break-words">for {location}</p>
            </div>
          </div>
          <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

