import { getPublicUrl } from '@/lib/r2'

type ImageLike = {
  image?: string | null
  imageKey?: string | null
}

function cleanValue(value?: string | null): string {
  if (!value) return ''
  const trimmed = value.trim()
  return trimmed.replace(/^['"]|['"]$/g, '')
}

function isAbsoluteUrl(value: string): boolean {
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('data:') ||
    value.startsWith('blob:')
  )
}

export function resolveImageUrl(image?: string | null, imageKey?: string | null): string | null {
  const cleanKey = cleanValue(imageKey).replace(/^\/+/, '')
  const cleanImage = cleanValue(image)

  // Priorizamos imageKey para evitar URLs antiguas o rotas tras migraciones.
  if (cleanKey) {
    return getPublicUrl(cleanKey)
  }

  if (!cleanImage) {
    return null
  }

  if (isAbsoluteUrl(cleanImage)) {
    return cleanImage
  }

  if (cleanImage.startsWith('//')) {
    return `https:${cleanImage}`
  }

  if (cleanImage.startsWith('/')) {
    return cleanImage
  }

  if (cleanImage.includes('/')) {
    return getPublicUrl(cleanImage.replace(/^\/+/, ''))
  }

  return null
}

export function normalizeImageRecord<T extends ImageLike>(record: T): T {
  return {
    ...record,
    image: resolveImageUrl(record.image, record.imageKey),
  }
}

