import { NextResponse } from 'next/server'
import prisma from '@repo/db'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Get categories error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}


export async function POST(req: Request) {

  try {
    const body = await req.json();


    const { name } = body;

    const slug = name.toLowerCase.replace(/\s+/g, '-');

    const newCategory = await prisma.category.create({
      data: {
        name, slug,
      }
    })
    return NextResponse.json(newCategory)
  } catch (e) {
    console.log(e)
    return NextResponse.json('Error while creating new Category')
  }
}
