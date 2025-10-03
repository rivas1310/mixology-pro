import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener todos los ingredientes
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
          { description: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(category && { category })
    }

    const [ingredients, total] = await Promise.all([
      prisma.ingredient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.ingredient.count({ where })
    ])

    return NextResponse.json({
      ingredients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error obteniendo ingredientes:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo ingrediente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      category,
      description,
      image,
      imageKey,
      season,
      origin,
      nutrition,
      storage,
      shelfLife,
      isEssential
    } = body

    // Validar datos requeridos
    if (!name || !type || !category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear ingrediente
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        type,
        category,
        description,
        image,
        imageKey,
        season,
        origin,
        nutrition: nutrition ? JSON.parse(nutrition) : null,
        storage,
        shelfLife,
        isEssential: isEssential || false
      }
    })

    return NextResponse.json(ingredient, { status: 201 })

  } catch (error) {
    console.error('Error creando ingrediente:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
