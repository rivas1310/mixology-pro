import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener todos los licores
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')

    // Construir filtros
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category.toUpperCase()
    }
    
    if (type && type !== 'all') {
      if (type === 'premium') {
        where.isPremium = true
      } else if (type === 'standard') {
        where.isPremium = false
      }
    }
    
    if (featured === 'true') {
      where.isPremium = true
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Obtener licores
    const spirits = await prisma.spirit.findMany({
      where,
      orderBy: [
        { isPremium: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
      ...(limit && { take: parseInt(limit) })
    })

    return NextResponse.json({
      spirits,
      count: spirits.length
    })

  } catch (error) {
    console.error('Error obteniendo licores:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
