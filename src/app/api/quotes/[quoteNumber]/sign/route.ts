import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
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

    if (quote.signed) {
      return NextResponse.json(
        { error: "Deze offerte is al ondertekend" },
        { status: 400 }
      );
    }

    if (quote.status === "PENDING") {
      return NextResponse.json(
        { error: "Deze offerte is nog niet gereed voor ondertekening" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { signature } = body as { signature?: string };

    // Get client IP and user agent
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Update the quote
    const updatedQuote = await prisma.quote.update({
      where: { quoteNumber },
      data: {
        signed: true,
        signedAt: new Date(),
        signedIp: ip,
        signedDevice: JSON.stringify({
          userAgent,
          timestamp: new Date().toISOString(),
        }),
        signature: signature ?? null,
        status: "SIGNED",
      },
    });

    return NextResponse.json({
      success: true,
      signedAt: updatedQuote.signedAt?.toISOString(),
    });
  } catch (error) {
    console.error("Error signing quote:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het ondertekenen" },
      { status: 500 }
    );
  }
}
