import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener todos los cócteles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')?.trim()

    const filters: Record<string, unknown>[] = []

    if (category && category !== 'all') {
      filters.push({ category })
    }

    if (difficulty && difficulty !== 'all') {
      filters.push({ difficulty })
    }

    if (featured === 'true') {
      filters.push({ isFeatured: true })
    }

    if (search) {
      filters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      })
    }

    const where = filters.length > 0 ? { AND: filters } : {}

    const takeRaw = limit ? parseInt(limit, 10) : 500
    const take = Number.isFinite(takeRaw)
      ? Math.min(Math.max(takeRaw, 1), 1000)
      : 500

    // Obtener cócteles
    const cocktails = await prisma.cocktail.findMany({
      where,
      include: {
        instructions: {
          orderBy: { step: 'asc' },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' },
      ],
      take,
    })

    return NextResponse.json(cocktails.map(normalizeImageRecord))

  } catch (error) {
    console.error('Error obteniendo cócteles:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
