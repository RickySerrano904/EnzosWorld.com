"use client";

import { useMemo, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { CheckCircle2, LoaderCircle, Mail, Send } from "lucide-react";

type SubmissionState = "idle" | "success" | "error";

export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const canSubmit = useMemo(() => {
    return (
      !sending &&
      firstName.trim().length >= 1 &&
      lastName.trim().length >= 1 &&
      email.trim().includes("@") &&
      !!turnstileToken
    );
  }, [email, firstName, lastName, sending, turnstileToken]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState("idle");
    setMessage("");
    setSending(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          website,
          turnstileToken,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setSubmissionState("error");
        setMessage(data.error ?? "Could not sign you up. Please try again.");
        return;
      }

      setSubmissionState("success");
      setMessage("You're on the list for Enzo's monthly field report.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setWebsite("");
      setTurnstileToken("");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="rounded-3xl border border-border bg-(--accent)/18 p-6 shadow-(--shadow) sm:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-secondary">
            <Mail aria-hidden="true" className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">Monthly Enzo dispatch</h2>
          <p className="text-sm text-foreground/75">
            Get the latest blog posts, gallery updates, and snack-adjacent news once a
            month.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-semibold">First name</span>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enzo"
                required
                maxLength={80}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--primary)/40"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold">Last name</span>
              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Fan"
                required
                maxLength={80}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--primary)/40"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-semibold">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="enzo.fan@example.com"
              type="email"
              required
              maxLength={254}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-(--primary)/40"
            />
          </label>

          <div className="rounded-2xl border border-border bg-background/80 p-3">
            {turnstileSiteKey ? (
              <div className="max-w-full overflow-x-auto">
                <div className="flex justify-center">
                  <Turnstile
                    siteKey={turnstileSiteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => setTurnstileToken("")}
                    options={{ theme: "auto" }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-foreground/65">
                Newsletter signup needs the Turnstile site key configured.
              </p>
            )}
          </div>

          {message && (
            <p
              className={
                submissionState === "error"
                  ? "text-sm font-semibold text-red-600"
                  : "inline-flex items-center gap-2 text-sm font-semibold text-secondary"
              }
            >
              {submissionState === "success" ? (
                <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              ) : null}
              <span>{message}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {sending ? (
              <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <Send aria-hidden="true" className="h-4 w-4" />
            )}
            <span>{sending ? "Signing up..." : "Sign up"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
