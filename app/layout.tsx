// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Enzo's World",
  description: "Personal site and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 text-black dark:bg-black dark:text-zinc-50">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
      </body>
    </html>
  );
}
