import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener todos los licores
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''

    const skip = (page - 1) * limit

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { brand: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(category && { category })
    }

    const [spirits, total] = await Promise.all([
      prisma.spirit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.spirit.count({ where })
    ])

    return NextResponse.json({
      spirits,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error obteniendo licores:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo licor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      category,
      brand,
      description,
      image,
      imageKey,
      abv,
      origin,
      price,
      isPremium
    } = body

    // Validar datos requeridos
    if (!name || !type || !category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear licor
    const spirit = await prisma.spirit.create({
      data: {
        name,
        type,
        category,
        brand,
        description,
        image,
        imageKey,
        abv: abv ? parseFloat(abv) : null,
        origin,
        price: price ? parseFloat(price) : null,
        isPremium: isPremium || false
      }
    })

    return NextResponse.json(spirit, { status: 201 })

  } catch (error) {
    console.error('Error creando licor:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
