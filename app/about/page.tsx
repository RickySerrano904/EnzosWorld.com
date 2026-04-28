// app/about/page.tsx
import BackHomeButton from "@/app/components/BackHomeButton";

export default function AboutPage() {
  return (

    <main className="space-y-6">
      <BackHomeButton />

      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          About <span className="text-secondary">📃</span>
        </h1>
        <p className="text-foreground/70">
          This is a website dedicated to Enzo — a professional snack enthusiast, 
          part-time chaos gremlin, and full-time best boy.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <InfoCard
          title="Who is Enzo?"
          emoji="🐶"
          text="Golden retriever. Legendary fluff. Lover of belly rubs."
        />
        <InfoCard
          title="What is this site?"
          emoji="🎪"
          text="A cozy, playful corner of the internet for photos, enzo merch, and blog posts written by Enzo himself."
        />
        <InfoCard
          title="Is the merch real?"
          emoji="🛍️"
          text="Yes. Enzo has gone professional, and the official shop is open."
        />
      </section>

      <section className="rounded-3xl border border-border bg-card p-8 shadow-(--shadow)">
        <h2 className="text-2xl font-bold">Enzo&apos;s Certified Stats</h2>
        <p className="mt-2 text-foreground/70">
          Verified by the board.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Snack Radar" value="Elite" />
          <Stat label="Zoomies" value="Random" />
          <Stat label="Fetch Skill" value="Dependent on Mood" />
          <Stat label="Bath Tolerance" value="LOVES Baths" />
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-(--accent)/18 p-8">
        <h2 className="text-2xl font-bold">Want to contribute?</h2>
        <p className="mt-2 max-w-2xl text-foreground/75">
          If you want to brighten Enzo’s day with a toy, treat, or snack, here are some ways to do it:
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://www.amazon.com/hz/wishlist/your-wishlist-id"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-secondary/55 bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(217,130,43,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary hover:text-foreground hover:shadow-[0_0_0_1px_rgba(217,130,43,0.28),0_10px_22px_rgba(217,130,43,0.26),0_0_24px_rgba(241,198,106,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/45 active:scale-[0.99]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
            >
              🎁
            </span>
            <span>Amazon Wish List</span>
          </a>

          <a
            href="https://www.chewy.com/gift-registry/your-registry-id"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary/35 bg-background/85 px-6 py-3 text-sm font-semibold text-foreground/90 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/55 hover:bg-(--primary)/25 hover:text-secondary hover:shadow-[0_0_0_1px_rgba(217,130,43,0.24),0_8px_18px_rgba(241,198,106,0.22),0_0_22px_rgba(217,130,43,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 active:scale-[0.99]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
            >
              🐾
            </span>
            <span>Chewy Gift Registry</span>
          </a>
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
    <div className="rounded-3xl border border-border bg-card p-6 shadow-(--shadow)">
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
// 
