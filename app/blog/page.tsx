import BackHomeButton from "@/app/components/BackHomeButton";
import { BlogIndex } from "@/app/components/blog/BlogIndex";

import { blogConfig } from "./posts";

export default function BlogPage() {
  return (
    <div className="space-y-4">
      <BackHomeButton />
      <BlogIndex config={blogConfig} />
    </div>
  );
}
