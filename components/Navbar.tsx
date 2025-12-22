// components/Navbar.tsx
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-black dark:text-zinc-50"
        >
          Enzo&apos;s World
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-zinc-700 transition hover:bg-black/[.04] hover:text-black dark:text-zinc-300 dark:hover:bg-white/[.08] dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
