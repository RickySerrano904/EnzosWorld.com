import Link from "next/link";

import type { BlogConfig } from "./types";

type BlogIndexProps = {
  config: BlogConfig;
};

export function BlogIndex({ config }: BlogIndexProps) {
  const readLabel = config.readLabel ?? "read ->";

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          {config.title}{" "}
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
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-foreground/60">{post.date}</p>
                </div>

                <span className="rounded-full bg-(--primary)/25 px-3 py-1 text-xs font-medium text-foreground/80">
                  {readLabel}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
