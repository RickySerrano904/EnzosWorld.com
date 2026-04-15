import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogConfig } from "./types";

type BlogIndexProps = {
  config: BlogConfig;
};

export function BlogIndex({ config }: BlogIndexProps) {
  const readLabel = config.readLabel ?? "Read";

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="inline-block">{config.title}</span>{" "}
          {config.titleIcon ? (
            <span className="text-secondary">{config.titleIcon}</span>
          ) : null}
        </h1>
        <p className="text-foreground/70">{config.description}</p>
      </header>

      <ul className="grid gap-4">
        {config.posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`${config.basePath}/${post.slug}`}
              className="group block rounded-3xl border border-border bg-card p-5 shadow-(--shadow) transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border/70">
                    <Image
                      src={post.thumbnailSrc}
                      alt={post.thumbnailAlt ?? post.title}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <h2 className="blog-card-title truncate text-lg font-bold transition-all duration-300 group-hover:text-secondary">
                      {post.title}
                    </h2>
                    <p className="text-sm text-foreground/60">{post.date}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-(--primary)/22 px-3 py-1 text-xs font-semibold text-foreground/90 shadow-none transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-secondary/45 group-hover:bg-(--primary)/30 group-hover:text-secondary group-hover:shadow-[0_0_0_1px_rgba(217,130,43,0.25),0_8px_18px_rgba(241,198,106,0.22),0_0_22px_rgba(217,130,43,0.32)]">
                  <span>{readLabel}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
