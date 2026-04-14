"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: Theme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : prefersDark
          ? "dark"
          : "light";

    setTheme(initialTheme);
    document.documentElement.className = initialTheme;
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.className = newTheme;
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return { theme, toggleTheme, mounted };
}
