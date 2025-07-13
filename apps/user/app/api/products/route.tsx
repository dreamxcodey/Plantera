import prisma from '@repo/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      defaultPrice,
      mrp,
      taxInfo,
      stock,
      shortDescription,
      fullDescription,
      specifications,
      images,
      tags,
      categoryId,
      subcategoryId,
      userId,
      brandId,
      sizes,
      newCategory,
      newSubcategory,
    } = body;

    let finalCategoryId = categoryId ? parseInt(categoryId) : undefined;
    let finalSubcategoryId = subcategoryId ? parseInt(subcategoryId) : undefined;

    // Create category if needed
    if (!finalCategoryId && newCategory) {
      const catSlug = newCategory.toLowerCase().replace(/\s+/g, '-');
      const existingCat = await prisma.category.findUnique({ where: { slug: catSlug } });

      const category = existingCat || await prisma.category.create({
        data: {
          name: newCategory,
          slug: catSlug,
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

    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        defaultPrice: defaultPrice ? parseFloat(defaultPrice) : undefined,
        mrp: mrp ? parseFloat(mrp) : undefined,
        taxInfo,
        stock: parseInt(stock),
        shortDescription,
        fullDescription,
        specifications: specifications ? JSON.stringify(specifications) : undefined,
        images,
        tags,
        categoryId: finalCategoryId!,
        subcategoryId: finalSubcategoryId!,
        userId: parseInt(userId),
        brandId: brandId ? parseInt(brandId) : undefined,
      },
    });

    // Create Product Sizes
    if (sizes && Array.isArray(sizes)) {
      for (const size of sizes) {
        await prisma.productSize.create({
          data: {
            dimension: size.dimension,
            label: size.label,
            price: parseFloat(size.price),
            images: size.images || [],
            stock: size.stock ? parseInt(size.stock) : 0,
            productId: product.id,
          },
        });
      }
    }

    // Create Specifications (mapped to Attribute model)
    if (specifications && Array.isArray(specifications)) {
      for (const spec of specifications) {
        await prisma.attribute.create({
          data: {
            name: spec.key,
            value: spec.value,
            productId: product.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error('Error creating product:', err);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
