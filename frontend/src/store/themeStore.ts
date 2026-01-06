import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  // Check if dark mode was previously saved, otherwise default to true
  isDark: localStorage.getItem('theme') !== 'light', 

  toggleTheme: () => set((state) => {
    const newTheme = !state.isDark;
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    return { isDark: newTheme };
  }),
}));