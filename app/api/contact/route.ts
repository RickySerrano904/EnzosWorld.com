import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

type Topic =
  | "Gallery submission"
  | "Blog idea"
  | "Merch suggestion"
  | "General Enzo business";

const TOPICS = new Set<Topic>([
  "Gallery submission",
  "Blog idea",
  "Merch suggestion",
  "General Enzo business",
]);

function hasControlChars(s: string) {
  return /[\r\n\0]/.test(s);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "";
  return req.headers.get("x-real-ip") || "";
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: false, error: "Server not configured (missing Turnstile secret)." };

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });

  const data = (await resp.json()) as { success: boolean; ["error-codes"]?: string[] };

  if (!data.success) {
    return { ok: false, error: "Verification failed. Please try again." };
  }
  return { ok: true as const };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot (bots fill this)
    const website = String(body.website ?? "").trim();
    if (website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const topicRaw = String(body.topic ?? "").trim();
    const message = String(body.message ?? "").trim();
    const turnstileToken = String(body.turnstileToken ?? "").trim();

    // Turnstile required
    if (!turnstileToken) {
      return NextResponse.json({ error: "Please complete the verification." }, { status: 400 });
    }

    // Control character rejection (prevents header injection attempts)
    if (
      hasControlChars(name) ||
      hasControlChars(email) ||
      hasControlChars(topicRaw) ||
      hasControlChars(message)
    ) {
      return NextResponse.json({ error: "Invalid characters." }, { status: 400 });
    }

    // Validation + limits
    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "Name is invalid." }, { status: 400 });
    }
    if (!isValidEmail(email) || email.length > 254) {
      return NextResponse.json({ error: "Email looks invalid." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Message is invalid." }, { status: 400 });
    }

    if (!TOPICS.has(topicRaw as Topic)) {
      return NextResponse.json({ error: "Invalid topic." }, { status: 400 });
    }
    const topic = topicRaw as Topic;

    // Verify Turnstile
    const ip = getClientIp(req);
    const ts = await verifyTurnstile(turnstileToken, ip);
    if (!ts.ok) {
      return NextResponse.json({ error: ts.error }, { status: 403 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!to || !from || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Server not configured (missing email env vars)." },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Enzo Contact: ${topic} — ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Topic: ${topic}`, "", message].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
