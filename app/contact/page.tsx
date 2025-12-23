"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Topic = "Gallery submission" | "Blog idea" | "Merch suggestion" | "General Enzo business";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<Topic>("Gallery submission");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && email.trim().includes("@") && message.trim().length >= 10;
  }, [name, email, message]);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Fake submit: just show success + reset
  //   setSubmitted(true);

  //   // Keep it cute, but also clear form state
  //   setName("");
  //   setEmail("");
  //   setTopic("Gallery submission");
  //   setMessage("");
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setSubmitted(false);

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, topic, message }),
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
};


  return (


    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Contact Enzo&apos;s Team <span className="text-[var(--secondary)]">📃</span>
        </h1>
        <p className="text-foreground/70">
          Submit photos, pitch a blog idea, or report urgent snack-related incidents.
        </p>
      </header>

      {/* Success banner */}
      {submitted && (
        <section className="rounded-3xl border border-border bg-[var(--accent)]/18 p-6">
          <p className="text-sm font-semibold">✅ Message received!</p>
          <p className="mt-1 text-sm text-foreground/75">
            Enzo&apos;s assistant will respond in 2–3 business belly rubs.
          </p>
        </section>
      )}

      <section className="grid gap-6 md:grid-cols-3">
        {/* Form */}
        <div className="md:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow)]">
          <h2 className="text-2xl font-bold">Send a message</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Required fields: name, email, message.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold">Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="sophie"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sophiecat@catlook.com"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-semibold">Topic</span>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as Topic)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
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
                className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
              />
            </label>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center justify-center rounded-full bg-[var(--secondary)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send message
              </button>

              <span className="text-xs text-foreground/60">
                {canSubmit
                  ? "Ready to send 🐾"
                  : "Add a name, a valid email, and a longer message to enable sending."}
              </span>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <aside className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow)] space-y-6">
          <div>
            <h3 className="text-lg font-bold">Enzo&apos;s Office Hours</h3>
            <p className="mt-2 text-sm text-foreground/70">
              Mon–Fri: 9am–5pm (nap adjusted) <br />
              Sat–Sun: “Out of office” (fetch)
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background p-5">
            <h4 className="text-sm font-bold">Submission checklist</h4>
            <ul className="mt-3 space-y-2 text-sm text-foreground/75">
              <li>✅ Photo of Enzo (preferably doing something ridiculous)</li>
              <li>✅ Short caption</li>
              <li>✅ Year (for sorting)</li>
              <li>✅ Optional: snack rating</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-[var(--accent)]/18 p-5">
            <p className="text-sm font-semibold">Emergency?</p>
            <p className="mt-2 text-sm text-foreground/75">
              If Enzo is out of treats, please remain calm and proceed directly to the kitchen.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
