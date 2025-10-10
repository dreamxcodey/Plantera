
import prisma from '@repo/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany();
  const allTags = [...new Set(products.flatMap(p => p.tags))];
  return NextResponse.json(allTags);
}
