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
      address: quote.address,
      postalCode: quote.postalCode,
      city: quote.city,
      propertyType: quote.propertyType,
      rooms: quote.rooms,
      description: quote.description,
      totalAmount: quote.totalAmount ? Number(quote.totalAmount) : null,
      validUntil: quote.validUntil?.toISOString() || null,
      status: quote.status === "SENT" ? "VIEWED" : quote.status,
      signed: quote.signed,
      signedAt: quote.signedAt?.toISOString() || null,
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ophalen van de offerte" },
      { status: 500 }
    );
  }
}
