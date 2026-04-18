import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return session === process.env.ADMIN_SESSION_SECRET;
}

function generateQuoteNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  return `END-${year}-${random}`;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      quoteNumber: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      postalCode: true,
      city: true,
      propertyType: true,
      rooms: true,
      notes: true,
      description: true,
      totalAmount: true,
      validUntil: true,
      signed: true,
      signedAt: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(
    quotes.map((q) => ({
      ...q,
      totalAmount: q.totalAmount ? Number(q.totalAmount) : null,
      validUntil: q.validUntil?.toISOString() ?? null,
      signedAt: q.signedAt?.toISOString() ?? null,
      createdAt: q.createdAt.toISOString(),
      updatedAt: q.updatedAt.toISOString(),
    }))
  );
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name, email, phone, address, postalCode, city,
      propertyType, rooms, notes,
      description, validUntil, status, btwPercentage,
      lines,
    } = body as {
      name: string; email: string; phone: string;
      address: string; postalCode: string; city: string;
      propertyType: string; rooms: string; notes?: string;
      description?: string; validUntil?: string | null;
      status?: string; btwPercentage?: number;
      lines?: { productName: string; description?: string; quantity: number; unitPrice: number }[];
    };

    if (!name || !email || !phone || !address || !postalCode || !city || !propertyType || !rooms) {
      return NextResponse.json(
        { error: "Vul alle verplichte klantgegevens in" },
        { status: 400 }
      );
    }

    let quoteNumber = generateQuoteNumber();
    let exists = await prisma.quote.findUnique({ where: { quoteNumber } });
    while (exists) {
      quoteNumber = generateQuoteNumber();
      exists = await prisma.quote.findUnique({ where: { quoteNumber } });
    }

    const filledLines = (lines ?? []).filter((l) => l.productName.trim());
    const totalAmount = filledLines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);

    const quote = await prisma.quote.create({
      data: {
        quoteNumber,
        name, email, phone, address, postalCode, city,
        propertyType, rooms,
        notes: notes || null,
        photos: [],
        description: description || null,
        totalAmount: filledLines.length > 0 ? totalAmount : null,
        btwPercentage: btwPercentage ?? 21,
        validUntil: validUntil ? new Date(validUntil) : null,
        status: (status as never) ?? "PENDING",
        lines: filledLines.length > 0 ? {
          create: filledLines.map((l, i) => ({
            productName: l.productName,
            description: l.description || null,
            quantity: l.quantity,
            unitPrice: l.unitPrice,
            lineTotal: l.quantity * l.unitPrice,
            sortOrder: i,
          })),
        } : undefined,
      },
    });

    return NextResponse.json({ success: true, quoteNumber: quote.quoteNumber });
  } catch (error) {
    console.error("Error creating admin quote:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het aanmaken van de offerte" },
      { status: 500 }
    );
  }
}
