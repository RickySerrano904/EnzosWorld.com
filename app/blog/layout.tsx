import { BlogPostBackLink } from "@/app/components/blog/BlogPostBackLink";
import { BlogPostNav } from "@/app/components/blog/BlogPostNav";

import { blogConfig } from "./posts";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="space-y-10">
      <BlogPostBackLink basePath={blogConfig.basePath} />
      {children}
      <BlogPostNav basePath={blogConfig.basePath} posts={blogConfig.posts} />
    </article>
  );
}
