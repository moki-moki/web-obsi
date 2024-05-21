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

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === "myData" && e.newValue) {
      setState(JSON.parse(e.newValue));
    }
  };

  useEffect(() => {
    console.log("state changed");
    localStorage.setItem(key, JSON.stringify(state));

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [state, key]);

  return [state, setState, setValue] as [T, typeof setState, any];
}
