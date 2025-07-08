import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const seller = await prisma.user.upsert({
    where: { email: "seller@example.com" },
    update: {},
    create: {
      email: "seller@example.com",
      password: "securepassword123",
      role: "SELLER",
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: "outdoor-plants" },
    update: {},
    create: {
      name: "Outdoor Plants",
      slug: "outdoor-plants",
    },
  });

  const subcategory = await prisma.subcategory.upsert({
    where: { slug: "large-plants" },
    update: {},
    create: {
      name: "Large Plants",
      slug: "large-plants",
      categoryId: category.id,
    },
  });

  const brand = await prisma.brand.upsert({
    where: { slug: "greenlife" },
    update: {},
    create: {
      name: "GreenLife",
      slug: "greenlife",
    },
  });

  const neemProduct = await prisma.product.upsert({
    where: { slug: "neem-plant" },
    update: {},
    create: {
      name: "Neem Plant",
      slug: "neem-plant",
      price: 499,
      mrp: 799,
      stock: 20,
      shortDescription: "Large medicinal plant with natural pest resistance",
      fullDescription:
        "The Neem plant is known for its medicinal properties and natural pest resistance. This large specimen comes in a 12-inch pot and stands 3-4 feet tall. Ideal for outdoor gardens in warm climates.",
      images: [
        "https://as1.ftcdn.net/v2/jpg/03/11/32/18/1000_F_311321897_oeJUWMM0PhaR3HqpPtWPMGh6BW0746bi.jpg",
        "https://m.media-amazon.com/images/I/61QTnZ3ldLL._UF1000,1000_QL80_.jpg",
      ],
      tags: ["neem", "outdoor", "large", "medicinal"],
      userId: seller.id,
      categoryId: category.id,
      subcategoryId: subcategory.id,
      brandId: brand.id,
      taxInfo: "Inclusive of all taxes",
      specifications: {
        height: "3-4 feet",
        potSize: "12 inches",
        sunlight: "Full sun",
        watering: "Moderate",
        careLevel: "Easy",
      },
    },
  });

  await prisma.attribute.createMany({
    data: [
      { name: "Plant Type", value: "Tree", productId: neemProduct.id },
      { name: "Growth Rate", value: "Fast", productId: neemProduct.id },
      { name: "Flowering", value: "Seasonal", productId: neemProduct.id },
      { name: "Air Purifying", value: "Yes", productId: neemProduct.id },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        title: "Healthy Plant!",
        comment: "Arrived in perfect condition. Growing well after 2 months.",
        productId: neemProduct.id,
        userId: seller.id,
      },
      {
        rating: 4,
        title: "Good quality",
        comment:
          "Leaves were slightly damaged during shipping but plant recovered quickly.",
        productId: neemProduct.id,
        userId: seller.id,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("🌱 Seed completed successfully");
  })
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
