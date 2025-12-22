// app/blog/page.tsx
import Link from "next/link";

const posts = [
  { slug: "i-call-shotgun", title: "I Call Shotgun!", date: "April 13, 2024" },
  { slug: "the-feline-menace", title: "The Feline Menace", date: "May 06, 2024" },
  { slug: "archaeologist-enzo", title: "Archaeologist Enzo", date: "June 12, 2024" },
  { slug: "my-mistake-but-also-worth-it", title: "My Mistake, But Also Worth It", date: "July 22, 2024" },
  { slug: "smelled-everything-tasted-most-things", title: "Smelled Everything, Tasted Most Things", date: "August 25, 2024" },
  { slug: "fear-the-fluffasaurus", title: "Fear the Fluffasaurus", date: "October 31, 2024" },
  { slug: "worlds-biggest-stick", title: "World's Biggest Stick", date: "January 5, 2025" },
  { slug: "it-called-to-me", title: "It Called to Me", date: "March 12, 2025" },
  { slug: "bark-sip-repeat", title: "Bark, Sip, Repeat", date: "May 19, 2025" },
  { slug: "business-in-the-front-puddles-in-the-back", title: "Business in the Front, Puddles in the Back", date: "June 12, 2025" },
];

export default function BlogPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Blog <span className="text-[var(--secondary)]">📖</span>
        </h1>
        <p className="text-foreground/70">
          Field reports from Enzo: snacks, puddles, and local feline conflicts.
        </p>
      </header>

      <ul className="grid gap-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold group-hover:underline">
                    {p.title}
                  </h2>
                  <p className="text-sm text-foreground/60">{p.date}</p>
                </div>

                <span className="rounded-full bg-[var(--primary)]/25 px-3 py-1 text-xs font-medium text-foreground/80">
                  read →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
