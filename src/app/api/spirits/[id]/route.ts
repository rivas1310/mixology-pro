import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { normalizeImageRecord } from '@/lib/imageUrl'

// GET - Obtener licor por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('API: Fetching spirit with ID:', id)

    const spirit = await prisma.spirit.findUnique({
      where: { id }
    })

    console.log('API: Spirit found:', spirit ? 'Yes' : 'No')
    if (spirit) {
      console.log('API: Spirit data:', {
        id: spirit.id,
        name: spirit.name,
        brand: spirit.brand,
        category: spirit.category,
        abv: spirit.abv,
        isPremium: spirit.isPremium
      })
    }

    if (!spirit) {
      return NextResponse.json(
        { error: 'Licor no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(normalizeImageRecord(spirit))

  } catch (error) {
    console.error('Error obteniendo licor:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
