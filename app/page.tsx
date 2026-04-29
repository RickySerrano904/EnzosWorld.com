// app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="space-y-6">
      {/* Hero */}
      <section
        className="
          rounded-3xl
          border
          border-border
          bg-card
          p-8
          shadow-(--shadow)
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enzo&apos;s World
              <span className="block text-secondary">where its all about Enzo!</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-foreground/80">
              The official website dedicated to everyone&apos;s favorite golden retriever,
              Enzo - toy enthusiast, professional snack eater, and lover of playtime.
            </p>
          </div>

          {/* Enzo photo card */}
          <div
            className="
              mx-auto
              w-full
              max-w-sm
              md:mx-0
            "
          >
            <div
              className="
                relative
                aspect-square
                overflow-hidden
                rounded-3xl
                border
                border-border
                bg-card
                shadow-(--shadow)
              "
            >
              <Image
                src="/images/home/homeImage.jpg"
                alt="Enzo the golden retriever"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 90vw, 384px"
              />

              {/* Caption overlay */}
              <div
                className="
                  absolute
                  bottom-0
                  w-full
                  bg-background/80
                  p-4
                  backdrop-blur
                "
              >
                <p className="text-sm font-semibold">Enzo</p>
                <p className="text-xs text-foreground/70">CEO of Snacks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          // emoji="📸"
          title="Gallery 📸"
          text="A collection of photos showcasing Enzo's adventures and mischievous moments."
          href="/gallery"
          // pill="soft chaos"
        />
        <FeatureCard
          // emoji="🛍️"
          title="Merch 🛍️"
          text="A collection of Enzo-approved merchandise for his most devoted fans."
          href="/merch"
          // pill="drip (but dog)"
        />
        <FeatureCard
          // emoji="📝"
          title="Blog 📝"
          text="Hard-hitting journalism: snack reviews, nap reports, and scandal updates."
          href="/blog"
          // pill="breaking woofs"
        />
      </section>

      {/* Testimonials */}
      <section
        className="
          rounded-3xl
          border
          border-border
          bg-card
          p-8
          shadow-(--shadow)
        "
      >
        <h2 className="text-2xl font-bold">What people are saying</h2>
        <p className="mt-2 text-foreground/70">
          Totally real reviews from totally real sources.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Quote
            who="The Couch"
            text="I haven't had peace since he arrived. 10/10 would be sat on again."
          />
          <Quote
            who="A Tennis Ball"
            text="He said 'one last throw' and I haven't seen daylight in weeks."
          />
          <Quote
            who="The Leash"
            text="Every walk begins with optimism. It ends with negotiations."
          />
        </div>
      </section>

      {/* Call to action */}
      <section
        className="
          group
          rounded-3xl
          border
          border-border
          bg-(--accent)/18
          p-8
          transition
          hover:-translate-y-0.5
          hover:shadow-lg
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h2 className="text-2xl font-bold">Want the full Enzo experience?</h2>
            <p className="mt-2 text-foreground/75">
              Start with the gallery, then read the blog, then pretend you bought merch.
              In that order. Enzo insists.
            </p>
          </div>

          <Link
            href="/gallery"
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-secondary/55
              bg-secondary
              px-6
              py-3
              text-sm
              font-semibold
              text-card
              shadow-[0_8px_18px_rgba(217,130,43,0.22)]
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:border-primary/70
              group-hover:bg-primary
              group-hover:text-foreground
              group-hover:shadow-[0_0_0_1px_rgba(217,130,43,0.28),0_10px_22px_rgba(217,130,43,0.26),0_0_24px_rgba(241,198,106,0.34)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-secondary/45
              active:scale-[0.99]
              md:w-auto
            "
          >
            <span>Begin Tour</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}



function FeatureCard({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        shadow-(--shadow)
        transition
        hover:-translate-y-0.5
        hover:shadow-lg
      "
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/75">{text}</p>

      <p
        className="
          mt-4
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-primary/25
          bg-(--primary)/22
          px-3
          py-1
          text-sm
          font-semibold
          text-foreground/90
          shadow-none
          transition-all
          duration-300
          group-hover:-translate-y-0.5
          group-hover:border-secondary/45
          group-hover:bg-(--primary)/30
          group-hover:text-secondary
          group-hover:shadow-[0_0_0_1px_rgba(217,130,43,0.25),0_8px_18px_rgba(241,198,106,0.22),0_0_22px_rgba(217,130,43,0.32)]
        "
      >
        <span>Explore</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      </p>
    </Link>
  );
}

function Quote({ who, text }: { who: string; text: string }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-5">
      <p className="text-sm text-foreground/80">&ldquo;{text}&rdquo;</p>
      <p className="mt-3 text-sm font-semibold">&mdash; {who}</p>
    </div>
  );
}

