import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create user
  const user = await prisma.user.create({
    data: {
      email: 'seller@example.com',
      password: 'securepassword', // hash in production!
      role: 'SELLER',
    },
  });

  // Create category
  const category = await prisma.category.create({
    data: {
      name: 'Trees',
    },
  });

  // Create subcategories
  const avenue = await prisma.subcategory.create({
    data: {
      name: 'Avenue',
      categoryId: category.id,
    },
  });

  const shade = await prisma.subcategory.create({
    data: {
      name: 'Shade',
      categoryId: category.id,
    },
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Neem',
        price: 50.0,
        stock: 100,
        description: 'Medicinal Avenue Tree',
        image: 'neem.jpg',
        subcategoryId: avenue.id,
        userId: user.id,
      },
      {
        name: 'Gulmohar',
        price: 70.0,
        stock: 50,
        description: 'Beautiful Avenue Tree',
        image: 'gulmohar.jpg',
        subcategoryId: avenue.id,
        userId: user.id,
      },
      {
        name: 'Banyan',
        price: 90.0,
        stock: 30,
        description: 'Large shade tree',
        image: 'banyan.jpg',
        subcategoryId: shade.id,
        userId: user.id,
      },
    ],
  });

  console.log('🌱 Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
