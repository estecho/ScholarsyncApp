"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { PROFILE_DATA } from "@/constants/profile";

interface DashboardHeaderProps {
  date?: string;
  dayName?: string;
  weather?: string;
  view?: "day" | "week";
  onViewChange?: (view: "day" | "week") => void;
}

export function DashboardHeader({
  date = "Oct 24",
  dayName = "Wednesday",
  weather = "22°C",
  view = "day",
  onViewChange,
}: DashboardHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 w-full">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              school
            </span>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
              ScholarSync
            </h2>
          </div>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <img
              alt="Profile"
              className="h-8 w-8 rounded-full"
              src={PROFILE_DATA.user.avatar}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(PROFILE_DATA.user.name)}&size=32&background=6366f1&color=ffffff&bold=true&format=png`;
              }}
            />
          </button>
        </div>
        <div className="px-5 pb-2 flex items-end justify-between">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
              {dayName}
            </p>
            <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">
              {date}
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-surface-dark px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <span className="material-symbols-outlined text-amber-500 text-[20px]">
              wb_sunny
            </span>
            <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
              {weather}
            </span>
          </div>
        </div>
        <div className="px-5 py-3">
          <div className="flex h-10 w-full items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
            <button
              onClick={() => onViewChange?.("day")}
              className={`flex h-full flex-1 items-center justify-center rounded-lg text-sm font-bold transition-all ${
                view === "day"
                  ? "bg-white dark:bg-surface-dark shadow-sm text-primary dark:text-primary"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => onViewChange?.("week")}
              className={`flex h-full flex-1 items-center justify-center rounded-lg text-sm font-bold transition-all ${
                view === "week"
                  ? "bg-white dark:bg-surface-dark shadow-sm text-primary dark:text-primary"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium"
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

interface SimpleHeaderProps {
  title: string;
  backHref?: string;
  rightAction?: ReactNode;
}

export function SimpleHeader({
  title,
  backHref = "#",
  rightAction,
}: SimpleHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors w-full">
      <div className="flex items-center justify-between p-4 h-16 max-w-lg mx-auto w-full">
        <Link
          href={backHref}
          aria-label="Go back"
          className="flex items-center justify-center w-10 h-10 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">
            arrow_back_ios_new
          </span>
        </Link>
        <h1 className="text-lg font-bold text-center flex-1">{title}</h1>
        <div className="w-10">{rightAction}</div>
      </div>
    </header>
  );
}

interface ImportHeaderProps {
  onBack?: () => void;
  onSettings?: () => void;
}

export function ImportHeader({
  onBack,
  onSettings,
}: ImportHeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-12 pb-4">
      <button
        onClick={onBack}
        className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-colors"
      >
        <span className="material-symbols-outlined text-[24px]">
          chevron_left
        </span>
      </button>
      <div className="flex items-center gap-2">
        <button
          onClick={onSettings}
          className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-colors hidden"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>
    </header>
  );
}

