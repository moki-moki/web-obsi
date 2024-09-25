'use client';
import { createContext, useContext, useState } from 'react';

interface ThemeContextI {
  theme: string;
  switchTheme: (newTheme: string) => void;
}

const DEFAULT_CONTEXT_VALUE = {
  theme: '',
};

const ThemeContext = createContext<ThemeContextI>(DEFAULT_CONTEXT_VALUE as ThemeContextI);

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('');

  const switchTheme = (newTheme: string) => {
    setTheme(newTheme);

    document.documentElement.className = newTheme;
  };

  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>;
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeContext must be used within a main layout');
  }

  return context;
};
