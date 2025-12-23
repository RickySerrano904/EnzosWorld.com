import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Topic = "Gallery submission" | "Blog idea" | "Merch suggestion" | "General Enzo business";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const topic = String(body.topic ?? "").trim() as Topic;
    const message = String(body.message ?? "").trim();

    // Basic validation
    if (name.length < 2) {
      return NextResponse.json({ error: "Name is too short." }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Email looks invalid." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
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
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Topic: ${topic}`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
