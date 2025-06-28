import { PrismaClient } from "@prisma/client";
import slugify from "slugify"; // You can use this or write your own slugifier
const prisma = new PrismaClient();

async function main() {
  // 1. Create or find a SELLER user
  const seller = await prisma.user.upsert({
    where: { email: "seller@example.com" },
    update: {},
    create: {
      email: "seller@example.com",
      password: "securepassword123", // You should hash this in production
      role: "SELLER",
    },
  });

  // 2. Create Category: Outdoor Plants
  const category = await prisma.category.upsert({
    where: { slug: "outdoor-plants" },
    update: {},
    create: {
      name: "Outdoor Plants",
      slug: "outdoor-plants",
    },
  });

  // 3. Create Subcategory: Large Plants
  const subcategory = await prisma.subcategory.upsert({
    where: { slug: "large-plants" },
    update: {},
    create: {
      name: "Large Plants",
      slug: "large-plants",
      categoryId: category.id,
    },
  });

  // 4. Create Product: Neem Plant
  await prisma.product.upsert({
    where: { slug: "neem-plant" },
    update: {},
    create: {
      name: "Neem Plant",
      slug: "neem-plant",
      price: 499,
      stock: 20,
      description: "A large, healthy Neem plant suitable for outdoor gardening. Known for air purification and pest control.",
      image: "https://yourcdn.com/products/neem-plant.jpg",
      tags: ["neem", "outdoor", "large", "medicinal", "natural pesticide"],
      userId: seller.id,
      categoryId: category.id,
      subcategoryId: subcategory.id,
    },
  });
}

main()
  .then(() => {
    console.log("🌱 Seed completed");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Seed failed", e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
