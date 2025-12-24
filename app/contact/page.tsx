"use client";

import { useMemo, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type Topic =
  | "Gallery submission"
  | "Blog idea"
  | "Merch suggestion"
  | "General Enzo business";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<Topic>("Gallery submission");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      !sending &&
      name.trim().length >= 2 &&
      email.trim().includes("@") &&
      message.trim().length >= 10 &&
      !!turnstileToken
    );
  }, [name, email, message, sending, turnstileToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          website,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Failed to send message.");
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setTopic("Gallery submission");
      setMessage("");
      setWebsite("");
      setTurnstileToken("");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Contact Enzo&apos;s Team <span className="text-secondary">📞</span>
        </h1>
        <p className="text-foreground/70">
          Submit photos, pitch a blog idea, or report urgent snack-related incidents.
        </p>
      </header>

      {submitted && (
        <section className="rounded-3xl border border-border bg-(--accent)/18 p-8">
          <p className="text-sm font-semibold">✅ Message received!</p>
          <p className="mt-1 text-sm text-foreground/75">
            Enzo&apos;s assistant will respond in 2–3 business belly rubs.
          </p>
        </section>
      )}

      {/* Matches About: small cards grid */}
      <section className="grid gap-6 md:grid-cols-2">
        <InfoCard
          title="Enzo’s Office Hours"
          emoji="🕘"
          text={
            <>
              Mon–Fri: 9am–5pm (nap adjusted) <br />
              Sat–Sun: “Out of office” (fetch)
            </>
          }
        />
        <InfoCard
          title="What can you send?"
          emoji="🤔"
          text={
            <>
          Feel free to submit photos for the gallery, blog ideas, story requests,
           merch suggestions, or any general questions for Enzo’s humans.            
          </>
          }
        />
      </section>

      {/* Matches About: big section card */}
      <section className="rounded-3xl border border-border bg-card p-8 shadow-(--shadow)">
        <h2 className="text-2xl font-bold">Send a message</h2>
        <p className="mt-2 text-foreground/70">
          Required fields: name, email, message.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Honeypot */}
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sophie"
                required
                minLength={2}
                maxLength={80}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--primary)/40"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sophiecat@catlook.com"
                type="email"
                required
                maxLength={254}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--primary)/40"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-semibold">Topic</span>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as Topic)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--primary)/40"
            >
              <option>Gallery submission</option>
              <option>Blog idea</option>
              <option>Merch suggestion</option>
              <option>General Enzo business</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold">Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Example: Enzo achieved a new personal record of 7 zoomies in one minute..."
              rows={6}
              required
              minLength={10}
              maxLength={5000}
              className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--primary)/40"
            />
          </label>

          {/* Turnstile: isolated so it can't mess with shadow compositing */}
          <div className="pt-2">
            <div className="relative isolate z-0 rounded-2xl border border-border bg-background p-3">
              <div className="max-w-full overflow-x-auto">
                <div className="flex justify-center">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => setTurnstileToken("")}
                    options={{ theme: "auto" }}
                  />
                </div>
              </div>
            </div>

            <p className="mt-2 text-xs text-foreground/60">
              {turnstileToken
                ? "Human verified ✅"
                : "Please complete the verification to enable sending."}
            </p>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send message"}
            </button>

            <span className="text-xs text-foreground/60">
              {canSubmit
                ? "Ready to send 🐾"
                : "Add a name, a valid email, a longer message, and verify."}
            </span>
          </div>
        </form>
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
  text: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-(--shadow)">
      <div className="text-3xl">{emoji}</div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <div className="mt-2 text-sm text-foreground/75">{text}</div>
    </div>
  );
}
