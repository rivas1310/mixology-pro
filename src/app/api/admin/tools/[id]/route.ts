import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Obtener herramienta por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const tool = await prisma.tool.findUnique({
      where: { id }
    })

    if (!tool) {
      return NextResponse.json(
        { error: 'Herramienta no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(tool)

  } catch (error) {
    console.error('Error obteniendo herramienta:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar herramienta
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const {
      name,
      category,
      subcategory,
      description,
      image,
      imageKey,
      brand,
      material,
      size,
      capacity,
      price,
      uses,
      howToUse,
      maintenance,
      tips,
      alternatives,
      isProfessional,
      isEssential,
      isFeatured,
      origin
    } = body

    const tool = await prisma.tool.update({
      where: { id },
      data: {
        name,
        category,
        subcategory,
        description,
        image,
        imageKey,
        brand,
        material,
        size,
        capacity,
        price,
        uses,
        howToUse,
        maintenance,
        tips,
        alternatives,
        isProfessional,
        isEssential,
        isFeatured,
        origin
      }
    })

    return NextResponse.json(tool)

  } catch (error) {
    console.error('Error actualizando herramienta:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar herramienta
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.tool.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Herramienta eliminada exitosamente' })

  } catch (error) {
    console.error('Error eliminando herramienta:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

