import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const BASE = "https://www.endatech.nl";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/offerte-aanvragen`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/producten`,           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/installatie`,         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/onderhoud-service`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/storingen`,           lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,             lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/voorwaarden`,         lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/privacy`,             lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/cookies`,             lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/verwerkingsregister`, lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await prisma.aircoModel.findMany({
      where: { active: true },
      select: { id: true, updatedAt: true },
    });
    productRoutes = products.map((p) => ({
      url: `${BASE}/producten/${p.id}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Database niet bereikbaar tijdens build — sitemap blijft werken zonder producten
  }

  return [...staticRoutes, ...productRoutes];
}
