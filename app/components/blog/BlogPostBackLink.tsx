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
    <div className="relative -mt-4 mb-2 px-1">
      <Link
        href={basePath}
        className="group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground/60 uppercase transition-colors duration-300 hover:text-secondary"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        >
          &larr;
        </span>
        <span>{label}</span>
      </Link>
    </div>
  );
}
