import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener ingrediente por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const ingredient = await prisma.ingredient.findUnique({
      where: { id }
    })

    if (!ingredient) {
      return NextResponse.json(
        { error: 'Ingrediente no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(ingredient)

  } catch (error) {
    console.error('Error obteniendo ingrediente:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar ingrediente
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const ingredient = await prisma.ingredient.update({
      where: { id },
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
        isEssential
      }
    })

    return NextResponse.json(ingredient)

  } catch (error) {
    console.error('Error actualizando ingrediente:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar ingrediente
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.ingredient.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Ingrediente eliminado exitosamente' })

  } catch (error) {
    console.error('Error eliminando ingrediente:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

