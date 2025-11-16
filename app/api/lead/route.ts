import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY is not set");
}
if (!process.env.TURNSTILE_SECRET_KEY) {
  console.warn("TURNSTILE_SECRET_KEY is not set");
}
if (!process.env.ZAPIER_WEBHOOK_URL) {
  console.warn("ZAPIER_WEBHOOK_URL is not set");
}

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    return true;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      service,
      timeline,
      message,
      details,
      turnstileToken,
    } = body;

    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Turnstile token is required" },
          { status: 400 }
        );
      }

      const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "";
      const turnstileValid = await verifyTurnstile(turnstileToken, ip);

      if (!turnstileValid) {
        return NextResponse.json(
          { error: "Turnstile verification failed" },
          { status: 400 }
        );
      }
    }

    const emailContent = `
New 1031 Exchange Lead

Name: ${name}
${company ? `Company: ${company}` : ""}
Email: ${email}
Phone: ${phone}
Project Type: ${service || "Not specified"}
${timeline ? `Timeline: ${timeline}` : ""}

${details || message ? `Details:\n${details || message}` : ""}
    `.trim();

    const emailHtml = `
      <h2>New 1031 Exchange Lead</h2>
      <p><strong>Name:</strong> ${name}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Project Type:</strong> ${service || "Not specified"}</p>
      ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ""}
      ${details || message ? `<p><strong>Details:</strong></p><p>${(details || message || "").replace(/\n/g, "<br>")}</p>` : ""}
    `;

    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_TO_EMAIL) {
      await sgMail.send({
        to: process.env.SENDGRID_TO_EMAIL,
        from: process.env.SENDGRID_FROM_EMAIL || "noreply@1031exchangedenver.com",
        subject: `New 1031 Exchange Lead: ${name}`,
        text: emailContent,
        html: emailHtml,
      });
    }

    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            company: company || "",
            projectType: service || "",
            timeline: timeline || "",
            details: details || message || "",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (zapierError) {
        console.error("Zapier webhook error:", zapierError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}

