import { NextRequest, NextResponse } from "next/server";
import { getBrand } from '@/lib/brand';
import { sendCustomerConfirmation, sendInternalNotifications } from '@/lib/email/sendgrid';

async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
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
      projectType,
      timeline,
      message,
      details,
      property,
      estimatedCloseDate,
      city,
      turnstileToken,
      'cf-turnstile-response': cfTurnstileToken,
    } = body;

    const token = turnstileToken || cfTurnstileToken;
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!token) {
        return NextResponse.json(
          { error: "Turnstile token is required" },
          { status: 400 }
        );
      }

      const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined;
      const turnstileValid = await verifyTurnstile(token, ip);

      if (!turnstileValid) {
        return NextResponse.json(
          { error: "Turnstile verification failed" },
          { status: 400 }
        );
      }
    }

    // Send to Zapier
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
            projectType: projectType || service || "",
            timeline: timeline || "",
            details: details || message || "",
            property: property || "",
            estimatedCloseDate: estimatedCloseDate || "",
            city: city || "",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (zapierError) {
        console.error("Zapier webhook error:", zapierError);
      }
    }

    // Send emails via SendGrid template
    const brand = getBrand();
    const lead = {
      name: String(name || ''),
      email: String(email || ''),
      phone: phone ? String(phone).replace(/\D/g, '') : undefined,
      phone_plain: phone ? String(phone).replace(/\D/g, '') : undefined,
      projectType: String(projectType || service || '1031 Exchange Project'),
      property: property ? String(property) : undefined,
      estimatedCloseDate: estimatedCloseDate ? String(estimatedCloseDate) : undefined,
      city: city ? String(city) : undefined,
      company: company ? String(company) : undefined,
      timeline: timeline ? String(timeline) : undefined,
      message: message ? String(message) : (details ? String(details) : undefined),
    };

    const brandWithDate = {
      ...brand,
      submitted_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    try {
      await Promise.all([
        sendCustomerConfirmation(brandWithDate, lead),
        sendInternalNotifications(brandWithDate, lead),
      ]);
      console.log('SendGrid emails sent successfully to:', email);
    } catch (error) {
      console.error("SendGrid email failed", error);
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
