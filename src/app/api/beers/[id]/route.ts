import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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

    return NextResponse.json(beer)

  } catch (error) {
    console.error('Error obteniendo cerveza:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

