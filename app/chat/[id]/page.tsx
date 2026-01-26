"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getMessageById } from "@/constants/chat";
import Toast from "@/components/Toast";
import TaskCreationModal from "@/components/chat/TaskCreationModal";
import SchedulingPollCard from "@/components/chat/SchedulingPollCard";
import { getAvatarUrl } from "@/lib/avatarUtils";

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const messageId = params.id as string;
  const message = getMessageById(messageId);
  const [showToast, setShowToast] = useState(false);
  const [inputValue, setInputValue] = useState("Okay I will send it");
  const [showTaskModal, setShowTaskModal] = useState(false);

  // #region agent log
  useEffect(() => {
    const checkLayoutAndPositioning = () => {
      const container = document.querySelector('div.bg-background-light.flex.flex-col.overflow-hidden');
      const header = document.querySelector('header.shrink-0.sticky');
      const footer = document.querySelector('footer.shrink-0.sticky');
      const main = document.querySelector('main.flex-1.overflow-y-auto');
      
      if (container && header && footer && main) {
        const containerRect = container.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const mainScrollTop = main.scrollTop;
        
        // Check computed styles
        const containerStyles = window.getComputedStyle(container);
        const headerStyles = window.getComputedStyle(header);
        const footerStyles = window.getComputedStyle(footer);
        const mainStyles = window.getComputedStyle(main);
        
        fetch('http://127.0.0.1:7243/ingest/8815c4eb-a792-4ce6-8842-8d12906f5e1d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chat/[id]/page.tsx:21',message:'Layout check - Hypothesis A: overflow-hidden impact',data:{containerOverflow:containerStyles.overflow,containerPosition:containerStyles.position,headerPosition:headerStyles.position,headerTop:headerRect.top,headerSticky:headerStyles.position==='sticky',footerPosition:footerStyles.position,footerBottom:footerRect.bottom,footerSticky:footerStyles.position==='sticky',viewportHeight,scrollTop,mainScrollTop},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        
        fetch('http://127.0.0.1:7243/ingest/8815c4eb-a792-4ce6-8842-8d12906f5e1d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chat/[id]/page.tsx:22',message:'Layout check - Hypothesis B: scroll container context',data:{mainOverflow:mainStyles.overflow,mainOverflowY:mainStyles.overflowY,mainHeight:mainRect.height,mainScrollHeight:main.scrollHeight,mainClientHeight:main.clientHeight,containerIsScrolling:container.scrollHeight>container.clientHeight,mainIsScrolling:main.scrollHeight>main.clientHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        
        fetch('http://127.0.0.1:7243/ingest/8815c4eb-a792-4ce6-8842-8d12906f5e1d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chat/[id]/page.tsx:23',message:'Layout check - Hypothesis C: flexbox sticky behavior',data:{containerDisplay:containerStyles.display,containerFlexDirection:containerStyles.flexDirection,headerFlexShrink:headerStyles.flexShrink,footerFlexShrink:footerStyles.flexShrink,mainFlex:mainStyles.flex,headerRectTop:headerRect.top,footerRectBottom:footerRect.bottom,viewportBottom:viewportHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        
        fetch('http://127.0.0.1:7243/ingest/8815c4eb-a792-4ce6-8842-8d12906f5e1d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chat/[id]/page.tsx:24',message:'Layout check - Hypothesis D: positioning context',data:{headerZIndex:headerStyles.zIndex,footerZIndex:footerStyles.zIndex,headerOffsetParent:header.offsetParent?.tagName,footerOffsetParent:footer.offsetParent?.tagName,containerPosition:containerStyles.position},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        
        fetch('http://127.0.0.1:7243/ingest/8815c4eb-a792-4ce6-8842-8d12906f5e1d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chat/[id]/page.tsx:25',message:'Layout check - Hypothesis E: sticky vs fixed comparison',data:{headerComputedPosition:headerStyles.position,footerComputedPosition:footerStyles.position,headerTopValue:headerStyles.top,footerBottomValue:footerStyles.bottom,headerShouldBeFixed:headerRect.top===0&&mainScrollTop>0,footerShouldBeFixed:footerRect.bottom===viewportHeight&&mainScrollTop>0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      }
    };
    
    // Check immediately and on scroll
    setTimeout(checkLayoutAndPositioning, 100);
    const main = document.querySelector('main.flex-1.overflow-y-auto');
    if (main) {
      main.addEventListener('scroll', checkLayoutAndPositioning);
    }
    window.addEventListener('scroll', checkLayoutAndPositioning);
    window.addEventListener('resize', checkLayoutAndPositioning);
    
    return () => {
      if (main) {
        main.removeEventListener('scroll', checkLayoutAndPositioning);
      }
      window.removeEventListener('scroll', checkLayoutAndPositioning);
      window.removeEventListener('resize', checkLayoutAndPositioning);
    };
  }, []);
  // #endregion

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!message) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">未找到消息</p>
      </div>
    );
  }

  const handleActionChipClick = () => {
    setShowTaskModal(true);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display h-screen flex flex-col overflow-hidden text-slate-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 transition-colors duration-200" style={{ maxWidth: '430px', margin: '0 auto' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center ring-2 ring-offset-2 ring-transparent group-hover:ring-primary transition-all"
                style={{ backgroundImage: `url('${getAvatarUrl(message.sender, 40, message.avatar)}')` }}
              ></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-surface-dark rounded-full"></div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h1 className="text-base font-bold leading-tight break-words">{message.sender}</h1>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-[14px]">mail</span>
                <span>通过邮件活跃</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Stream */}
      <main className="flex-1 overflow-y-auto p-4 pt-[80px] pb-[220px] space-y-6 bg-background-light dark:bg-background-dark scroll-smooth">
        {/* Timestamp */}
        <div className="flex justify-center">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            今天 9:41 AM
          </span>
        </div>

        {/* Scheduling Card (if message has scheduling card) */}
        {message.hasSchedulingCard && (
          <div className="flex items-start gap-3 group">
            <div 
              className="shrink-0 w-8 h-8 rounded-full bg-gray-200 bg-cover bg-center self-start"
              style={{ backgroundImage: `url('${getAvatarUrl(message.sender, 32, message.avatar)}')` }}
            ></div>
            <div className="flex flex-col items-start gap-1 max-w-[85%] min-w-0">
              <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium ml-1 break-words">{message.sender}</p>
              <SchedulingPollCard
                onVote={(slotId) => {
                  console.log("Voted for slot:", slotId);
                }}
              />
            </div>
          </div>
        )}

        {/* Incoming Message + AI Analysis */}
        {!message.hasSchedulingCard && (
          <div className="flex items-end gap-3 group">
            <div 
              className="shrink-0 w-8 h-8 rounded-full bg-gray-200 bg-cover bg-center self-end mb-8"
              style={{ backgroundImage: `url('${getAvatarUrl(message.sender, 32, message.avatar)}')` }}
            ></div>
            <div className="flex flex-col items-start gap-2 max-w-[85%] min-w-0">
              {/* Message Bubble */}
              <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-800 min-w-0 w-full">
                <p className="text-[15px] leading-relaxed text-slate-800 dark:text-slate-100 break-words">
                  {message.preview}
                </p>
              </div>
              {/* AI Analysis Chip */}
              {message.id === "prof-jenkins" && (
                <button
                  onClick={handleActionChipClick}
                  className="flex items-center gap-2 pl-3 pr-4 py-1.5 bg-future-lab-subtle border border-indigo-100 dark:border-indigo-900/30 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all cursor-pointer group/chip"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">创建任务</span>
                    <span className="text-[11px] text-indigo-600/80 dark:text-indigo-300/80">草稿周五到期</span>
                  </div>
                  <span className="material-symbols-outlined text-indigo-400 text-[16px] ml-1 group-hover/chip:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Composer Area */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pb-4 transition-all duration-300" style={{ maxWidth: '430px', margin: '0 auto' }}>
        {/* AI Magic Bar */}
        <div className="px-4 pt-1.5 pb-1 overflow-x-auto no-scrollbar flex gap-2 bg-transparent">
          {/* Active Button */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-future-lab shadow-md shadow-indigo-500/30 dark:shadow-indigo-500/20 text-white transition-transform active:scale-95 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px] animate-pulse">auto_awesome</span>
            <span className="text-sm font-medium">专业化</span>
          </button>
          {/* Secondary Button */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md shadow-gray-200/50 dark:shadow-gray-900/50 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200/50 dark:border-gray-700/50">
            <span className="material-symbols-outlined text-[16px]">calendar_clock</span>
            <span className="text-sm font-medium">查看日程</span>
          </button>
        </div>

        {/* Input Area */}
        <div className="px-4 pb-2 pt-0.5">
          {/* Ghost Text Preview Overlay */}
          {message.id !== "library-service" && (
            <div className="mb-2 relative">
              <div className="absolute -top-1 left-2 w-0.5 h-full bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full opacity-50"></div>
              <div className="pl-4">
                  <p className="text-xs font-semibold text-indigo-500 mb-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">psychology</span>
                  建议重写
                </p>
                <p className="text-sm text-gray-400 italic">"明白了，詹金斯博士。我将确保..."</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900/50 p-1 rounded-[20px] border border-gray-200 dark:border-gray-700 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <button className="p-1.5 text-gray-400 hover:text-primary transition-colors shrink-0">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </button>
            <div className="flex-1 py-1 relative min-w-0">
              <input
                className="w-full bg-transparent border-none p-0 text-[16px] text-slate-900 dark:text-white placeholder-gray-400 focus:ring-0 leading-normal"
                placeholder="消息..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <button className="p-1.5 rounded-full bg-primary hover:bg-primary-dark text-white shrink-0 shadow-md shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center h-8 w-8">
              <span className="material-symbols-outlined text-[18px] fill-current">arrow_upward</span>
            </button>
          </div>
        </div>

        {/* Home Indicator spacing for iOS */}
        <div className="h-1 bg-transparent w-full"></div>
      </footer>

      {/* Toast */}
      <Toast message="任务已添加到日程" isVisible={showToast} onClose={() => setShowToast(false)} />

      {/* Task Creation Modal */}
      <TaskCreationModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSuccess={() => {
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2500);
        }}
        taskData={{
          title: "提交草稿给詹金斯教授",
          dueDate: "周五，10 月 24 日 @ 11:59 PM",
          source: "邮件线程",
        }}
      />
    </div>
  );
}

