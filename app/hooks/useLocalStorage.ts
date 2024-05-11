"use client";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [state, setState] = useState<T>(() => {
    if (typeof localStorage !== "undefined") {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === "myData" && e.newValue) {
      setState(JSON.parse(e.newValue));
    }
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [state, key]);

  return [state, setState] as [T, typeof setState];
}
