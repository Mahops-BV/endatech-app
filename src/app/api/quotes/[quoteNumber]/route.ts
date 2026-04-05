import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ quoteNumber: string }> }
) {
  try {
    const { quoteNumber } = await params;

    const quote = await prisma.quote.findUnique({
      where: { quoteNumber },
      include: { lines: { orderBy: { sortOrder: "asc" } } },
    });

    if (!quote) {
      return NextResponse.json(
        { error: "Offerte niet gevonden" },
        { status: 404 }
      );
    }

    // Update status to VIEWED if it was SENT
    if (quote.status === "SENT") {
      await prisma.quote.update({
        where: { quoteNumber },
        data: { status: "VIEWED" },
      });
    }

    return NextResponse.json({
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
      btwPercentage: Number(quote.btwPercentage ?? 21),
      validUntil: quote.validUntil?.toISOString() || null,
      status: quote.status === "SENT" ? "VIEWED" : quote.status,
      signed: quote.signed,
      signedAt: quote.signedAt?.toISOString() || null,
      lines: quote.lines.map((l: { productName: string; description: string | null; quantity: number; unitPrice: unknown; lineTotal: unknown }) => ({
        productName: l.productName,
        description: l.description,
        quantity: l.quantity,
        unitPrice: Number(l.unitPrice),
        lineTotal: Number(l.lineTotal),
      })),
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ophalen van de offerte" },
      { status: 500 }
    );
  }
}
