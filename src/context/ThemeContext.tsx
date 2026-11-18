"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface LightingTheme {
  id: string;
  name: string;
  color: string;
  rgb: string;
  temp: string;
  badge: string;
  glow: string;
}

export const LIGHTING_THEMES: LightingTheme[] = [
  {
    id: "tungsten",
    name: "Tungsten 3200K",
    color: "#D4AF37",
    rgb: "212, 175, 55",
    temp: "3200K Quartz",
    badge: "Warm Cinema",
    glow: "rgba(212, 175, 55, 0.35)",
  },
  {
    id: "daylight",
    name: "Daylight 5600K",
    color: "#60A5FA",
    rgb: "96, 165, 250",
    temp: "5600K Clean",
    badge: "Commercial",
    glow: "rgba(96, 165, 250, 0.35)",
  },
  {
    id: "sunset",
    name: "Warm Amber 2800K",
    color: "#F59E0B",
    rgb: "245, 158, 11",
    temp: "2800K Amber",
    badge: "Golden Hour",
    glow: "rgba(245, 158, 11, 0.35)",
  },
  {
    id: "neutral",
    name: "Studio Neutral",
    color: "#E2E8F0",
    rgb: "226, 232, 240",
    temp: "6500K Neutral",
    badge: "Monochrome",
    glow: "rgba(226, 232, 240, 0.25)",
  },
];

interface ThemeContextType {
  activeTheme: LightingTheme;
  setThemeById: (id: string) => void;
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  activePromptQuery: string;
  setActivePromptQuery: (q: string) => void;
  openConciergeWithPrompt: (prompt: string) => void;
  // Backward compatibility alias for any existing caller
  isByteBotOpen: boolean;
  setIsByteBotOpen: (open: boolean) => void;
  openByteBotWithPrompt: (prompt: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: LIGHTING_THEMES[0],
  setThemeById: () => {},
  isConciergeOpen: false,
  setIsConciergeOpen: () => {},
  activePromptQuery: "",
  setActivePromptQuery: () => {},
  openConciergeWithPrompt: () => {},
  isByteBotOpen: false,
  setIsByteBotOpen: () => {},
  openByteBotWithPrompt: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<LightingTheme>(LIGHTING_THEMES[0]);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [activePromptQuery, setActivePromptQuery] = useState("");

  const setThemeById = (id: string) => {
    const found = LIGHTING_THEMES.find((t) => t.id === id);
    if (found) {
      setActiveTheme(found);
    }
  };

  const openConciergeWithPrompt = (prompt: string) => {
    setActivePromptQuery(prompt);
    setIsConciergeOpen(true);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--theme-color", activeTheme.color);
      root.style.setProperty("--theme-color-rgb", activeTheme.rgb);
      root.style.setProperty("--theme-glow", `0 0 30px ${activeTheme.glow}`);
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setThemeById,
        isConciergeOpen,
        setIsConciergeOpen,
        activePromptQuery,
        setActivePromptQuery,
        openConciergeWithPrompt,
        // Backward-compatibility aliases
        isByteBotOpen: isConciergeOpen,
        setIsByteBotOpen: setIsConciergeOpen,
        openByteBotWithPrompt: openConciergeWithPrompt,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
