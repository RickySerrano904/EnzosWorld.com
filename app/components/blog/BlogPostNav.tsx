"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { BlogPostMeta } from "./types";

type BlogPostNavProps = {
  basePath: `/${string}`;
  posts: BlogPostMeta[];
};

function getPostSlug(pathname: string, basePath: string) {
  const routeSegments = pathname.split("/").filter(Boolean);
  const baseSegments = basePath.split("/").filter(Boolean);

  const isPostRoute =
    routeSegments.length === baseSegments.length + 1 &&
    baseSegments.every((segment, index) => routeSegments[index] === segment);

  return isPostRoute ? routeSegments[routeSegments.length - 1] : null;
}

export function BlogPostNav({ basePath, posts }: BlogPostNavProps) {
  const pathname = usePathname();
  const slug = getPostSlug(pathname, basePath);
  if (!slug) return null;

  const currentIndex = posts.findIndex((post) => post.slug === slug);
  if (currentIndex === -1) return null;

  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <nav className="grid min-w-0 gap-3 pt-10 sm:grid-cols-2">
      {prevPost ? (
        <Link
          href={`${basePath}/${prevPost.slug}`}
          className="group min-w-0 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-(--shadow) transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="shrink-0 text-xl transition-transform duration-300 group-hover:-translate-x-1 group-hover:-rotate-6 group-hover:scale-110"
              aria-hidden="true"
            >
              &larr;
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wider text-foreground/60">
                Previous
              </p>
              <p className="truncate text-sm font-bold">{prevPost.title}</p>
            </div>
          </div>

          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-primary/15">
            <div className="h-full w-1/3 translate-x-[301%] rounded-full bg-primary/60 transition-transform duration-500 group-hover:-translate-x-[20%]" />
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextPost ? (
        <Link
          href={`${basePath}/${nextPost.slug}`}
          className="group min-w-0 overflow-hidden rounded-3xl border border-border bg-card p-5 text-right shadow-(--shadow) transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="flex min-w-0 items-center justify-end gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wider text-foreground/60">
                Next
              </p>
              <p className="truncate text-sm font-bold">{nextPost.title}</p>
            </div>

            <span
              className="shrink-0 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-6 group-hover:scale-110"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </div>

          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-primary/15">
            <div className="h-full w-1/3 -translate-x-full rounded-full bg-primary/60 transition-transform duration-500 group-hover:translate-x-[220%]" />
          </div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
