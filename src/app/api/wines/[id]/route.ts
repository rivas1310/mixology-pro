import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const wine = await prisma.wine.findUnique({
      where: { id },
    })

    if (!wine) {
      return NextResponse.json({ error: 'Vino no encontrado' }, { status: 404 })
    }

    return NextResponse.json(normalizeImageRecord(wine))
  } catch (error) {
    console.error('Error obteniendo vino:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
