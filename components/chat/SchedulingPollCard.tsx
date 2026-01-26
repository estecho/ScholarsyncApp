"use client";

import { useState } from "react";

interface SchedulingPollCardProps {
  onVote?: (slotId: string) => void;
  initialVotes?: Record<string, number>;
}

export default function SchedulingPollCard({ onVote, initialVotes }: SchedulingPollCardProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>(
    initialVotes || {
      "wed-4pm": 2,
      "thu-10am": 0,
    }
  );

  const handleVote = (slotId: string) => {
    if (selectedSlot === slotId) return; // Already voted for this slot
    
    setSelectedSlot(slotId);
    setVotes((prev) => ({
      ...prev,
      [slotId]: (prev[slotId] || 0) + 1,
    }));
    
    if (onVote) {
      onVote(slotId);
    }
  };

  return (
    <div className="w-full my-2">
      <div className="flex flex-col bg-white dark:bg-surface-dark rounded-2xl shadow-card overflow-hidden border border-primary/10 ring-4 ring-primary/5">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-primary/5 via-primary-light to-white dark:from-primary/10 dark:via-primary/5 dark:to-surface-dark p-4 border-b border-primary/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              colors_spark
            </span>
            <span className="text-primary text-xs font-bold uppercase tracking-wider">ScholarSync AI</span>
          </div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Best Meeting Times</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Found 3 slots based on 4 schedules.</p>
        </div>

        {/* Timeline Visualization */}
        <div className="px-5 pt-5 pb-2">
          <div className="flex justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wide">
            <span>Mon</span>
            <span>Tue</span>
            <span className="text-emerald-600 dark:text-emerald-400">Wed</span>
            <span className="text-amber-500 dark:text-amber-400">Thu</span>
            <span>Fri</span>
          </div>
          <div className="flex gap-1 h-2 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
            <div className="w-1/5 bg-slate-200 dark:bg-slate-600"></div>
            <div className="w-1/5 bg-slate-200 dark:bg-slate-600"></div>
            <div className="w-1/5 flex gap-[1px]">
              <div className="h-full w-1/2 bg-slate-200 dark:bg-slate-600"></div>
              <div className="h-full w-1/2 bg-emerald-400"></div>
            </div>
            <div className="w-1/5 flex gap-[1px]">
              <div className="h-full w-1/3 bg-amber-400"></div>
              <div className="h-full w-2/3 bg-slate-200 dark:bg-slate-600"></div>
            </div>
            <div className="w-1/5 bg-slate-200 dark:bg-slate-600"></div>
          </div>
        </div>

        {/* Options List */}
        <div className="flex flex-col p-3 gap-2">
          {/* Slot A */}
          <div
            onClick={() => handleVote("wed-4pm")}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group/slot ${
              selectedSlot === "wed-4pm"
                ? "bg-primary/10 border-primary/30"
                : "bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center size-10 bg-white dark:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-600 shadow-sm text-center">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Wed</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">12</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 dark:text-white font-semibold text-sm">4:00 PM</span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    All Free
                  </span>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-xs">1 hr duration</span>
              </div>
            </div>
            <div className="size-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover/slot:border-primary flex items-center justify-center">
              <div
                className={`size-3 rounded-full bg-primary transition-opacity ${
                  selectedSlot === "wed-4pm" ? "opacity-100" : "opacity-0 group-hover/slot:opacity-100"
                }`}
              ></div>
            </div>
          </div>

          {/* Slot B */}
          <div
            onClick={() => handleVote("thu-10am")}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group/slot opacity-90 ${
              selectedSlot === "thu-10am"
                ? "bg-primary/10 border-primary/30 opacity-100"
                : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center size-10 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-600 text-center">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Thu</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">13</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 dark:text-white font-semibold text-sm">10:00 AM</span>
                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    3/4 Free
                  </span>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-xs">Mike is busy</span>
              </div>
            </div>
            <div className="size-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover/slot:border-primary flex items-center justify-center">
              <div
                className={`size-3 rounded-full bg-primary transition-opacity ${
                  selectedSlot === "thu-10am" ? "opacity-100" : "opacity-0 group-hover/slot:opacity-100"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => {
              if (selectedSlot === "wed-4pm") {
                handleVote("wed-4pm");
              } else if (!selectedSlot) {
                handleVote("wed-4pm");
              }
            }}
            className="w-full h-11 bg-primary hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
          >
            <span>Vote for Wed 4 PM</span>
            <span className="material-symbols-outlined text-[18px]">check</span>
          </button>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex -space-x-2">
              <img
                alt="Avatar of a voting member"
                className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyOQsvoJyfC48YGmAC_gbnMguSe0t0-sSOce5hKqf380Q81o2juzlKRmQ-fILeXukjF0yu2v7b-quboffHYCbE_vNiRK7KBX_mNUpROO7s6XlaTnXWv6Wv0slHz6Irf5JS1Pi8F_dU5mNowpJ3rfFD5DhBf7Y9htYBrOXu0t4yt2cCBgmegDZDvHDS_PWkJU1I4mdc6vKPveggR3Ya21KPTjMM4P6eJVQXzmknRNnzPUTt7NogaKJERw950TWjLLwqv3pVqI6a5DA"
              />
              <img
                alt="Avatar of a voting member"
                className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-slate-800 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFAQgl1aXQ9a54tEPul_D3_EGasRwvISDl9oLqK3vRavyzyVfAgDkuVnKo_KPqSAzQzuZuL5i1Y2Hs_xBubg04Mh--Vc1KAtbcuDppp4Cdu8L9E-3P3vfrD6oGOJ2EvaUR0SNrFhLMgguJxoRhBFRrD6c0OHlt7ykbPz2a6I0W-x8kqdOWaKPatLDw-IhyNdXu8F9tiPwWno-O_1QtfFfGf-FoKmvBlHUHBuyNAbaotzIgquazJVFCOgYa1Vjclqkmg0XdNEFvbNA"
              />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Emily and Alex voted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


