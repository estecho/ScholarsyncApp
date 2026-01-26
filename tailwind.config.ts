import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#135bec",
        "primary-light": "#eef4ff",
        "tech-blue": "#0056D2",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "surface-light": "#ffffff",
        "surface-dark": "#1e2433",
        "card-light": "#ffffff",
        "card-dark": "#1e2433",
        "accent-purple": "#8B5CF6",
        "accent-green": "#07883b",
        "status-green": "#34C759",
        "action-red": "#ef4444",
        glass: "rgba(255, 255, 255, 0.1)",
        "glass-border": "rgba(255, 255, 255, 0.2)",
        "stress-low": "#d1fae5",
        "stress-med": "#fdba74",
        "stress-high": "#ff8a80",
        "text-main": "#0d121b",
        "text-soft": "#6b7280",
        "text-secondary": "#64748B",
        "text-sub": "#4c669a",
        success: "#07883b",
        "electric-blue": "#135bec",
      },
      fontFamily: {
        display: ["Inter", "Lexend", "sans-serif"],
        body: ["Noto Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "1.75rem",
        "4xl": "2.5rem",
        full: "9999px",
      },
      backgroundImage: {
        "soft-mesh":
          "radial-gradient(at 0% 0%, hsla(253,16%,7%,0) 0, hsla(253,16%,7%,0) 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,0) 0, hsla(225,39%,30%,0) 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,0) 0, hsla(339,49%,30%,0) 50%)",
        "light-mesh":
          "radial-gradient(at 0% 0%, rgba(19, 91, 236, 0.05) 0px, transparent 50%), radial-gradient(at 90% 10%, rgba(167, 139, 250, 0.1) 0px, transparent 50%), radial-gradient(at 50% 50%, #ffffff 0px, #ffffff 100%)",
        "electric-gradient": "linear-gradient(135deg, #135bec 0%, #3b82f6 100%)",
        "future-lab": "linear-gradient(135deg, #135bec 0%, #7c3aed 100%)",
        "future-lab-subtle": "linear-gradient(135deg, rgba(19, 91, 236, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 15px rgba(76, 127, 230, 0.5)",
        neon: "0 0 15px rgba(139, 92, 246, 0.3), 0 0 5px rgba(19, 91, 236, 0.2)",
        action: "0 4px 20px -2px rgba(239, 68, 68, 0.25)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        card: "0 4px 20px rgba(19, 91, 236, 0.08)",
        "shadow-glass": "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wave: {
          "0%, 100%": { height: "6px" },
          "50%": { height: "18px" },
        },
        pulseRed: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-in-down": "fadeInDown 0.3s ease-out forwards",
        wave: "wave 1.2s ease-in-out infinite",
        pulseRed: "pulseRed 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;


