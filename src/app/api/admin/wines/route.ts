import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener todos los vinos
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

    const [wines, total] = await Promise.all([
      prisma.wine.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.wine.count({ where })
    ])

    return NextResponse.json({
      wines,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error obteniendo vinos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo vino
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      brand,
      type,
      category,
      description,
      image,
      imageKey,
      abv,
      vintage,
      origin,
      price,
      isPremium
    } = body

    // Validar datos requeridos
    if (!name || !brand || !type || !category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear vino
    const wine = await prisma.wine.create({
      data: {
        name,
        brand,
        type,
        category,
        description,
        image,
        imageKey,
        abv: abv ? parseFloat(abv) : null,
        vintage: vintage ? parseInt(vintage) : null,
        origin,
        price: price ? parseFloat(price) : null,
        isPremium: isPremium || false
      }
    })

    return NextResponse.json(wine, { status: 201 })

  } catch (error) {
    console.error('Error creando vino:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
