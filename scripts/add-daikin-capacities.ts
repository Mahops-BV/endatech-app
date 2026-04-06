import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Daikin series with their actual capacities and heating values
const DAIKIN_SERIES: {
  seriesName: string;
  type: string;
  capacities: { cool: number; heat: number }[];
  imageUrl: string;
  descBase: string;
}[] = [
  {
    seriesName: "Perfera",
    type: "Wand",
    capacities: [
      { cool: 2.0, heat: 2.5 },
      { cool: 2.5, heat: 2.8 },
      { cool: 3.5, heat: 4.0 },
      { cool: 4.2, heat: 5.4 },
      { cool: 5.0, heat: 5.8 },
      { cool: 6.0, heat: 7.0 },
      { cool: 7.1, heat: 8.2 },
    ],
    imageUrl: "/products/daikin-perfera.jpg",
    descBase: "Perfera | Serie: FTXM | Met sensor",
  },
  {
    seriesName: "Stylish",
    type: "Wand",
    capacities: [
      { cool: 2.0, heat: 2.5 },
      { cool: 2.5, heat: 3.0 },
      { cool: 3.5, heat: 4.0 },
      { cool: 4.2, heat: 5.0 },
      { cool: 5.0, heat: 5.8 },
    ],
    imageUrl: "/products/daikin-stylish.jpg",
    descBase: "Stylish | Serie: FTXA | Design wandmodel",
  },
  {
    seriesName: "Emura",
    type: "Wand",
    capacities: [
      { cool: 2.5, heat: 3.2 },
      { cool: 3.5, heat: 4.0 },
      { cool: 5.0, heat: 5.8 },
    ],
    imageUrl: "/products/daikin-emura.jpg",
    descBase: "Emura | Serie: FTXJ | Design serie",
  },
  {
    seriesName: "Comfora",
    type: "Wand",
    capacities: [
      { cool: 2.0, heat: 2.5 },
      { cool: 2.5, heat: 2.8 },
      { cool: 3.5, heat: 4.0 },
      { cool: 5.0, heat: 5.8 },
      { cool: 7.1, heat: 8.2 },
    ],
    imageUrl: "/products/daikin-comfora.jpg",
    descBase: "Comfora | Serie: FTXP | Budget serie",
  },
  {
    seriesName: "Ururu Sarara",
    type: "Wand",
    capacities: [
      { cool: 2.5, heat: 3.6 },
      { cool: 3.5, heat: 5.0 },
      { cool: 5.0, heat: 6.3 },
    ],
    imageUrl: "/products/daikin-ururu-sarara.jpg",
    descBase: "Ururu Sarara | Serie: FTXZ | Topmodel A+++",
  },
  {
    seriesName: "Perfera Vloer",
    type: "Vloer & Plafond",
    capacities: [
      { cool: 2.5, heat: 3.2 },
      { cool: 3.5, heat: 4.2 },
      { cool: 5.0, heat: 5.8 },
    ],
    imageUrl: "/products/daikin-perfera-vloer.jpg",
    descBase: "Perfera Vloer | Serie: FVXM | Vloermodel",
  },
];

async function main() {
  // 1. Delete old Daikin products (ones without coolingCapacity)
  const deleted = await prisma.aircoModel.deleteMany({
    where: { brand: "Daikin" },
  });
  console.log(`Deleted ${deleted.count} old Daikin products`);

  // 2. Create new Daikin products with real capacities
  let created = 0;
  for (const series of DAIKIN_SERIES) {
    for (const cap of series.capacities) {
      const model = `${series.seriesName} ${cap.cool} kW`;
      await prisma.aircoModel.upsert({
        where: { brand_model: { brand: "Daikin", model } },
        create: {
          brand: "Daikin",
          model,
          type: series.type,
          coolingCapacity: `${cap.cool} kW`,
          heatingCapacity: `${cap.heat} kW`,
          description: series.descBase,
          imageUrl: series.imageUrl,
          active: true,
        },
        update: {
          type: series.type,
          coolingCapacity: `${cap.cool} kW`,
          heatingCapacity: `${cap.heat} kW`,
          description: series.descBase,
          imageUrl: series.imageUrl,
        },
      });
      created++;
      console.log(`  + Daikin ${model}`);
    }
  }

  console.log(`\nCreated ${created} Daikin products with capacities`);
  const total = await prisma.aircoModel.count();
  console.log(`Total products: ${total}`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
