import { NextRequest, NextResponse } from 'next/server'
import prisma from '@repo/db'

export async function POST(req: NextRequest) {
  try {

    const { name, price, stock, description, image, categories } = await req.json()

    // Validate input
    if (!name || !price || !categories?.length) {
      return NextResponse.json(
        { message: 'Name, price and categories are required' },
        { status: 400 }
      )
    }

    // Create product with categories
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        description: description || null,
        image: image || null,
        sellerId: 0,
        categories: {
          create: categories.map((categoryId: number) => ({
            category: { connect: { id: categoryId } }
          }))
        }
      },
      include: { categories: true }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          include: { category: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
