import { BlogIndex } from "@/app/components/blog/BlogIndex";

import { blogConfig } from "./posts";

export default function BlogPage() {
  return <BlogIndex config={blogConfig} />;
}
