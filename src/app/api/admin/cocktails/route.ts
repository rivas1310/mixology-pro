import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener todos los cócteles
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

    const [cocktails, total] = await Promise.all([
      prisma.cocktail.findMany({
        where,
        skip,
        take: limit,
        include: {
          ingredients: {
            include: {
              ingredient: true
            }
          },
          instructions: {
            orderBy: { step: 'asc' }
          },
          _count: {
            select: {
              favorites: true,
              reviews: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.cocktail.count({ where })
    ])

    return NextResponse.json({
      cocktails,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error obteniendo cócteles:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo cóctel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      image,
      imageKey,
      category,
      difficulty,
      time,
      abv,
      isClassic,
      isFeatured,
      ingredients,
      instructions,
      story,
      trivia
    } = body

    // Validar datos requeridos
    if (!name || !category || !difficulty || !time) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Formatear ingredientes como array de strings
    const ingredientsArray = ingredients && ingredients.length > 0
      ? ingredients.map((ing: any) => `${ing.name} ${ing.amount}${ing.unit}`)
      : []

    // Crear cóctel
    const cocktail = await prisma.cocktail.create({
      data: {
        name,
        description,
        image,
        imageKey,
        category,
        difficulty,
        time,
        abv: abv ? parseFloat(abv) : null,
        isClassic: isClassic || false,
        isFeatured: isFeatured || false,
        ingredientsText: ingredientsArray,
        story: story || null,
        trivia: trivia || null
      }
    })

    // Crear ingredientes si se proporcionan (por ahora los omitimos, solo texto)
    // TODO: Implementar sistema de ingredientes manuales
    // if (ingredients && ingredients.length > 0) {
    //   await prisma.cocktailIngredient.createMany({
    //     data: ingredients.map((ingredient: any, index: number) => ({
    //       cocktailId: cocktail.id,
    //       ingredientId: ingredient.ingredientId,
    //       amount: ingredient.amount,
    //       unit: ingredient.unit,
    //       order: index + 1
    //     }))
    //   })
    // }

    // Crear instrucciones si se proporcionan
    if (instructions && instructions.length > 0) {
      await prisma.cocktailInstruction.createMany({
        data: instructions.map((instruction: string, index: number) => ({
          cocktailId: cocktail.id,
          step: index + 1,
          instruction,
          order: index + 1
        }))
      })
    }

    // Obtener cóctel completo con relaciones
    const fullCocktail = await prisma.cocktail.findUnique({
      where: { id: cocktail.id },
      include: {
        instructions: {
          orderBy: { step: 'asc' }
        }
      }
    })

    return NextResponse.json(fullCocktail, { status: 201 })

  } catch (error) {
    console.error('Error creando cóctel:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
