import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener todas las cervezas
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

    const [beers, total] = await Promise.all([
      prisma.beer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.beer.count({ where })
    ])

    const normalizedBeers = beers.map(normalizeImageRecord)

    return NextResponse.json({
      beers: normalizedBeers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error obteniendo cervezas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva cerveza
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
      ibu,
      origin,
      state,
      servingTemp,
      price,
      isCraft,
      tastingNotes,
      color,
      aroma,
      flavor,
      pairing,
      glassType
    } = body

    // Validar datos requeridos
    if (!name || !brand || !type || !category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear cerveza
    const beer = await prisma.beer.create({
      data: {
        name,
        brand,
        type,
        category,
        description,
        image,
        imageKey,
        abv: abv ? parseFloat(abv) : null,
        ibu: ibu ? parseInt(ibu) : null,
        origin,
        state,
        servingTemp,
        price: price ? parseFloat(price) : null,
        isCraft: isCraft || false,
        isPremium: isCraft || false,
        tastingNotes,
        color,
        aroma,
        flavor,
        pairing,
        glassType,
        rating: 4.0
      }
    })

    return NextResponse.json(normalizeImageRecord(beer), { status: 201 })

  } catch (error) {
    console.error('Error creando cerveza:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
