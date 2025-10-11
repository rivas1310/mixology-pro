import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener todos los cócteles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    // Construir filtros
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (difficulty && difficulty !== 'all') {
      where.difficulty = difficulty
    }
    
    if (featured === 'true') {
      where.isFeatured = true
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
      ],
      ...(limit && { take: parseInt(limit) })
    })

    return NextResponse.json(cocktails)

  } catch (error) {
    console.error('Error obteniendo cócteles:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
