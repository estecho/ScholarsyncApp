"use client";

import { useState } from "react";
import PriorityBriefing from "@/components/chat/PriorityBriefing";
import MessageItem from "@/components/chat/MessageItem";
import TriageModal from "@/components/chat/TriageModal";
import { PRIORITY_ITEMS, MESSAGES } from "@/constants/chat";

export default function ChatPage() {
  const [showTriageModal, setShowTriageModal] = useState(false);

  const handleExecuteTriage = () => {
    // TODO: Implement actual triage logic
    console.log("Triage executed");
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-background-dark h-full min-h-screen relative flex flex-col shadow-2xl mx-auto border-x border-slate-100 dark:border-slate-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-5 py-3" style={{ maxWidth: '430px', margin: '0 auto' }}>
        <div className="flex items-center justify-between h-14">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">消息</h1>
          <button
            onClick={() => setShowTriageModal(true)}
            className="group flex items-center justify-center h-10 w-10 rounded-full bg-slate-50 dark:bg-surface-dark hover:bg-primary/10 transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" style={{ fontSize: "24px" }}>
              cleaning_services
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide pt-[81px] pb-24">
        {/* Priority Briefing */}
        <div className="px-5 pt-6 pb-2">
          <PriorityBriefing items={PRIORITY_ITEMS} />
        </div>

        {/* Recent Messages */}
        <div className="flex flex-col pt-4">
          <div className="px-5 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">最近</h3>
          </div>
          {MESSAGES.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
        <div className="h-10"></div>
      </main>

      {/* Triage Modal */}
      <TriageModal isOpen={showTriageModal} onClose={() => setShowTriageModal(false)} onExecute={handleExecuteTriage} />
    </div>
  );
}


