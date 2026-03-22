import { NextRequest, NextResponse } from 'next/server'
import { listMediaByFolder, type MediaFolder } from '@/lib/r2'

const ALLOWED: MediaFolder[] = [
  'cocktails',
  'ingredients',
  'spirits',
  'beers',
  'wines',
  'techniques',
  'tools',
  'users',
]

function isMediaFolder(v: string): v is MediaFolder {
  return ALLOWED.includes(v as MediaFolder)
}

/**
 * GET /api/admin/media?folder=cocktails&limit=200&cursor=...
 * Lista imágenes en R2 bajo el prefijo folder/
 */
export async function GET(request: NextRequest) {
  try {
    if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_ACCESS_KEY_ID) {
      return NextResponse.json(
        { error: 'R2 no configurado (variables de entorno)' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder') || 'cocktails'
    const limit = Math.min(
      Math.max(parseInt(searchParams.get('limit') || '200', 10) || 200, 1),
      1000
    )
    const cursor = searchParams.get('cursor') || undefined

    if (!isMediaFolder(folder)) {
      return NextResponse.json({ error: 'Carpeta no válida' }, { status: 400 })
    }

    const result = await listMediaByFolder(folder, {
      maxKeys: limit,
      continuationToken: cursor,
    })

    return NextResponse.json({
      folder,
      items: result.items,
      isTruncated: result.isTruncated,
      nextContinuationToken: result.nextContinuationToken ?? null,
    })
  } catch (error) {
    console.error('Error listando medios R2:', error)
    return NextResponse.json(
      { error: 'No se pudo listar el almacenamiento' },
      { status: 500 }
    )
  }
}
