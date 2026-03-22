import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener cerveza por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const beer = await prisma.beer.findUnique({
      where: { id }
    })

    if (!beer) {
      return NextResponse.json(
        { error: 'Cerveza no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(normalizeImageRecord(beer))

  } catch (error) {
    console.error('Error obteniendo cerveza:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar cerveza
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const {
      name,
      brand,
      type,
      category,
      description,
      image,
      imageKey,
      abv,
      ibu,
      origin,
      state,
      servingTemp,
      price,
      isCraft,
      tastingNotes,
      color,
      aroma,
      flavor,
      pairing,
      glassType
    } = body

    const beer = await prisma.beer.update({
      where: { id },
      data: {
        name,
        brand,
        type,
        category,
        description,
        image,
        imageKey,
        abv: abv ? parseFloat(abv) : null,
        ibu: ibu ? parseInt(ibu) : null,
        origin,
        state,
        servingTemp,
        price: price ? parseFloat(price) : null,
        isCraft,
        isPremium: isCraft || false,
        tastingNotes,
        color,
        aroma,
        flavor,
        pairing,
        glassType
      }
    })

    return NextResponse.json(normalizeImageRecord(beer))

  } catch (error) {
    console.error('Error actualizando cerveza:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar cerveza (ya existe en otro archivo)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.beer.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Cerveza eliminada exitosamente' })

  } catch (error) {
    console.error('Error eliminando cerveza:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
