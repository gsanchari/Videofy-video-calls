import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("videofy-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("videofy-theme", theme);
    set({ theme });
  },
}));