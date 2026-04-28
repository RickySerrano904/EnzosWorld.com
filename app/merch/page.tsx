import { ExternalLink, ShoppingBag } from "lucide-react";
import BackHomeButton from "@/app/components/BackHomeButton";

const shopUrl = "https://shop.enzosworld.com";

export default function MerchPage() {
  return (
    <main className="space-y-8">
      <BackHomeButton />

      <section className="rounded-3xl border border-border bg-card p-8 shadow-(--shadow)">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--primary)/25 text-secondary">
            <ShoppingBag className="h-7 w-7" aria-hidden="true" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Enzo Merch
            </h1>
            <p className="text-base text-foreground/75 sm:text-lg">
              Official Enzo merch is live. Go take a look 👀
            </p>
          </div>

          <a
            href={shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-secondary/55 bg-secondary px-6 py-3 text-sm font-semibold text-card shadow-[0_8px_18px_rgba(217,130,43,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary hover:text-foreground hover:shadow-[0_0_0_1px_rgba(217,130,43,0.28),0_10px_22px_rgba(217,130,43,0.26),0_0_24px_rgba(241,198,106,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/45 active:scale-[0.99] sm:w-auto"
          >
            <span>Shop Enzo Merch</span>
            <ExternalLink
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          <p className="text-sm text-foreground/60">{shopUrl}</p>
        </div>
      </section>
    </main>
  );
}
