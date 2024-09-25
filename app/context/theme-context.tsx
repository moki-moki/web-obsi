'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ThemeContextI {
  theme: string;
  switchTheme: (newTheme: string) => void;
}

const DEFAULT_CONTEXT_VALUE = {
  theme: '',
};

const usersTheme = '';

const ThemeContext = createContext<ThemeContextI>(DEFAULT_CONTEXT_VALUE as ThemeContextI);

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage('usersTheme', usersTheme);

  const switchTheme = (newTheme: string) => {
    setTheme(newTheme);

    document.documentElement.className = newTheme;
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, []);

  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>;
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeContext must be used within a main layout');
  }

  return context;
};
