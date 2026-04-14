// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";

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
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <Navbar />

          <main className="mx-auto max-w-4xl px-6 py-10">
            <div className="rounded-3xl bg-card p-8 shadow-(--shadow)">
              {children}
            </div>
          </main>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
