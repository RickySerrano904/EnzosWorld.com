"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/merch", label: "Merch" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      {/* Make header a positioning context */}
      <div className="relative">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
className="text-lg sm:text-xl font-extrabold tracking-tight text-secondary"
          >
            🐾 Enzo&apos;s World
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    active
                      ? "bg-[color-mix(in_srgb,var(--primary)_28%,transparent)] text-foreground"
                      : "text-foreground/80 hover:bg-[color-mix(in_srgb,var(--primary)_25%,transparent)] hover:text-foreground",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}

            {/* Theme toggle - desktop only */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-full px-4 py-2 text-foreground/80 transition hover:bg-[color-mix(in_srgb,var(--primary)_25%,transparent)] hover:text-foreground"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            )}
          </nav>

          {/* Mobile button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile overlay + dropdown (absolute so header height never changes) */}
        {open && (
          <>
            {/* Click-away overlay */}
            <button
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Dropdown panel */}
            <div className="absolute left-0 right-0 top-full z-50 md:hidden border-b border-border bg-card shadow-(--shadow)">
              <nav className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
                <div className="grid gap-2">
                  {links.map((l) => {
                    const active = pathname === l.href;
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={[
                          "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                          active
                            ? "bg-[color-mix(in_srgb,var(--primary)_28%,transparent)] text-foreground"
                            : "text-foreground/85 hover:bg-[color-mix(in_srgb,var(--primary)_22%,transparent)] hover:text-foreground",
                        ].join(" ")}
                      >
                        {l.label}
                      </Link>
                    );
                  })}

                  {/* Theme toggle - mobile only */}
                  {mounted && (
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground/85 transition hover:bg-[color-mix(in_srgb,var(--primary)_22%,transparent)] hover:text-foreground flex items-center gap-2"
                      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    >
                      {theme === "light" ? (
                        <>
                          <Moon className="w-5 h-5" />
                          Dark Mode
                        </>
                      ) : (
                        <>
                          <Sun className="w-5 h-5" />
                          Light Mode
                        </>
                      )}
                    </button>
                  )}
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
