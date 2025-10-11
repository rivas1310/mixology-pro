import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener vino por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const wine = await prisma.wine.findUnique({
      where: { id }
    })

    if (!wine) {
      return NextResponse.json(
        { error: 'Vino no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(wine)

  } catch (error) {
    console.error('Error obteniendo vino:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar vino
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
      vintage,
      origin,
      region,
      denomination,
      grapeVariety,
      winery,
      servingTemp,
      price,
      isPremium,
      tastingNotes,
      color,
      aroma,
      taste,
      body: wineBody,
      acidity,
      tannins,
      finish,
      pairing,
      awards
    } = body

    const wine = await prisma.wine.update({
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
        vintage: vintage ? parseInt(vintage) : null,
        origin,
        region,
        denomination,
        grapeVariety,
        winery,
        servingTemp,
        price: price ? parseFloat(price) : null,
        isPremium,
        tastingNotes,
        color,
        aroma,
        taste,
        body: wineBody,
        acidity,
        tannins,
        finish,
        pairing,
        awards
      }
    })

    return NextResponse.json(wine)

  } catch (error) {
    console.error('Error actualizando vino:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar vino
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.wine.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Vino eliminado exitosamente' })

  } catch (error) {
    console.error('Error eliminando vino:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
