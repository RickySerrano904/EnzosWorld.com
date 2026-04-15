"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BlogPostBackLinkProps = {
  basePath: `/${string}`;
  label?: string;
};

function isPostRoute(pathname: string, basePath: string) {
  const routeSegments = pathname.split("/").filter(Boolean);
  const baseSegments = basePath.split("/").filter(Boolean);

  return (
    routeSegments.length === baseSegments.length + 1 &&
    baseSegments.every((segment, index) => routeSegments[index] === segment)
  );
}

export function BlogPostBackLink({
  basePath,
  label = "Back to blog",
}: BlogPostBackLinkProps) {
  const pathname = usePathname();

  if (!isPostRoute(pathname, basePath)) return null;

  return (
    <div>
      <Link
        href={basePath}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/85 shadow-(--shadow) transition hover:-translate-y-0.5 hover:text-foreground hover:shadow-lg"
      >
        <span aria-hidden="true">&larr;</span>
        <span>{label}</span>
      </Link>
    </div>
  );
}
