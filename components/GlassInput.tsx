"use client";

import { useState } from "react";

interface GlassInputProps {
  type?: "email" | "password" | "text";
  placeholder?: string;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function GlassInput({
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
}: GlassInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="group relative">
      <div className="glass-input flex items-center rounded-full px-5 h-14 transition-all duration-300">
        {icon && (
          <span className="material-symbols-outlined text-slate-400 mr-3">
            {icon}
          </span>
        )}
        <input
          type={isPassword && showPassword ? "text" : type}
          className="bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder:text-slate-400 w-full text-base focus:ring-0 p-0 h-full font-medium"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            className="text-primary hover:text-blue-700 transition-colors focus:outline-none flex items-center justify-center ml-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}






