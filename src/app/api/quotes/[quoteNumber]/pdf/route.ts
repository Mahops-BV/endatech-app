import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateQuotePDF } from "@/lib/pdf";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ quoteNumber: string }> }
) {
  try {
    const { quoteNumber } = await params;
    const url = new URL(request.url);
    const phone = url.searchParams.get("phone");

    if (!phone) {
      return NextResponse.json({ error: "Telefoonnummer is vereist" }, { status: 400 });
    }

    const quote = await prisma.quote.findUnique({
      where: { quoteNumber },
      include: { lines: { orderBy: { sortOrder: "asc" } } },
    });

    if (!quote || !normalizePhone(quote.phone).endsWith(normalizePhone(phone).slice(-4))) {
      return NextResponse.json({ error: "Offerte niet gevonden" }, { status: 404 });
    }

    // Only allow PDF download for sent/viewed/signed quotes
    if (quote.status === "PENDING") {
      return NextResponse.json({ error: "Offerte is nog in behandeling" }, { status: 403 });
    }

    const pdfBuffer = generateQuotePDF({
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

    const filename = quote.signed
      ? `EndaTech-Overeenkomst-${quote.quoteNumber}.pdf`
      : `EndaTech-Offerte-${quote.quoteNumber}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het genereren van de PDF" },
      { status: 500 }
    );
  }
}

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, "").replace(/^\+31/, "0");
}
