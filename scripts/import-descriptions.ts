import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

interface JsonProduct {
  name: string;
  short_description: string;
  long_description: string;
  properties: {
    brand: string;
    model_code: string | null;
    product_line: string;
    [key: string]: unknown;
  };
}

function mapBrand(brand: string): string {
  if (brand === "Mitsubishi Heavy Industries") return "Mitsubishi Heavy";
  return brand;
}

async function main() {
  const jsonPath = path.join(__dirname, "..", "airco_producten_complete.json");
  if (!fs.existsSync(jsonPath)) {
    console.error("File not found: " + jsonPath);
    console.error("Please place airco_producten_complete.json in the project root.");
    process.exit(1);
  }

  const raw: JsonProduct[] = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log("Loaded " + raw.length + " products from JSON");

  // Get all DB products
  const dbProducts = await prisma.aircoModel.findMany();
  console.log("Database has " + dbProducts.length + " products\n");

  let updated = 0;
  let notFound = 0;

  for (const jp of raw) {
    if (!jp.properties.model_code) continue;

    const brand = mapBrand(jp.properties.brand);
    const code = jp.properties.model_code;

    // Fix encoding issues in descriptions
    const shortDesc = jp.short_description
      .replace(/Â±/g, "±")
      .replace(/â/g, "–")
      .replace(/Â²/g, "²");
    const longDesc = jp.long_description
      .replace(/Â±/g, "±")
      .replace(/â/g, "–")
      .replace(/Â²/g, "²");

    // Find matching DB product(s) - model contains the model_code
    const matches = dbProducts.filter(
      (m) => m.brand === brand && m.model.includes(code.substring(0, Math.min(code.length, 18)))
    );

    if (matches.length === 0) {
      // Try partial match (first 12 chars)
      const partial = dbProducts.filter(
        (m) => m.brand === brand && m.model.includes(code.substring(0, 12))
      );
      if (partial.length === 0) {
        notFound++;
        continue;
      }
      for (const m of partial) {
        await prisma.aircoModel.update({
          where: { id: m.id },
          data: { shortDescription: shortDesc, longDescription: longDesc },
        });
        updated++;
      }
    } else {
      for (const m of matches) {
        await prisma.aircoModel.update({
          where: { id: m.id },
          data: { shortDescription: shortDesc, longDescription: longDesc },
        });
        updated++;
      }
    }
  }

  console.log("Updated: " + updated);
  console.log("Not found in DB: " + notFound);

  // Check how many still have no description
  const noDesc = await prisma.aircoModel.count({ where: { longDescription: null } });
  console.log("Products without long description: " + noDesc);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
