// app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="space-y-10">
      {/* Hero */}
      <section className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Enzo&apos;s World
              <span className="block text-[var(--secondary)]">
                where its all about Enzo!
              </span>
            </h1>

            <p className="max-w-xl text-lg text-foreground/80">
              The official website dedicated to everyone&apos;s favorite golden
              retriever, Enzo — toy enthusiast, professional snack eater, and
              lover of playtime.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-full bg-[var(--secondary)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.99]"
              >
                📸 View the Gallery
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition hover:bg-[var(--primary)]/20 active:scale-[0.99]"
              >
                ✍️ Read the Blog
              </Link>
            </div>
          </div>

          {/* Enzo photo card */}
          <div className="w-full max-w-sm">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow)]">
              <Image
                src="/placeholder.jpg"
                alt="Enzo the golden retriever"
                fill
                className="object-cover"
                priority
              />

              {/* Caption overlay */}
              <div className="absolute bottom-0 w-full bg-background/80 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Enzo</p>
                <p className="text-xs text-foreground/70">
                  CEO of Snacks · Head of Naps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          emoji="📸"
          title="Gallery"
          text="Evidence that Enzo is, objectively, the most photogenic creature alive."
          href="/gallery"
          pill="soft chaos"
        />
        <FeatureCard
          emoji="🛍️"
          title="Merch"
          text='Absolutely necessary items like "Enzo Approved" everything.'
          href="/merch"
          pill="drip (but dog)"
        />
        <FeatureCard
          emoji="📝"
          title="Blog"
          text="Hard-hitting journalism: snack reviews, nap reports, and scandal updates."
          href="/blog"
          pill="breaking woofs"
        />
      </section>

      {/* Testimonials */}
      <section className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow)]">
        <h2 className="text-2xl font-bold">What people are saying</h2>
        <p className="mt-2 text-foreground/70">
          Totally real reviews from totally real sources.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Quote
            who="The Couch"
            text="I haven’t had peace since he arrived. 10/10 would be sat on again."
          />
          <Quote
            who="A Tennis Ball"
            text="He said 'one last throw' and I haven’t seen daylight in weeks."
          />
          <Quote
            who="The Leash"
            text="Every walk begins with optimism. It ends with negotiations."
          />
        </div>
      </section>

      {/* Call to action */}
      <section className="rounded-3xl border border-border bg-[var(--accent)]/18 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Want the full Enzo experience?</h2>
            <p className="mt-2 text-foreground/75">
              Start with the gallery, then read the blog, then pretend you bought
              merch. In that order. Enzo insists.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:brightness-95 active:scale-[0.99]"
          >
            🐶 Begin the Tour
          </Link>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  emoji,
  title,
  text,
  href,
  pill,
}: {
  emoji: string;
  title: string;
  text: string;
  href: string;
  pill: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-3xl">{emoji}</div>
        <span className="rounded-full bg-[var(--primary)]/25 px-3 py-1 text-xs font-medium">
          {pill}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/75">{text}</p>
      <p className="mt-4 text-sm font-semibold text-[var(--secondary)]">
        Explore →{" "}
        <span className="opacity-0 transition group-hover:opacity-100">🐾</span>
      </p>
    </Link>
  );
}

function Quote({ who, text }: { who: string; text: string }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-5">
      <p className="text-sm text-foreground/80">“{text}”</p>
      <p className="mt-3 text-sm font-semibold">— {who}</p>
    </div>
  );
}
