import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const config = {
    host: process.env.SMTP_HOST || "(niet ingesteld)",
    port: process.env.SMTP_PORT || "(niet ingesteld)",
    user: process.env.SMTP_USER || "(niet ingesteld)",
    pass: process.env.SMTP_PASS ? "***SET***" : "(niet ingesteld)",
    from: process.env.SMTP_FROM || "(niet ingesteld)",
    admin: process.env.ADMIN_EMAIL || "(niet ingesteld)",
  };

  const results: Record<string, string> = { ...config };

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.verify();
    results.smtp_connection = "OK";

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || "EndaTech <info@endatech.nl>",
      to: process.env.ADMIN_EMAIL || "info@endatech.nl",
      subject: "Test vanuit Vercel — EndaTech",
      html: "<h2>Test</h2><p>Deze e-mail is verstuurd vanuit Vercel. Als je dit leest, werkt SMTP op productie.</p>",
    });

    results.email_sent = "OK";
    results.message_id = info.messageId;
    results.smtp_response = info.response;
  } catch (err: unknown) {
    const error = err as Error & { code?: string; responseCode?: number };
    results.error = error.message;
    if (error.code) results.error_code = error.code;
    if (error.responseCode) results.smtp_response_code = String(error.responseCode);
  }

  return NextResponse.json(results);
}
