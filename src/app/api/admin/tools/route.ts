import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener todas las herramientas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || ''

    const where = {
      ...(category && { category })
    }

    const tools = await prisma.tool.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    const normalizedTools = tools.map(normalizeImageRecord)
    return NextResponse.json({ tools: normalizedTools })

  } catch (error) {
    console.error('Error obteniendo herramientas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva herramienta
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

    // Validar datos requeridos
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear herramienta
    const tool = await prisma.tool.create({
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
        isProfessional: isProfessional || false,
        isEssential: isEssential || false,
        isFeatured: isFeatured || false,
        origin
      }
    })

    return NextResponse.json(normalizeImageRecord(tool), { status: 201 })

  } catch (error) {
    console.error('Error creando herramienta:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

