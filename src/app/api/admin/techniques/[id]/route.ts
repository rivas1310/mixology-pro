import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener técnica por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const technique = await prisma.technique.findUnique({
      where: { id }
    })

    if (!technique) {
      return NextResponse.json(
        { error: 'Técnica no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(normalizeImageRecord(technique))

  } catch (error) {
    console.error('Error obteniendo técnica:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar técnica
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
      difficulty,
      timeRequired,
      steps,
      ingredients,
      equipment,
      tips,
      videoUrl,
      applications,
      examples,
      precautions,
      benefits,
      origin,
      isFeatured
    } = body

    const technique = await prisma.technique.update({
      where: { id },
      data: {
        name,
        category,
        subcategory,
        description,
        image,
        imageKey,
        difficulty,
        timeRequired,
        steps: steps ? (typeof steps === 'string' ? JSON.parse(steps) : steps) : null,
        ingredients,
        equipment,
        tips,
        videoUrl,
        applications,
        examples,
        precautions,
        benefits,
        origin,
        isFeatured
      }
    })

    return NextResponse.json(normalizeImageRecord(technique))

  } catch (error) {
    console.error('Error actualizando técnica:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar técnica
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.technique.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Técnica eliminada exitosamente' })

  } catch (error) {
    console.error('Error eliminando técnica:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

