"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ImportHeader } from "@/components/Header";
import PageTransition from "@/components/PageTransition";

export default function ImportPage() {
  const router = useRouter();
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedImportType, setSelectedImportType] = useState<'scan' | 'upload' | 'paste' | null>(null);

  return (
    <PageTransition>
      <div className="fixed inset-0 bg-slate-50 dark:bg-black font-display antialiased text-slate-900 dark:text-white min-h-screen flex flex-col items-center justify-center overflow-x-hidden w-screen">
      <div className="relative flex h-full min-h-screen w-full max-w-md flex-col mx-auto bg-slate-50 dark:bg-black shadow-2xl overflow-hidden">
        <ImportHeader
          onBack={() => router.back()}
          onSettings={() => {
            /* TODO: Open settings */
          }}
        />
        <main className="flex-1 flex flex-col pb-0 pr-0 h-[744px] z-10">
          <div className="relative w-full h-full rounded-t-none rounded-b-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-[#0f172a] group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81]"></div>
            <div className="absolute inset-0 holo-grid opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#312e81]/80 via-transparent to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="absolute top-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 border border-white/10 backdrop-blur-md shadow-lg">
                <span
                  className="material-symbols-outlined text-emerald-400 text-[16px]"
                  style={{
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  verified_user
                </span>
                <span className="text-xs font-medium text-emerald-100/90 tracking-wide">
                  End-to-end Encrypted
                </span>
              </div>
              <div className="absolute top-[28%] left-[8%] sm:left-[12%] animate-[bounce_4s_infinite]">
                <div className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform">
                  <span className="text-2xl">🎓</span>
                  <span className="text-[10px] font-semibold text-white/80">
                    Credits &amp; GPA
                  </span>
                </div>
              </div>
              <div className="absolute top-[32%] right-[8%] sm:right-[12%] animate-[bounce_5s_infinite]">
                <div className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform">
                  <span className="text-2xl">📝</span>
                  <span className="text-[10px] font-semibold text-white/80">
                    Schedule
                  </span>
                </div>
              </div>
              <div className="absolute bottom-[28%] left-[10%] sm:left-[14%] animate-[bounce_6s_infinite]">
                <div className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform">
                  <span className="text-2xl">🏷️</span>
                  <span className="text-[10px] font-semibold text-white/80">
                    Requirements
                  </span>
                </div>
              </div>
              <div className="absolute bottom-[25%] right-[10%] sm:right-[14%]">
                <div className="absolute left-[-64px] top-[-40px] flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform animate-[bounce_4s_infinite]">
                  <span className="text-2xl">🏛️</span>
                  <span className="text-[10px] font-semibold text-white/80">
                    Transcripts
                  </span>
                </div>
              </div>
              <div className="relative group mt-8">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[40px] opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <button
                  onClick={() => router.push("/scan")}
                  className="relative size-32 rounded-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-[0_0_50px_rgba(129,140,248,0.2)] flex flex-col items-center justify-center gap-1 active:scale-95 transition-all duration-300 group-hover:border-indigo-400/50"
                >
                  <div className="size-24 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-inner border border-white/20 group-hover:scale-105 transition-transform duration-300">
                    <span className="material-symbols-outlined text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      key
                    </span>
                  </div>
                </button>
              </div>
              <div className="mt-8 space-y-1">
                <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                  School Connect
                </h2>
                <p className="text-indigo-200/70 text-sm font-medium">
                  Unlock God Mode
                </p>
              </div>
            </div>
          </div>
        </main>
        <div className="flex-none h-auto z-20 flex flex-col items-center justify-start">
          <div className="relative -mt-6 mx-2 mb-2 rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 pb-10 flex flex-col items-center gap-5 w-full">
            <div className="w-12 h-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden"></div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center">
              Or import manually{" "}
              <span className="hidden sm:inline">(Limited AI features)</span>
            </p>
            <div className="grid grid-cols-3 gap-4 w-full">
              <button 
                onClick={() => {
                  setShowScanModal(true);
                  setSelectedImportType('scan');
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`size-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                  selectedImportType === 'scan'
                    ? 'bg-indigo-500 border-2 border-indigo-500 shadow-indigo-500/30 scale-110'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 group-hover:border-indigo-500/30 group-hover:shadow-indigo-500/10'
                }`}>
                  <span className={`material-symbols-outlined transition-colors ${
                    selectedImportType === 'scan'
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-300 group-hover:text-indigo-500'
                  }`}>
                    document_scanner
                  </span>
                </div>
                <span className={`text-[11px] font-medium transition-colors ${
                  selectedImportType === 'scan'
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  Scan Paper
                </span>
              </button>
              <button 
                onClick={() => {
                  setShowScanModal(true);
                  setSelectedImportType('upload');
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`size-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                  selectedImportType === 'upload'
                    ? 'bg-purple-500 border-2 border-purple-500 shadow-purple-500/30 scale-110'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 group-hover:border-purple-500/30 group-hover:shadow-purple-500/10'
                }`}>
                  <span className={`material-symbols-outlined transition-colors ${
                    selectedImportType === 'upload'
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-300 group-hover:text-purple-500'
                  }`}>
                    upload_file
                  </span>
                </div>
                <span className={`text-[11px] font-medium transition-colors ${
                  selectedImportType === 'upload'
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  Upload File
                </span>
              </button>
              <button 
                onClick={() => {
                  setShowScanModal(true);
                  setSelectedImportType('paste');
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`size-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                  selectedImportType === 'paste'
                    ? 'bg-pink-500 border-2 border-pink-500 shadow-pink-500/30 scale-110'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 group-hover:border-pink-500/30 group-hover:shadow-pink-500/10'
                }`}>
                  <span className={`material-symbols-outlined transition-colors ${
                    selectedImportType === 'paste'
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-300 group-hover:text-pink-500'
                  }`}>
                    edit_note
                  </span>
                </div>
                <span className={`text-[11px] font-medium transition-colors ${
                  selectedImportType === 'paste'
                    ? 'text-pink-600 dark:text-pink-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  Paste Text
                </span>
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showScanModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setShowScanModal(false);
                  setSelectedImportType(null);
                }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              />
              {/* Scan Modal */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-start pointer-events-none"
              >
                <div className="relative -mt-6 mx-2 mb-2 rounded-[2rem] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] p-6 pb-10 flex flex-col items-center gap-5 w-full max-w-md pointer-events-auto max-h-[92vh] overflow-y-auto">
                  <div className="w-12 h-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden"></div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center">
                    Scan Document
                  </p>
                  {/* Three Import Type Buttons */}
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <button 
                      onClick={() => {
                        setShowScanModal(true);
                        setSelectedImportType('scan');
                      }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`size-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                        selectedImportType === 'scan'
                          ? 'bg-indigo-500 border-2 border-indigo-500 shadow-indigo-500/30 scale-110'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 group-hover:border-indigo-500/30 group-hover:shadow-indigo-500/10'
                      }`}>
                        <span className={`material-symbols-outlined transition-colors ${
                          selectedImportType === 'scan'
                            ? 'text-white'
                            : 'text-slate-600 dark:text-slate-300 group-hover:text-indigo-500'
                        }`}>
                          document_scanner
                        </span>
                      </div>
                      <span className={`text-[11px] font-medium transition-colors ${
                        selectedImportType === 'scan'
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        Scan Paper
                      </span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowScanModal(true);
                        setSelectedImportType('upload');
                      }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`size-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                        selectedImportType === 'upload'
                          ? 'bg-purple-500 border-2 border-purple-500 shadow-purple-500/30 scale-110'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 group-hover:border-purple-500/30 group-hover:shadow-purple-500/10'
                      }`}>
                        <span className={`material-symbols-outlined transition-colors ${
                          selectedImportType === 'upload'
                            ? 'text-white'
                            : 'text-slate-600 dark:text-slate-300 group-hover:text-purple-500'
                        }`}>
                          upload_file
                        </span>
                      </div>
                      <span className={`text-[11px] font-medium transition-colors ${
                        selectedImportType === 'upload'
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        Upload File
                      </span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowScanModal(true);
                        setSelectedImportType('paste');
                      }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`size-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                        selectedImportType === 'paste'
                          ? 'bg-pink-500 border-2 border-pink-500 shadow-pink-500/30 scale-110'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-110 group-hover:border-pink-500/30 group-hover:shadow-pink-500/10'
                      }`}>
                        <span className={`material-symbols-outlined transition-colors ${
                          selectedImportType === 'paste'
                            ? 'text-white'
                            : 'text-slate-600 dark:text-slate-300 group-hover:text-pink-500'
                        }`}>
                          edit_note
                        </span>
                      </div>
                      <span className={`text-[11px] font-medium transition-colors ${
                        selectedImportType === 'paste'
                          ? 'text-pink-600 dark:text-pink-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        Paste Text
                      </span>
                    </button>
                  </div>
                  {/* Dynamic UI Content based on selectedImportType */}
                  <AnimatePresence mode="wait">
                    {selectedImportType === 'scan' && (
                      <motion.div
                        key="scan"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col gap-4"
                      >
                        {/* Camera Preview Area */}
                        <div className="relative w-full h-64 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="size-20 rounded-full bg-indigo-500/10 flex items-center justify-center">
                              <span className="material-symbols-outlined text-indigo-500 text-5xl">
                                camera_alt
                              </span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                              Position document in frame
                            </p>
                          </div>
                          {/* Scanning beam effect */}
                          <div className="absolute top-[35%] w-full z-10 pointer-events-none">
                            <div className="h-[2px] w-full bg-indigo-500 shadow-[0_0_20px_4px_rgba(99,102,241,0.8)]"></div>
                            <div className="h-20 w-full bg-gradient-to-t from-indigo-500/30 to-transparent -mt-20"></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {selectedImportType === 'upload' && (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col gap-4"
                      >
                        {/* File Upload Area */}
                        <label className="relative w-full h-64 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 border-dashed border-purple-300 dark:border-purple-600 flex items-center justify-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 transition-colors group">
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                            multiple
                            onChange={(e) => {
                              // Handle file selection
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                console.log('Files selected:', files);
                                // TODO: Handle file upload
                              }
                            }}
                          />
                          <div className="flex flex-col items-center gap-3">
                            <div className="size-20 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                              <span className="material-symbols-outlined text-purple-500 text-5xl">
                                upload_file
                              </span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center px-4">
                              Drop files here or click to browse
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-500">
                              PDF, DOC, TXT, JPG, PNG
                            </p>
                          </div>
                        </label>
                      </motion.div>
                    )}
                    {selectedImportType === 'paste' && (
                      <motion.div
                        key="paste"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col gap-4"
                      >
                        {/* Text Input Area */}
                        <div className="relative w-full h-64 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 border-dashed border-pink-300 dark:border-pink-600 flex flex-col">
                          <div className="flex items-center justify-center p-4 border-b border-pink-200 dark:border-pink-700">
                            <div className="flex items-center gap-2">
                              <div className="size-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-pink-500 text-2xl">
                                  edit_note
                                </span>
                              </div>
                              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Paste your text here
                              </p>
                            </div>
                          </div>
                          <textarea
                            className="flex-1 w-full p-4 bg-transparent text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 resize-none focus:outline-none"
                            placeholder="Paste or type your content here..."
                            rows={8}
                            onChange={(e) => {
                              // Handle text input
                              console.log('Text input:', e.target.value);
                              // TODO: Handle text processing
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Confirm Button */}
                  <button
                    onClick={() => router.push("/scan")}
                    className="w-full mt-4 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-electric-blue dark:text-blue-400 font-medium text-xs hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">
                      check_circle
                    </span>
                    Confirm
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      </div>
    </PageTransition>
  );
}

