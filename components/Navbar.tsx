"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-[var(--secondary)]"
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
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-full border border-border bg-background/60 px-3 py-2 text-sm font-semibold"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur">
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
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
