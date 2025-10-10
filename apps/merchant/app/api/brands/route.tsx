// app/api/brands/route.ts
import { NextResponse } from 'next/server';
import prisma from '@repo/db'; // adjust this path if needed

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();

    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    console.error("Error fetching brands:", error);

    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}
