"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const themeStorageKey = "theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getSavedTheme(): Theme | null {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
}

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initialTheme = getSavedTheme() ?? getSystemTheme();
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);

    const onSystemThemeChange = (event: MediaQueryListEvent) => {
      if (getSavedTheme()) return;

      const nextTheme: Theme = event.matches ? "dark" : "light";
      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    colorSchemeQuery.addEventListener("change", onSystemThemeChange);
    return () => colorSchemeQuery.removeEventListener("change", onSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
      applyTheme(newTheme);
      window.localStorage.setItem(themeStorageKey, newTheme);
      return newTheme;
    });
  };

  return { mounted, theme, toggleTheme };
}
