import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/** Totales públicos para home / hero (solo conteos). */
export async function GET() {
  try {
    const [cocktails, techniques] = await Promise.all([
      prisma.cocktail.count(),
      prisma.technique.count(),
    ])

    return NextResponse.json({
      cocktails,
      techniques,
    })
  } catch (error) {
    console.error('Error stats:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
