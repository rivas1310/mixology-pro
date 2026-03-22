import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener cóctel por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('API: Fetching cocktail with ID:', id)

    const cocktail = await prisma.cocktail.findUnique({
      where: { id },
      include: {
        instructions: {
          orderBy: { step: 'asc' }
        },
        ingredients: {
          include: {
            ingredient: true
          }
        }
      }
    })

    console.log('API: Cocktail found:', cocktail ? 'Yes' : 'No')
    if (cocktail) {
      console.log('API: Cocktail data:', {
        id: cocktail.id,
        name: cocktail.name,
        description: cocktail.description,
        image: cocktail.image,
        category: cocktail.category,
        ingredientsText: cocktail.ingredientsText,
        instructionsCount: cocktail.instructions?.length || 0
      })
    }

    if (!cocktail) {
      return NextResponse.json(
        { error: 'Cóctel no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(normalizeImageRecord(cocktail))

  } catch (error) {
    console.error('Error obteniendo cóctel:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
