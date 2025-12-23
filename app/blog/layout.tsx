import PostNav from "./PostNav";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="space-y-10">
      {children}
      <PostNav />
    </article>
  );
}
