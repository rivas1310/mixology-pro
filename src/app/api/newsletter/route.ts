import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const bodySchema = z.object({
  email: z.string().email('Email no válido').max(320),
  source: z.string().max(64).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => ({}))
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors.email?.[0] || 'Datos no válidos' },
        { status: 400 }
      )
    }

    const email = parsed.data.email.toLowerCase().trim()
    const source = parsed.data.source || 'home'

    try {
      await prisma.newsletterSubscriber.create({
        data: { email, source },
      })
    } catch (e: unknown) {
      const code = e && typeof e === 'object' && 'code' in e ? (e as { code: string }).code : ''
      if (code === 'P2002') {
        return NextResponse.json({
          ok: true,
          alreadySubscribed: true,
          message: 'Este email ya está suscrito.',
        })
      }
      throw e
    }

    return NextResponse.json({ ok: true, message: 'Suscripción registrada correctamente.' })
  } catch (error) {
    console.error('Newsletter POST:', error)
    return NextResponse.json({ error: 'Error al guardar la suscripción' }, { status: 500 })
  }
}
