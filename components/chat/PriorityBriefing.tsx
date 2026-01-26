import { PriorityItem } from "@/constants/chat";

interface PriorityBriefingProps {
  items: PriorityItem[];
}

export default function PriorityBriefing({ items }: PriorityBriefingProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30 p-5 shadow-card">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/10 rounded-full blur-xl"></div>
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>
              auto_awesome
            </span>
            {items.length} Priorities Today
          </h2>
        </div>
        <div className="flex flex-col gap-2.5">
          {items.map((item, index) => {
            const iconColorClass =
              item.iconBg === "bg-blue-100 dark:bg-blue-900/40"
                ? "text-primary"
                : item.iconBg === "bg-indigo-100 dark:bg-indigo-900/40"
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-300";

            return (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/60 dark:bg-background-dark/60 p-3 rounded-xl backdrop-blur-sm border border-white/50 dark:border-white/5 transition hover:bg-white/80 dark:hover:bg-background-dark/80 cursor-pointer"
              >
                <div className={`shrink-0 mt-0.5 w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center ${iconColorClass}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-words">{item.sender}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 leading-snug break-words">{item.preview}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


