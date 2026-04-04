import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return session === process.env.ADMIN_SESSION_SECRET;
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
