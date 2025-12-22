import Link from "next/link";

const posts = [
  { slug: "first-post", title: "First Post" },
];

export default function BlogPage() {
  return (
    <main>
      <h1 className="text-3xl font-semibold">Blog</h1>

      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link className="hover:underline" href={`/blog/${p.slug}`}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

