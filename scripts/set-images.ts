import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Map: brand + description keywords -> image path
const IMAGE_RULES: { brand: string; match: (desc: string, type: string, model: string) => boolean; image: string }[] = [
  // === GREE ===
  { brand: "Gree", match: (d, t) => d.includes("Fairy") && t === "Wand", image: "/products/gree-fairy.png" },
  { brand: "Gree", match: (d, t) => d.includes("Clivia") && t === "Wand", image: "/products/gree-clivia.jpg" },
  { brand: "Gree", match: (d, t) => d.includes("Airy") && t === "Wand", image: "/products/gree-airy.png" },
  { brand: "Gree", match: (d, t) => d.includes("Charmo") && t === "Wand", image: "/products/gree-charmo.png" },
  { brand: "Gree", match: (_, t) => t === "Console", image: "/products/gree-console.png" },
  { brand: "Gree", match: (_, t) => t === "Cassette", image: "/products/gree-cassette.png" },
  { brand: "Gree", match: (_, t) => t === "Kanaal", image: "/products/gree-kanaal.png" },
  { brand: "Gree", match: (_, t) => t === "Vloer/Plafond", image: "/products/gree-vloerplafond.png" },
  { brand: "Gree", match: (d, t) => t === "Buitenunit" && d.includes("Free Match"), image: "/products/gree-multi-buitenunit.png" },
  { brand: "Gree", match: (_, t) => t === "Buitenunit", image: "/products/gree-buitenunit.png" },
  { brand: "Gree", match: (_, t) => t === "Dakairco", image: "/products/gree-lomo.png" },
  // Fallback Gree wand (Free Match indoor wand units)
  { brand: "Gree", match: (_, t) => t === "Wand", image: "/products/gree-fairy.png" },

  // === DAIKIN ===
  { brand: "Daikin", match: (_, __, m) => m.includes("Stylish"), image: "/products/daikin-stylish.webp" },
  { brand: "Daikin", match: (_, __, m) => m.includes("Emura"), image: "/products/daikin-emura.webp" },
  { brand: "Daikin", match: (_, __, m) => m.includes("Perfera Vloer"), image: "/products/daikin-perfera.webp" },
  { brand: "Daikin", match: (_, __, m) => m.includes("Perfera"), image: "/products/daikin-perfera.webp" },
  { brand: "Daikin", match: (_, __, m) => m.includes("Ururu"), image: "/products/daikin-ururu-sarara.webp" },
  { brand: "Daikin", match: (_, __, m) => m.includes("Comfora"), image: "/products/daikin-comfora.webp" },

  // === LG ===
  { brand: "LG", match: () => true, image: "/products/lg-wand.jpg" },

  // === MITSUBISHI HEAVY ===
  { brand: "Mitsubishi Heavy", match: (_, t) => t === "Wand", image: "/products/mitsubishi-heavy-wand.png" },
  { brand: "Mitsubishi Heavy", match: (_, t) => t === "Vloer", image: "/products/mitsubishi-heavy-wand.png" },
  { brand: "Mitsubishi Heavy", match: (_, t) => t === "Kanaal", image: "/products/gree-kanaal.png" },
  { brand: "Mitsubishi Heavy", match: (_, t) => t === "Buitenunit", image: "/products/gree-buitenunit.png" },

  // === MITSUBISHI ELECTRIC ===
  { brand: "Mitsubishi Electric", match: (_, t) => t === "Wand", image: "/products/mitsubishi-heavy-wand.png" },
  { brand: "Mitsubishi Electric", match: (_, t) => t === "Cassette", image: "/products/gree-cassette.png" },
  { brand: "Mitsubishi Electric", match: (_, t) => t === "Vloer", image: "/products/gree-vloerplafond.png" },
  { brand: "Mitsubishi Electric", match: (_, t) => t === "Buitenunit", image: "/products/gree-buitenunit.png" },

  // === MITSUI ===
  { brand: "Mitsui", match: (_, t) => t === "Wand", image: "/products/mitsui-wand.jpg" },
  { brand: "Mitsui", match: (_, t) => t === "Cassette", image: "/products/mitsui-commercieel.jpg" },
  { brand: "Mitsui", match: (_, t) => t === "Kanaal", image: "/products/mitsui-commercieel.jpg" },
  { brand: "Mitsui", match: (_, t) => t === "Vloer/Plafond", image: "/products/mitsui-commercieel.jpg" },
  { brand: "Mitsui", match: (_, t) => t === "Console", image: "/products/mitsui-commercieel.jpg" },
  { brand: "Mitsui", match: (_, t) => t === "Kolom", image: "/products/mitsui-commercieel.jpg" },
  // Mitsui fallback
  { brand: "Mitsui", match: () => true, image: "/products/mitsui-wand.jpg" },
];

async function main() {
  const allModels = await prisma.aircoModel.findMany();
  console.log(`Updating images for ${allModels.length} models...`);

  let updated = 0;
  for (const m of allModels) {
    const desc = m.description || "";
    const rule = IMAGE_RULES.find((r) => r.brand === m.brand && r.match(desc, m.type, m.model));
    if (rule) {
      await prisma.aircoModel.update({
        where: { id: m.id },
        data: { imageUrl: rule.image },
      });
      updated++;
    }
  }

  console.log(`Done: ${updated} models updated with images`);
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
