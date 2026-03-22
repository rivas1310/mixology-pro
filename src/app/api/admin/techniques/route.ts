import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener todas las técnicas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || ''

    const where = {
      ...(category && { category })
    }

    const techniques = await prisma.technique.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    const normalizedTechniques = techniques.map(normalizeImageRecord)
    return NextResponse.json({ techniques: normalizedTechniques })

  } catch (error) {
    console.error('Error obteniendo técnicas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva técnica
export async function POST(request: NextRequest) {
  try {
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

    // Validar datos requeridos
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear técnica
    const technique = await prisma.technique.create({
      data: {
        name,
        category,
        subcategory,
        description,
        image,
        imageKey,
        difficulty,
        timeRequired,
        steps: steps ? JSON.parse(steps) : null,
        ingredients,
        equipment,
        tips,
        videoUrl,
        applications,
        examples,
        precautions,
        benefits,
        origin,
        isFeatured: isFeatured || false
      }
    })

    return NextResponse.json(normalizeImageRecord(technique), { status: 201 })

  } catch (error) {
    console.error('Error creando técnica:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

