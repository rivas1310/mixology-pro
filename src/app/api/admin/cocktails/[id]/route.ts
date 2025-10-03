import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener cóctel por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cocktail = await prisma.cocktail.findUnique({
      where: { id },
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
      }
    })

    if (!cocktail) {
      return NextResponse.json(
        { error: 'Cóctel no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(cocktail)

  } catch (error) {
    console.error('Error obteniendo cóctel:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar cóctel
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      instructions
    } = body

    // Verificar que el cóctel existe
    const existingCocktail = await prisma.cocktail.findUnique({
      where: { id }
    })

    if (!existingCocktail) {
      return NextResponse.json(
        { error: 'Cóctel no encontrado' },
        { status: 404 }
      )
    }

    // Actualizar cóctel
    const updatedCocktail = await prisma.cocktail.update({
      where: { id },
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
        isFeatured: isFeatured || false
      }
    })

    // Actualizar ingredientes si se proporcionan
    if (ingredients) {
      // Eliminar ingredientes existentes
      await prisma.cocktailIngredient.deleteMany({
        where: { cocktailId: id }
      })

      // Crear nuevos ingredientes
      if (ingredients.length > 0) {
        await prisma.cocktailIngredient.createMany({
          data: ingredients.map((ingredient: any, index: number) => ({
            cocktailId: id,
            ingredientId: ingredient.ingredientId,
            amount: ingredient.amount,
            unit: ingredient.unit,
            order: index + 1
          }))
        })
      }
    }

    // Actualizar instrucciones si se proporcionan
    if (instructions) {
      // Eliminar instrucciones existentes
      await prisma.cocktailInstruction.deleteMany({
        where: { cocktailId: id }
      })

      // Crear nuevas instrucciones
      if (instructions.length > 0) {
        await prisma.cocktailInstruction.createMany({
          data: instructions.map((instruction: string, index: number) => ({
            cocktailId: id,
            step: index + 1,
            instruction,
            order: index + 1
          }))
        })
      }
    }

    // Obtener cóctel actualizado con relaciones
    const fullCocktail = await prisma.cocktail.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true
          }
        },
        instructions: {
          orderBy: { step: 'asc' }
        }
      }
    })

    return NextResponse.json(fullCocktail)

  } catch (error) {
    console.error('Error actualizando cóctel:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar cóctel
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Verificar que el cóctel existe
    const existingCocktail = await prisma.cocktail.findUnique({
      where: { id }
    })

    if (!existingCocktail) {
      return NextResponse.json(
        { error: 'Cóctel no encontrado' },
        { status: 404 }
      )
    }

    // Eliminar cóctel (las relaciones se eliminan en cascada)
    await prisma.cocktail.delete({
      where: { id }
    })

    // Si tiene imagen en R2, eliminarla
    if (existingCocktail.imageKey) {
      try {
        const response = await fetch('/api/upload', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: existingCocktail.imageKey }),
        })

        if (!response.ok) {
          console.warn('No se pudo eliminar la imagen de R2:', existingCocktail.imageKey)
        }
      } catch (error) {
        console.warn('Error eliminando imagen de R2:', error)
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error eliminando cóctel:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
