"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { CampusItem } from "@/types/campus";

interface CampusLifeViewProps {
  onDragStart?: (item: CampusItem) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, item: CampusItem) => void;
  isDragging?: boolean;
  resetKey?: number;
  isScrolled?: boolean;
}

// Define card data
const heroCard: CampusItem = {
  id: "hackathon-2024",
  title: "AI 黑客马拉松 2024",
  type: "event",
  description: "建议 4 人组队",
  location: "创新中心",
  time: "10 月 24 日 • 9:00 AM",
  tags: ["黑客马拉松", "科技"],
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARp15Mb5XKxrpEIW7ajhEcd71yEnrgF5_y3KGwmZ1_Kz2N_K_tNib2JusjrP-yU8CmowcIdyxur8z802UyX9a1wPgL1SCuystLMNpa0DAAnfBh4qG5A24j511zjR6bBZf6zu8WeMUDdWcQIC0E9ixvquELgcXsFqJK8gUUgg7xWK_qKfoDMTncwhH0KGeHFKdm1y-vpBQ6LQtNVTub-jRnCoJ9nhxO7_KTJcFO7jnFqQy4LK9uNC6x7ymvIzqSrhryYUvXNq-93z0",
};

const marketplaceCards: CampusItem[] = [
  {
    id: "textbook-psych",
    title: "心理学 101 教材",
    type: "marketplace",
    price: "¥105",
    seller: "Alex M.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI-VPBpd0PUButAihODAZAHMsPzA_iDQ9mFVaVioh1ttKDcyQ-y4Ql0KClSd_2vQ6l93JYh_8gSarJf7r9KGjIbLUfYDn4ksvt0dggW2KsJT4NvaoeXBShJ95_wexTCW7Hbnd7qptfYSJWCyb9sY7nfr7hXgX7Y0iwzNGkqoYi7E63m1ZBhXJpuDaMhUgTr17HwXKRgH3T2ela5CFBkzfydoK6YHEESilHY8pFfUuj4XR0MugkDFVKESYniw2aVYlvGdJc0ohsBnQ',
  },
  {
    id: "camera-polaroid",
    title: "拍立得相机",
    type: "marketplace",
    price: "¥315",
    seller: "Sarah J.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6V5o1-3Ts_his7HtX9RrkSU36zk38EpX_cZtycDGP7gSYcp8X09Ij3t8KgbXZJLtzz-Qiy81_TfrGy50yaz4Kc2kPfb5imHJN8SW_XfLGAM-aDlh_q0tl5QkjV7BDAvyrf5VQ-QxVjEODef3tKTBADKHgFmXapsogUM2T2M8lmVbP43ZKXVBHECDK_Gfel3FcFC_quq7O_3l3reCtFHfoiqUjBu8uP_8qrIAT0g9uhMwkYSjT3q0LCADCKRhq0BaCDplIs7fGsPc',
  },
];

const socialCard: CampusItem = {
  id: "study-buddy-david",
  title: "寻找化学 202 期末考试的学习伙伴！",
  type: "social",
  description: "化学专业",
  seller: "David K.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0noYjeEyyXt9pi_ZOIZFrxNSNnDk8v_cE66vT-5Cw5hQeQVg7KRFTqNn7wOVK6R34E2nAYSk8PEfJMPl-AVqPUJQufKCEZXPvqXUfiggXfJ8Qe0a7QXoyJJo-U89I_-GyQsV_uJ14z_AaQnHJk5aFp1tuQAVWQqB8xYMBc8oUQn6RqAHevljHcjJm2NP2bu8YBGIYnTDWQ1BzHyK1JTHho9QoozjVKMhj0PmRjGYi8bYV7ti-_eB3oNxcVOkNf3_pSftWZkUitWo",
};

const eventCard: CampusItem = {
  id: "jazz-night",
  title: "校园爵士之夜",
  type: "event",
  location: "主厅",
  time: "晚上 8 点",
  tags: ["音乐", "今晚"],
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg17hgFJ-LpOw_dzfDFAaS54YEsgnxRXHcfn66xLpwQw3oHnpvuKgDUAeMQk1Z9u97_NwWfzcpKOB79AWlaY71MUzWVP481-2xAs0ANlW0yE8iWdr_qYmRuDsR91tWcStHK_ca5iOGssahamvQrczm-0Wnpvdwrp3ANUKwbps0hPNFQcOZoZA0rBm422uEVgc3_LEgex9xHZDXq1b9KPWR0421ZA0OAWnm5ESSVyD6uOJP_jKlk-ruLosEIh8TV3tTo_GE4gMnCv4',
};

