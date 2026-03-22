import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener cócteles por categoría
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty')
    const search = searchParams.get('search')

    // Construir filtros
    const where: any = {
      category: category.toUpperCase()
    }
    
    if (difficulty && difficulty !== 'all') {
      where.difficulty = difficulty.toUpperCase()
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Obtener cócteles
    const cocktails = await prisma.cocktail.findMany({
      where,
      include: {
        instructions: {
          orderBy: { step: 'asc' }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(cocktails.map(normalizeImageRecord))

  } catch (error) {
    console.error('Error obteniendo cócteles por categoría:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
