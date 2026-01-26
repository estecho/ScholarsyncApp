"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

type ViewMode = "idle" | "dragging" | "analyzing" | "quizMode";
type CurrentView = "my-day" | "campus-life";

interface NavContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  searchOverlayOpen: boolean;
  setSearchOverlayOpen: (open: boolean) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("idle");
  const [currentView, setCurrentViewState] = useState<CurrentView>(() => {
    if (typeof window !== "undefined") {
      const savedView = localStorage.getItem("homeViewPreference") as CurrentView | null;
      if (savedView && (savedView === "my-day" || savedView === "campus-life")) {
        return savedView;
      }
    }
    return "my-day";
  });
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);

  const isFirstRender = useRef(true);

  // Save view preference to localStorage when it changes (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("homeViewPreference", currentView);
  }, [currentView]);

  const setCurrentView = (view: CurrentView) => {
    setCurrentViewState(view);
  };

  return (
    <NavContext.Provider value={{ viewMode, setViewMode, currentView, setCurrentView, searchOverlayOpen, setSearchOverlayOpen }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
}

