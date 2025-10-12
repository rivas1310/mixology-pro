import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Verificar conexión a la base de datos
    await prisma.$queryRaw`SELECT 1`
    
    // Contar cócteles
    const cocktailCount = await prisma.cocktail.count()
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      cocktails: cocktailCount,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
        vercelUrl: process.env.VERCEL_URL
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      database: 'disconnected'
    }, { status: 500 })
  }
}

