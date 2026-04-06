import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, defaultTheme, normalizeTheme } from '@/lib/theme/config';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      setTheme: (theme) => {
        const normalizedTheme = normalizeTheme(theme);
        // 更新 DOM 属性
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', normalizedTheme);
        }
        set({ theme: normalizedTheme });
      },
    }),
    {
      name: 'binbox-theme',
      onRehydrateStorage: () => (state) => {
        // 在客户端重新加载时应用主题
        if (state && typeof document !== 'undefined') {
          const normalizedTheme = normalizeTheme(state.theme);
          document.documentElement.setAttribute('data-theme', normalizedTheme);
          state.theme = normalizedTheme;
        }
      },
    }
  )
);
