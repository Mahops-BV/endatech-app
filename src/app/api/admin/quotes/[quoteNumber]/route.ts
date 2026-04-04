import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return session === process.env.ADMIN_SESSION_SECRET;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ quoteNumber: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const { quoteNumber } = await params;
  const quote = await prisma.quote.findUnique({ where: { quoteNumber } });

  if (!quote) {
    return NextResponse.json({ error: "Offerte niet gevonden" }, { status: 404 });
  }

  return NextResponse.json({
    ...quote,
    totalAmount: quote.totalAmount ? Number(quote.totalAmount) : null,
    validUntil: quote.validUntil?.toISOString() ?? null,
    signedAt: quote.signedAt?.toISOString() ?? null,
    createdAt: quote.createdAt.toISOString(),
    updatedAt: quote.updatedAt.toISOString(),
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ quoteNumber: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }

  const { quoteNumber } = await params;
  const body = await request.json();

  const { description, totalAmount, validUntil, status } = body as {
    description?: string;
    totalAmount?: number | null;
    validUntil?: string | null;
    status?: string;
  };

  const quote = await prisma.quote.findUnique({ where: { quoteNumber } });
  if (!quote) {
    return NextResponse.json({ error: "Offerte niet gevonden" }, { status: 404 });
  }

  const updated = await prisma.quote.update({
    where: { quoteNumber },
    data: {
      ...(description !== undefined && { description: description || null }),
      ...(totalAmount !== undefined && { totalAmount: totalAmount ?? null }),
      ...(validUntil !== undefined && {
        validUntil: validUntil ? new Date(validUntil) : null,
      }),
      ...(status !== undefined && { status: status as never }),
    },
  });

  return NextResponse.json({
    ...updated,
    totalAmount: updated.totalAmount ? Number(updated.totalAmount) : null,
    validUntil: updated.validUntil?.toISOString() ?? null,
    signedAt: updated.signedAt?.toISOString() ?? null,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  });
}
