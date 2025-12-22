// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="space-y-10">
      <header className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow)]">
        <p className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/25 px-4 py-2 text-sm font-medium">
          🐾 About this extremely serious website
        </p>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
          About Enzo&apos;s World
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-foreground/80">
          This is a joke website dedicated to my sister&apos;s golden retriever,
          Enzo — a professional snack enthusiast, part-time chaos gremlin, and
          full-time best boy.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-full bg-[var(--secondary)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.99]"
          >
            📸 See the Evidence
          </Link>
          <Link
            href="/merch"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition hover:bg-[var(--primary)]/20 active:scale-[0.99]"
          >
            🛍️ Shop the Fake Merch
          </Link>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <InfoCard
          title="Who is Enzo?"
          emoji="🐶"
          text="Golden retriever. Legendary fluff. Smiles for the camera like it’s a job."
        />
        <InfoCard
          title="What is this site?"
          emoji="🎪"
          text="A cozy, playful corner of the internet for photos, fake merch, and blog posts written in Enzo’s voice."
        />
        <InfoCard
          title="Is any of this real?"
          emoji="🧾"
          text="The dog is real. The store is not. The vibe is extremely real."
        />
      </section>

      <section className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow)]">
        <h2 className="text-2xl font-bold">Enzo&apos;s Certified Stats</h2>
        <p className="mt-2 text-foreground/70">
          Verified by absolutely nobody.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Snack Radar" value="Elite" />
          <Stat label="Zoomies" value="Random" />
          <Stat label="Fetch Skill" value="Dependent on Mood" />
          <Stat label="Bath Tolerance" value="0%" />
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-background p-6">
          <h3 className="text-lg font-bold">Site navigation</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75">
            <li>
              <Link className="font-semibold text-[var(--secondary)] hover:underline" href="/gallery">
                Gallery
              </Link>{" "}
              — photos sorted by year (a.k.a. the historical record).
            </li>
            <li>
              <Link className="font-semibold text-[var(--secondary)] hover:underline" href="/blog">
                Blog
              </Link>{" "}
              — dramatic storytelling, snack updates, and puddle incidents.
            </li>
            <li>
              <Link className="font-semibold text-[var(--secondary)] hover:underline" href="/merch">
                Merch
              </Link>{" "}
              — fake store, real laughs, and a cart Enzo will absolutely fill.
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-[var(--accent)]/18 p-8">
        <h2 className="text-2xl font-bold">Want to contribute?</h2>
        <p className="mt-2 max-w-2xl text-foreground/75">
          If you have an Enzo moment, a quote, or a photo that radiates chaotic
          good-boy energy, it belongs in the gallery.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:brightness-95 active:scale-[0.99]"
          >
            ✉️ Contact
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition hover:bg-[var(--primary)]/20 active:scale-[0.99]"
          >
            🏠 Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  title,
  emoji,
  text,
}: {
  title: string;
  emoji: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow)]">
      <div className="text-3xl">{emoji}</div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/75">{text}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-5">
      <div className="text-sm text-foreground/60">{label}</div>
      <div className="mt-2 text-base font-extrabold">{value}</div>
    </div>
  );
}
