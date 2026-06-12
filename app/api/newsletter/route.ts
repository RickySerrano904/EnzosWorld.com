import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function hasControlChars(value: string) {
  return /[\r\n\0]/.test(value);
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
  if (!secret) {
    return { ok: false, error: "Server not configured (missing Turnstile secret)." };
  }

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

    const website = String(body.website ?? "").trim();
    if (website) {
      return NextResponse.json({ ok: true });
    }

    const email = String(body.email ?? "").trim().toLowerCase();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const turnstileToken = String(body.turnstileToken ?? "").trim();

    if (!turnstileToken) {
      return NextResponse.json({ error: "Please complete the verification." }, { status: 400 });
    }

    if (hasControlChars(email) || hasControlChars(firstName) || hasControlChars(lastName)) {
      return NextResponse.json({ error: "Invalid characters." }, { status: 400 });
    }

    if (firstName.length < 1 || firstName.length > 80) {
      return NextResponse.json({ error: "First name is invalid." }, { status: 400 });
    }

    if (lastName.length < 1 || lastName.length > 80) {
      return NextResponse.json({ error: "Last name is invalid." }, { status: 400 });
    }

    if (!isValidEmail(email) || email.length > 254) {
      return NextResponse.json({ error: "Email looks invalid." }, { status: 400 });
    }

    const ts = await verifyTurnstile(turnstileToken, getClientIp(req));
    if (!ts.ok) {
      return NextResponse.json({ error: ts.error }, { status: 403 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

    if (!resendApiKey || !segmentId) {
      return NextResponse.json(
        { error: "Server not configured (missing newsletter env vars)." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const existingContact = await resend.contacts.get({ email });
    if (existingContact.data) {
      const update = await resend.contacts.update({
        email,
        firstName,
        lastName,
        unsubscribed: false,
        properties: {
          source: "blog",
        },
      });

      if (update.error) {
        return NextResponse.json(
          { error: "Could not update your subscription. Please try again." },
          { status: 502 }
        );
      }
    } else if (existingContact.error && existingContact.error.name === "not_found") {
      const createContact = await resend.contacts.create({
        email,
        firstName,
        lastName,
        unsubscribed: false,
        properties: {
          source: "blog",
        },
      });

      if (createContact.error) {
        return NextResponse.json(
          { error: "Could not sign you up. Please try again." },
          { status: 502 }
        );
      }
    } else if (existingContact.error) {
      return NextResponse.json(
        { error: "Could not check your subscription. Please try again." },
        { status: 502 }
      );
    }

    const contactSegments = await resend.contacts.segments.list({ email });
    if (contactSegments.error) {
      return NextResponse.json(
        { error: "Could not check newsletter segments. Please try again." },
        { status: 502 }
      );
    }

    const alreadyInSegment = contactSegments.data.data.some((segment) => segment.id === segmentId);

    if (!alreadyInSegment) {
      const addSegment = await resend.contacts.segments.add({ email, segmentId });
      if (addSegment.error) {
        return NextResponse.json(
          { error: "Could not add you to the newsletter. Please try again." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
