"use server";

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const goal = formData.get("goal") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !goal || !message) {
    return { ok: false, error: "Please fill in all fields." };
  }

  if (!resend) {
    return {
      ok: false,
      error:
        "Email service is not configured. Add RESEND_API_KEY to your environment variables.",
    };
  }

  try {
    await resend.emails.send({
      from: "Arbaz Arif Coaching <onboarding@resend.dev>",
      to: "m.arbazarif@gmail.com",
      subject: `New Coaching Application — ${name}`,
      html: `
        <h2>New Coaching Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Goal:</strong> ${goal}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    });

    return { ok: true };
  } catch (err) {
    console.error("Resend error:", err);
    return { ok: false, error: "Failed to send email. Please try again." };
  }
}
