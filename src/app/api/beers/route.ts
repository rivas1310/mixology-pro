import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener todas las cervezas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')

    // Construir filtros
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category.toUpperCase()
    }
    
    if (type && type !== 'all') {
      where.type = type
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Obtener cervezas
    const beers = await prisma.beer.findMany({
      where,
      orderBy: [
        { isPremium: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
      ...(limit && { take: parseInt(limit) })
    })

    const normalizedBeers = beers.map(normalizeImageRecord)

    return NextResponse.json({
      beers: normalizedBeers,
      count: beers.length
    })

  } catch (error) {
    console.error('Error obteniendo cervezas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

