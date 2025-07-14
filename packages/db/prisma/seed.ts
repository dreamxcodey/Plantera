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
      image: "https://hips.hearstapps.com/hmg-prod/images/patio-plants-croton-64386fb5f3901.jpg?crop=0.668xw:1.00xh;0.206xw,0&resize=980:*",
    },
  });

  const subcategory = await prisma.subcategory.upsert({
    where: { slug: "large-plants" },
    update: {},
    create: {
      name: "Large Plants",
      slug: "large-plants",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ21nKw39banY4l64JJ-XDbElvjwO3X0i8DHg&s",
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
      name: "Neem Plant (Azadirachta indica)",
      slug: "neem-plant",
      defaultPrice: 499,
      mrp: 799,
      stock: 20,
      shortDescription: "Large medicinal plant with natural pest resistance",
      fullDescription:
        "The Neem plant is known for its medicinal properties and natural pest resistance. This large specimen comes in a 12-inch pot and stands 3-4 feet tall. Ideal for outdoor gardens in warm climates.",
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

  // ✅ Fixed images key + using create instead of createMany
  const sizes = [
    {
      dimension: "8x10",
      label: "small",
      price: 99,
      stock: 10,
      productId: neemProduct.id,
      images: [
        "https://m.media-amazon.com/images/I/41cUNNALHWL.jpg",
        "https://m.media-amazon.com/images/I/713i7wgMS2L._SL1000_.jpg",
      ],
    },
    {
      dimension: "15x16",
      label: "medium",
      price: 259,
      stock: 15,
      productId: neemProduct.id,
      images: [
        "https://www.toothmountainnursery.com/wp-content/uploads/2020/03/Neem.jpg",
        "https://manbhawannursery.in/cdn/shop/files/neem-tree-507.webp?v=1742824601",
      ],
    },
    {
      dimension: "21x21",
      label: "large",
      price: 599,
      stock: 5,
      productId: neemProduct.id,
      images: [
        "https://m.media-amazon.com/images/I/517SDVgeO2L.jpg",
      ],
    },
  ];

  for (const size of sizes) {
    await prisma.productSize.create({ data: size });
  }

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
  .then(() => console.log("🌱 Seed completed successfully"))
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
