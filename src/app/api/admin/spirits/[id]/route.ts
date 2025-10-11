import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener licor por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const spirit = await prisma.spirit.findUnique({
      where: { id }
    })

    if (!spirit) {
      return NextResponse.json(
        { error: 'Licor no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(spirit)

  } catch (error) {
    console.error('Error obteniendo licor:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar licor
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
      brand,
      producer,
      owner,
      description,
      image,
      imageKey,
      abv,
      origin,
      denomination,
      composition,
      aging,
      color,
      aroma,
      taste,
      finish,
      servingSuggestions,
      temperature,
      pairings,
      trivia,
      presentations,
      price,
      isPremium
    } = body

    const spirit = await prisma.spirit.update({
      where: { id },
      data: {
        name,
        type,
        category,
        brand,
        producer,
        owner,
        description,
        image,
        imageKey,
        abv: abv ? parseFloat(abv) : null,
        origin,
        denomination,
        composition,
        aging,
        color,
        aroma,
        taste,
        finish,
        servingSuggestions,
        temperature,
        pairings,
        trivia,
        presentations,
        price: price ? parseFloat(price) : null,
        isPremium
      }
    })

    return NextResponse.json(spirit)

  } catch (error) {
    console.error('Error actualizando licor:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar licor
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.spirit.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Licor eliminado exitosamente' })

  } catch (error) {
    console.error('Error eliminando licor:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
