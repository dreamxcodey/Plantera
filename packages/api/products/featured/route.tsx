// app/api/products/featured/route.ts
import prisma from '@repo/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 4,
      include: {
        sizes: {
          orderBy: {
            price: 'asc',
          },
        },
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products with sizes:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
