"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GlassInput from "@/components/GlassInput";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login logic
    router.push("/import");
  };

  return (
    <PageTransition>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col items-center justify-center overflow-x-hidden relative">
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 w-full h-full bg-light-mesh z-0 pointer-events-none"></div>
      <main className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col h-full justify-between sm:justify-center sm:gap-8">
        {/* Hero Section: Logo & Titles */}
        <div className="flex flex-col items-center w-full pt-8 sm:pt-0">
          {/* 3D Glass Logo Placeholder */}
          <div
            className="w-32 h-32 mb-6 rounded-3xl prism-shadow animate-float bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-white/50 relative flex items-center justify-center overflow-hidden"
            data-alt="Abstract 3D crystal prism refracting blue light"
          >
            {/* Inner visual representation of a prism/logo */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://via.placeholder.com/256x256/135bec/ffffff?text=S')",
              }}
            ></div>
            <span
              className="material-symbols-outlined text-primary text-6xl relative z-10"
              style={{ fontSize: "64px" }}
            >
              school
            </span>
          </div>
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center">
            ScholarSync
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-medium leading-normal pt-2 text-center">
            Your AI Academic Companion
          </p>
        </div>
        {/* Form Section */}
        <form className="w-full flex flex-col gap-5 mt-8" onSubmit={handleSubmit}>
          {/* Email Field */}
          <GlassInput
            type="email"
            placeholder="University Email"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Field */}
          <GlassInput
            type="password"
            placeholder="Password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Forgot Password */}
          <div className="flex justify-end px-2">
            <Link
              href="#"
              className="text-sm font-semibold text-primary hover:text-blue-700 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full h-14 mt-2 rounded-full bg-electric-gradient text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Enter Campus</span>
            <span className="material-symbols-outlined text-xl">
              arrow_forward
            </span>
          </button>
        </form>
        {/* Social Login & Footer */}
        <div className="flex flex-col items-center gap-6 mt-10 pb-4">
          <div className="flex items-center w-full gap-4">
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Or continue with
            </span>
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          </div>
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              {/* Google Icon SVG */}
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.5882 9.83801H12.2402V14.459H18.722C18.4526 15.9494 17.5887 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9273 23.7663 12.2764Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12.2399 24.0008C15.4764 24.0008 18.2057 22.9382 20.1943 21.1039L16.3273 18.1055C15.2514 18.8375 13.8625 19.252 12.2442 19.252C9.11366 19.252 6.45924 17.1399 5.50683 14.3003H1.51636V17.3912C3.55349 21.4434 7.70268 24.0008 12.2399 24.0008Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.50277 14.3003C5.00209 12.8099 5.00209 11.1961 5.50277 9.70575V6.61481H1.51655C-0.185282 10.0056 -0.185282 14.0004 1.51655 17.3912L5.50277 14.3003Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12.2399 4.74966C13.9507 4.7232 15.6042 5.36697 16.8432 6.54867L20.2693 3.12262C18.0999 1.0855 15.2206 -0.0344664 12.2399 0.000808666C7.70268 0.000808666 3.55349 2.55822 1.51636 6.61481L5.50257 9.70575C6.45042 6.86173 9.10939 4.74966 12.2399 4.74966Z"
                  fill="#EA4335"
                ></path>
              </svg>
            </button>
            <button className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-slate-800 dark:text-white text-2xl">
                ios
              </span>
            </button>
            <button className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 23 23"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4595 11.4595H0.966309V0.966309H11.4595V11.4595Z"
                  fill="#F25022"
                ></path>
                <path
                  d="M22.9926 11.4595H12.4994V0.966309H22.9926V11.4595Z"
                  fill="#7FBA00"
                ></path>
                <path
                  d="M11.4595 22.9926H0.966309V12.4994H11.4595V22.9926Z"
                  fill="#00A4EF"
                ></path>
                <path
                  d="M22.9926 22.9926H12.4994V12.4994H22.9926V22.9926Z"
                  fill="#FFB900"
                ></path>
              </svg>
            </button>
          </div>
          <p className="text-center text-sm text-slate-500">
            New here?{" "}
            <Link
              href="#"
              className="font-bold text-primary hover:text-blue-700 transition-colors ml-1"
            >
              Create Account
            </Link>
          </p>
        </div>
      </main>
      </div>
    </PageTransition>
  );
}