const announcementCard: CampusItem = {
  id: "free-coffee",
  title: "免费咖啡",
  type: "announcement",
  description: "图书馆大厅至上午 11 点",
};

const careerFairCard: CampusItem = {
  id: "career-fair-2024",
  title: "2024 秋季招聘会",
  type: "event",
  location: "会议中心",
  time: "10 月 26 日 • 10:00 AM",
  tags: ["招聘", "社交"],
  description: "50+ 公司招聘",
};

const studyGroupCard: CampusItem = {
  id: "study-group-cs",
  title: "CS 101 学习小组",
  type: "social",
  description: "每周复习课",
  location: "图书馆 201 室",
  time: "每周二 • 晚上 6 点",
};

export default function CampusLifeView({
  onDragStart,
  onDragEnd,
  isDragging = false,
  resetKey = 0,
  isScrolled = false,
}: CampusLifeViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const handleDragStart = (item: CampusItem) => {
    setDraggedCardId(item.id);
    if (onDragStart) {
      onDragStart(item);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    item: CampusItem
  ) => {
    setDraggedCardId(null);
    if (onDragEnd) {
      onDragEnd(event, info, item);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Category Tags */}
      <div
        className={`flex gap-2 px-4 mb-2 overflow-x-auto no-scrollbar mask-gradient-right ${
          isScrolled 
            ? "sticky top-[100px] z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm pb-1 pt-1" 
            : "py-2"
        }`}
      >
        <button
          onClick={() => setSelectedCategory("All")}
          className={`flex shrink-0 items-center justify-center rounded-full shadow-soft transition-all ${
            isScrolled ? "h-8 px-4" : "h-9 px-5"
          } ${
            selectedCategory === "All"
              ? "bg-slate-900 dark:bg-white"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
          }`}
        >
          <p
            className={`${isScrolled ? "text-xs" : "text-sm"} font-semibold ${
              selectedCategory === "All"
                ? "text-white dark:text-slate-900"
                : "text-slate-600 dark:text-slate-300 font-medium"
            }`}
          >
            全部
          </p>
        </button>
        <button
          onClick={() => setSelectedCategory("Events")}
          className={`flex shrink-0 items-center justify-center rounded-full shadow-sm transition-all ${
            isScrolled ? "h-8 px-4" : "h-9 px-5"
          } ${
            selectedCategory === "Events"
              ? "bg-slate-900 dark:bg-white"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <p
            className={`${isScrolled ? "text-xs" : "text-sm"} ${
              selectedCategory === "Events"
                ? "text-white dark:text-slate-900 font-semibold"
                : "text-slate-600 dark:text-slate-300 font-medium"
            }`}
          >
            活动
          </p>
        </button>
        <button
          onClick={() => setSelectedCategory("Marketplace")}
          className={`flex shrink-0 items-center justify-center rounded-full shadow-sm transition-all ${
            isScrolled ? "h-8 px-4" : "h-9 px-5"
          } ${
            selectedCategory === "Marketplace"
              ? "bg-slate-900 dark:bg-white"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <p
            className={`${isScrolled ? "text-xs" : "text-sm"} ${
              selectedCategory === "Marketplace"
                ? "text-white dark:text-slate-900 font-semibold"
                : "text-slate-600 dark:text-slate-300 font-medium"
            }`}
          >
            市场
          </p>
        </button>
        <button
          onClick={() => setSelectedCategory("Social")}
          className={`flex shrink-0 items-center justify-center rounded-full shadow-sm transition-all ${
            isScrolled ? "h-8 px-4" : "h-9 px-5"
          } ${
            selectedCategory === "Social"
              ? "bg-slate-900 dark:bg-white"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <p
            className={`${isScrolled ? "text-xs" : "text-sm"} ${
              selectedCategory === "Social"
                ? "text-white dark:text-slate-900 font-semibold"
                : "text-slate-600 dark:text-slate-300 font-medium"
            }`}
          >
            社交
          </p>
        </button>
      </div>

      {/* Hero Card */}
      <div className="px-4 pb-2">
        <motion.div
          key={`hero-${resetKey}`}
          drag
          dragElastic={0}
          dragMomentum={false}
          dragTransition={{ power: 0, timeConstant: 0 }}
          onDragStart={() => handleDragStart(heroCard)}
          onDragEnd={(e, info) => handleDragEnd(e, info, heroCard)}
          whileDrag={{ 
            scale: 1.05, 
            rotate: -3,
            transition: { duration: 0 }
          }}
          style={{ 
            zIndex: draggedCardId === heroCard.id ? 50 : 1,
            willChange: 'transform'
          }}
          className={`relative w-full overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800 shadow-xl shadow-indigo-100 dark:shadow-none border border-slate-100 dark:border-slate-700 group ${
            draggedCardId === heroCard.id ? "" : "transition-all hover:shadow-card-hover"
          } ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div className="relative h-56 w-full">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: "url('https://placehold.co/600x400/png?text=AI+Hackathon+2024')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" style={{ top: '66px', height: '164px' }}></div>
            <div className="absolute left-5 right-5 flex justify-between items-start z-10" style={{ top: '16px' }}>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/20 shadow-lg">
                <span className="material-symbols-outlined text-indigo-300 text-[18px]">
                  auto_awesome
                </span>
                <span className="text-xs font-semibold text-white tracking-wide">AI 推荐</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/80 px-3 py-1.5 backdrop-blur-md shadow-lg border border-emerald-400/20" style={{ height: '30px' }}>
                <span className="material-symbols-outlined text-white text-[18px]">
                  check_circle
                </span>
                <span className="text-xs font-bold text-white">适合日程</span>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex gap-2 mb-1">
                  <span className="inline-flex items-center rounded-lg bg-indigo-500/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm border border-indigo-400/30">
                    黑客马拉松
                  </span>
                  <span className="inline-flex items-center rounded-lg bg-white/20 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm border border-white/20">
                    科技
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-md break-words">
                  AI 黑客马拉松 2024
                </h2>
                <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium mt-1 min-w-0">
                  <span className="material-symbols-outlined text-[18px] shrink-0">calendar_today</span>
                  <span className="break-words">10 月 24 日 • 9:00 AM</span>
                  <span className="text-white/40 shrink-0">•</span>
                  <span className="break-words">创新中心</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2.5 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-center mb-2.5" style={{ marginLeft: '5px' }}>
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  朋友参加
                </p>
                <div className="flex items-center" style={{ gap: '0px' }}>
                  <div className="flex -space-x-3">
                    <div
                      className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-800 bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://ui-avatars.com/api/?name=Friend1&size=40&background=6366f1&color=ffffff&bold=true&format=png')",
                      }}
                    ></div>
                    <div
                      className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-800 bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://ui-avatars.com/api/?name=Friend2&size=40&background=8b5cf6&color=ffffff&bold=true&format=png')",
                      }}
                    ></div>
                    <div
                      className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-800 bg-cover bg-center"
                      style={{
                        backgroundImage: "url('https://ui-avatars.com/api/?name=Friend3&size=40&background=d946ef&color=ffffff&bold=true&format=png')",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    +5 人
                  </span>
                </div>
              </div>
              <button className="relative overflow-hidden rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-none hover:scale-105 active:scale-95 transition-all duration-300" style={{ paddingTop: '7px', paddingBottom: '7px', paddingLeft: '17px', paddingRight: '17px' }}>
                <span className="relative z-10 text-sm font-bold">报名</span>
              </button>
            </div>
            <div className="pt-1 pb-1 pl-4 pr-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-600 flex items-start gap-3" style={{ gap: '12px' }}>
              <span className="material-symbols-outlined text-indigo-500 fill-1 text-[20px]" style={{ marginTop: '8px', marginBottom: '8px' }}>
                lightbulb
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-white">AI 提示：</span> 建议
                4 人组队。您的 Python 技能非常适合这个活动！
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Masonry Layout */}
      <div className="px-4 pb-4" style={{ marginTop: '5px', marginBottom: '5px' }}>
        <div className="columns-2 gap-2 space-y-2">
          {/* Marketplace Card 1 */}
          <motion.div
            key={`marketplace-0-${resetKey}`}
            drag
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ power: 0, timeConstant: 0 }}
            onDragStart={() => handleDragStart(marketplaceCards[0])}
            onDragEnd={(e, info) => handleDragEnd(e, info, marketplaceCards[0])}
            whileDrag={{ 
              scale: 1.05, 
              rotate: -3,
              transition: { duration: 0 }
            }}
            style={{ 
              zIndex: draggedCardId === marketplaceCards[0].id ? 50 : 1,
              willChange: 'transform'
            }}
            className={`break-inside-avoid relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-soft ${
              draggedCardId === marketplaceCards[0].id ? "" : "transition-transform hover:scale-[1.02] duration-300"
            } ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div className="relative">
              <div
                className="h-32 w-full bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://placehold.co/400x300/png?text=Textbook")',
                }}
              ></div>
              <div className="absolute bottom-2 left-2 rounded-lg bg-black/70 px-2 py-1 backdrop-blur-sm">
                <p className="text-xs font-bold text-white">$15</p>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-slate-900 dark:text-white text-sm font-semibold leading-tight mb-1">
                心理学 101 教材
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="h-5 w-5 rounded-full bg-slate-200 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://ui-avatars.com/api/?name=Alex+M&size=20&background=6366f1&color=ffffff&bold=true&format=png')",
                  }}
                ></div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Alex M.</p>
              </div>
            </div>
          </motion.div>

          {/* Social Card */}
          <motion.div
            key={`social-${resetKey}`}
            drag
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ power: 0, timeConstant: 0 }}
            onDragStart={() => handleDragStart(socialCard)}
            onDragEnd={(e, info) => handleDragEnd(e, info, socialCard)}
            whileDrag={{ 
              scale: 1.05, 
              rotate: -3,
              transition: { duration: 0 }
            }}
            style={{ 
              zIndex: draggedCardId === socialCard.id ? 50 : 1,
              willChange: 'transform',
              borderColor: 'rgba(136, 165, 251, 1)',
              backgroundColor: 'rgba(219, 223, 255, 1)',
              backgroundImage: 'none',
            }}
            className={`break-inside-avoid flex flex-col p-4 rounded-2xl shadow-soft border dark:border-indigo-800 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-sm"
                style={{
                  backgroundImage: "url('https://ui-avatars.com/api/?name=David+K&size=40&background=8b5cf6&color=ffffff&bold=true&format=png')",
                }}
              ></div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">David K.</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Chemistry Major</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
              "寻找化学 202 期末考试的学习伙伴！"
            </p>
            <button className="w-full py-2 rounded-xl bg-white dark:bg-slate-700 text-primary dark:text-blue-300 text-xs font-bold shadow-sm">
              联系
            </button>
          </motion.div>

          {/* Event Card */}
          <motion.div
            key={`event-${resetKey}`}
            drag
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ power: 0, timeConstant: 0 }}
            onDragStart={() => handleDragStart(eventCard)}
            onDragEnd={(e, info) => handleDragEnd(e, info, eventCard)}
            whileDrag={{ 
              scale: 1.05, 
              rotate: -3,
              transition: { duration: 0 }
            }}
            style={{ 
              zIndex: draggedCardId === eventCard.id ? 50 : 1,
              willChange: 'transform'
            }}
            className={`break-inside-avoid relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-soft ${
              draggedCardId === marketplaceCards[0].id ? "" : "transition-transform hover:scale-[1.02] duration-300"
            } ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div
              className="w-full bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://placehold.co/400x300/png?text=Campus+Jazz+Night")',
                  height: '175px',
                }}
            ></div>
            <div className="p-3" style={{ height: '90px' }}>
              <div className="flex justify-between items-start mb-1">
                <p className="text-xs font-semibold text-rose-500 uppercase tracking-wide">音乐</p>
                <span className="text-[10px] font-medium bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 px-2 py-0.5 rounded-full">
                  今晚
                </span>
              </div>
              <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight mb-1">
                校园爵士之夜
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">主厅 • 晚上 8 点</p>
            </div>
          </motion.div>

          {/* Announcement Card */}
          <motion.div
            key={`announcement-${resetKey}`}
            drag
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ power: 0, timeConstant: 0 }}
            onDragStart={() => handleDragStart(announcementCard)}
            onDragEnd={(e, info) => handleDragEnd(e, info, announcementCard)}
            whileDrag={{ 
              scale: 1.05, 
              rotate: -3,
              transition: { duration: 0 }
            }}
            style={{ 
              zIndex: draggedCardId === announcementCard.id ? 50 : 1,
              willChange: 'transform',
              backgroundColor: 'rgba(255, 243, 209, 1)',
              borderColor: 'rgba(253, 216, 196, 1)'
            }}
            className={`break-inside-avoid flex flex-col rounded-2xl dark:bg-amber-900/20 shadow-soft overflow-hidden border border-amber-100 dark:border-amber-800 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div className="flex p-3 items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <span className="material-symbols-outlined text-[20px]">local_cafe</span>
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white text-sm font-bold">免费咖啡</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  图书馆大厅至上午 11 点
                </p>
              </div>
            </div>
          </motion.div>

          {/* Marketplace Card 2 */}
          <motion.div
            key={`marketplace-1-${resetKey}`}
            drag
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ power: 0, timeConstant: 0 }}
            onDragStart={() => handleDragStart(marketplaceCards[1])}
            onDragEnd={(e, info) => handleDragEnd(e, info, marketplaceCards[1])}
            whileDrag={{ 
              scale: 1.05, 
              rotate: -3,
              transition: { duration: 0 }
            }}
            style={{ 
              zIndex: draggedCardId === marketplaceCards[1].id ? 50 : 1,
              willChange: 'transform'
            }}
            className={`break-inside-avoid relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-soft ${
              draggedCardId === marketplaceCards[0].id ? "" : "transition-transform hover:scale-[1.02] duration-300"
            } ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div className="relative">
              <div
                className="w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://placehold.co/400x300/png?text=Polaroid+Camera")',
                  height: '133px',
                }}
              ></div>
              <div className="absolute bottom-2 left-2 rounded-lg bg-black/70 backdrop-blur-sm" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '8px', paddingRight: '8px', width: '65px' }}>
                <p className="font-bold text-white" style={{ fontSize: '20px', width: '48px', textAlign: 'center', verticalAlign: 'bottom', height: '23px' }}>$45</p>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-slate-900 dark:text-white text-sm font-semibold leading-tight mb-1">
                拍立得相机
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="h-5 w-5 rounded-full bg-slate-200 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://ui-avatars.com/api/?name=Sarah+J&size=20&background=d946ef&color=ffffff&bold=true&format=png')",
                  }}
                ></div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Sarah J.</p>
              </div>
            </div>
          </motion.div>

          {/* Career Fair Card */}
          <motion.div
            key={`career-fair-${resetKey}`}
            drag
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ power: 0, timeConstant: 0 }}
            onDragStart={() => handleDragStart(careerFairCard)}
            onDragEnd={(e, info) => handleDragEnd(e, info, careerFairCard)}
            whileDrag={{ 
              scale: 1.05, 
              rotate: -3,
              transition: { duration: 0 }
            }}
            style={{ 
              zIndex: draggedCardId === careerFairCard.id ? 50 : 1,
              willChange: 'transform'
            }}
            className={`break-inside-avoid relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30 shadow-soft ${
              draggedCardId === careerFairCard.id ? "" : "transition-transform hover:scale-[1.02] duration-300"
            } ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div className="px-4" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined text-[20px]">work</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">招聘</p>
                    <span className="text-[10px] font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">
                      社交
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight mb-1">
                2024 秋季招聘会
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                {careerFairCard.description}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                <span>{careerFairCard.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>{careerFairCard.time}</span>
              </div>
            </div>
          </motion.div>

          {/* Study Group Card */}
          <motion.div
            key={`study-group-${resetKey}`}
            drag
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ power: 0, timeConstant: 0 }}
            onDragStart={() => handleDragStart(studyGroupCard)}
            onDragEnd={(e, info) => handleDragEnd(e, info, studyGroupCard)}
            whileDrag={{ 
              scale: 1.05, 
              rotate: -3,
              transition: { duration: 0 }
            }}
            style={{ 
              zIndex: draggedCardId === studyGroupCard.id ? 50 : 1,
              willChange: 'transform',
              paddingTop: '10px',
              paddingBottom: '10px',
              borderColor: 'rgba(148, 194, 255, 1)'
            }}
            className={`break-inside-avoid flex flex-col p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800/30 shadow-soft transition-transform hover:scale-[1.02] duration-300 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">CS 101 学习小组</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">每周复习课</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              <span>图书馆 201 室</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-3">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>每周二 • 晚上 6 点</span>
            </div>
            <button className="w-full py-2 rounded-xl bg-purple-500 dark:bg-purple-600 text-white text-xs font-bold shadow-sm hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors">
              加入小组
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

