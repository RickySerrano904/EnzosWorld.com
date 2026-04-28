// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

const rethinkSans = Rethink_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-rethink",
  display: "swap",
});

const themeScript = `
  (function () {
    try {
      var savedTheme = window.localStorage.getItem("theme");
      var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      var theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    } catch {
      document.documentElement.classList.add("light");
    }
  })();
`;

export const metadata: Metadata = {
  title: "Enzo's World",
  description: "A joke website dedicated to Enzo the golden retriever",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rethinkSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-3xl border border-border bg-background/70 p-8 shadow-(--shadow)">
            {children}
          </div>
        </main>

        <Analytics />
      </body>
    </html>
  );
}
