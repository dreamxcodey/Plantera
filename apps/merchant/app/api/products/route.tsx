import prisma from '@repo/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    price,
    stock,
    description,
    images,
    tags,
    categoryId,
    subcategoryId,
    userId,
    newCategory,
    newSubcategory,
  } = body;

  try {
    let finalCategoryId = categoryId ? parseInt(categoryId) : undefined;
    let finalSubcategoryId = subcategoryId ? parseInt(subcategoryId) : undefined;

    // Create category if needed
    if (!finalCategoryId && newCategory) {
      const slug = newCategory.toLowerCase().replace(/\s+/g, '-');
      const existingCat = await prisma.category.findUnique({ where: { slug } });

      const category = existingCat || await prisma.category.create({
        data: {
          name: newCategory,
          slug,
        },
      });
      finalCategoryId = category.id;
    }

    // Create subcategory if needed
    if (!finalSubcategoryId && newSubcategory && finalCategoryId) {
      const subSlug = newSubcategory.toLowerCase().replace(/\s+/g, '-');
      const existingSub = await prisma.subcategory.findFirst({
        where: {
          slug: subSlug,
          categoryId: finalCategoryId,
        },
      });

      const subcategory = existingSub || await prisma.subcategory.create({
        data: {
          name: newSubcategory,
          slug: subSlug,
          categoryId: finalCategoryId,
        },
      });
      finalSubcategoryId = subcategory.id;
    }

    // Final product creation
    const product = await prisma.product.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        images,
        tags,
        categoryId: finalCategoryId!,
        subcategoryId: finalSubcategoryId!,
        userId: parseInt(userId),
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
