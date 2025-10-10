import { NextResponse } from 'next/server';
import prisma from '@repo/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const categoryId = parseInt(params.id);
  const subcategories = await prisma.subcategory.findMany({
    where: { categoryId },
  });

  return NextResponse.json(subcategories);
}
