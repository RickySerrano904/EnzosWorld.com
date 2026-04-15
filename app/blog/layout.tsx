import { BlogPostNav } from "@/app/components/blog/BlogPostNav";

import { blogConfig } from "./posts";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="space-y-10">
      {children}
      <BlogPostNav basePath={blogConfig.basePath} posts={blogConfig.posts} />
    </article>
  );
}
