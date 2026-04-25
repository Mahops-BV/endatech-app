import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { generateQuotePDF } from "@/lib/pdf";
import { sendQuoteReadyNotification } from "@/lib/email";

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return session === process.env.ADMIN_SESSION_SECRET;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ quoteNumber: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const { quoteNumber } = await params;
  const body = await request.json().catch(() => ({}));
  const overrideEmail = typeof body.email === "string" ? body.email.trim() : "";

  const quote = await prisma.quote.findUnique({
    where: { quoteNumber },
    include: { lines: { orderBy: { sortOrder: "asc" } } },
  });

  if (!quote) {
    return NextResponse.json({ error: "Offerte niet gevonden" }, { status: 404 });
  }

  const recipient = overrideEmail || quote.email;
  if (!EMAIL_RE.test(recipient)) {
    return NextResponse.json({ error: "Ongeldig e-mailadres" }, { status: 400 });
  }

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = generateQuotePDF({
      quoteNumber: quote.quoteNumber,
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      address: quote.address,
      postalCode: quote.postalCode,
      city: quote.city,
      propertyType: quote.propertyType,
      rooms: quote.rooms,
      description: quote.description,
      totalAmount: quote.totalAmount ? Number(quote.totalAmount) : null,
      btwPercentage: Number(quote.btwPercentage),
      validUntil: quote.validUntil?.toISOString() ?? null,
      status: quote.status,
      signed: quote.signed,
      signedAt: quote.signedAt?.toISOString() ?? null,
      signature: quote.signature,
      signedIp: quote.signedIp,
      signedDevice: quote.signedDevice,
      signedLocation: quote.signedLocation,
      lines: quote.lines.map((l) => ({
        productName: l.productName,
        description: l.description,
        quantity: l.quantity,
        unitPrice: Number(l.unitPrice),
        lineTotal: Number(l.lineTotal),
      })),
      createdAt: quote.createdAt.toISOString(),
    });
  } catch (err) {
    console.error("PDF generatie mislukt:", err);
    return NextResponse.json({ error: "PDF genereren mislukt" }, { status: 500 });
  }

  try {
    await sendQuoteReadyNotification(recipient, {
      name: quote.name,
      quoteNumber: quote.quoteNumber,
      phone: quote.phone,
      pdfBuffer,
    });
  } catch (err) {
    console.error("E-mail versturen mislukt:", err);
    const message = err instanceof Error ? err.message : "Onbekende fout";
    return NextResponse.json(
      { error: `E-mail versturen mislukt: ${message}` },
      { status: 502 }
    );
  }

  if (quote.status === "PENDING") {
    await prisma.quote.update({
      where: { quoteNumber },
      data: { status: "SENT" },
    });
  }

  return NextResponse.json({ success: true, sentTo: recipient });
}
