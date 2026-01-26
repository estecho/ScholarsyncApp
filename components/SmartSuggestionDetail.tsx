"use client";

interface SmartSuggestionDetailProps {
  location: "Cafeteria" | "Library";
}

export default function SmartSuggestionDetail({
  location,
}: SmartSuggestionDetailProps) {
  // Generate mock data based on location
  const getLocationData = () => {
    if (location === "Cafeteria") {
      return {
        icon: "☕",
        crowdLevel: 35,
        crowdStatus: "Low Crowd",
        recommendedTime: "12:15 PM",
        currentCapacity: "35%",
        estimatedWaitTime: "2-3 min",
        features: ["Fresh food", "WiFi available", "Quiet corner"],
      };
    } else {
      return {
        icon: "📚",
        crowdLevel: 25,
        crowdStatus: "Quiet",
        recommendedTime: "12:20 PM",
        currentCapacity: "25%",
        estimatedWaitTime: "No wait",
        features: ["Study rooms", "24/7 access", "Coffee bar"],
      };
    }
  };

  const data = getLocationData();

  const getCrowdColor = (level: number) => {
    if (level < 40) return "text-green-600 dark:text-green-400";
    if (level < 70) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getCrowdBgColor = (level: number) => {
    if (level < 40) return "bg-green-100 dark:bg-green-900/30";
    if (level < 70) return "bg-amber-100 dark:bg-amber-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="text-4xl">{data.icon}</div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {location}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time data
          </p>
        </div>
      </div>

      {/* Crowd Level */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Current Capacity
          </span>
          <span
            className={`text-sm font-bold px-2 py-1 rounded-md ${getCrowdBgColor(
              data.crowdLevel
            )} ${getCrowdColor(data.crowdLevel)}`}
          >
            {data.crowdStatus}
          </span>
        </div>
        <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              data.crowdLevel < 40
                ? "bg-green-500"
                : data.crowdLevel < 70
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
            style={{ width: `${data.crowdLevel}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{data.currentCapacity} full</span>
          <span>{data.estimatedWaitTime}</span>
        </div>
      </div>

      {/* Recommended Time */}
      <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">
              schedule
            </span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Recommended Time
            </p>
            <p className="text-lg font-bold text-primary">
              {data.recommendedTime}
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Features
        </p>
        <div className="flex flex-wrap gap-2">
          {data.features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}





