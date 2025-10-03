import { S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

// Configuración de Cloudflare R2
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.CLOUDFLARE_BUCKET_NAME || 'mixology-pro-images'

// Tipos de archivos permitidos
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/avif'
]

// Tamaños máximos por tipo
export const MAX_FILE_SIZES = {
  cocktails: 5 * 1024 * 1024, // 5MB
  ingredients: 3 * 1024 * 1024, // 3MB
  spirits: 3 * 1024 * 1024, // 3MB
  beers: 3 * 1024 * 1024, // 3MB
  wines: 3 * 1024 * 1024, // 3MB
  users: 2 * 1024 * 1024, // 2MB
}

// Generar URL firmada para subir imagen
export async function createUploadUrl(
  fileName: string,
  contentType: string,
  folder: 'cocktails' | 'ingredients' | 'spirits' | 'users' = 'cocktails'
): Promise<string> {
  const key = `${folder}/${fileName}`
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    Metadata: {
      'uploaded-at': new Date().toISOString(),
    },
  })

  try {
    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 }) // 1 hora
    return signedUrl
  } catch (error) {
    console.error('Error generando URL firmada:', error)
    throw new Error('Error generando URL de subida')
  }
}

// Generar URL pública para acceder a imagen
export function getPublicUrl(key: string): string {
  return `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${key}`
}

// Generar URL firmada para descargar imagen
export async function createDownloadUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  try {
    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 })
    return signedUrl
  } catch (error) {
    console.error('Error generando URL de descarga:', error)
    throw new Error('Error generando URL de descarga')
  }
}

// Eliminar imagen
export async function deleteImage(key: string): Promise<boolean> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  try {
    await r2Client.send(command)
    return true
  } catch (error) {
    console.error('Error eliminando imagen:', error)
    return false
  }
}

// Validar tipo de archivo
export function validateImageType(contentType: string): boolean {
  return ALLOWED_IMAGE_TYPES.includes(contentType)
}

// Validar tamaño de archivo
export function validateFileSize(size: number, type: 'cocktails' | 'ingredients' | 'spirits' | 'beers' | 'wines' | 'users'): boolean {
  return size <= MAX_FILE_SIZES[type]
}

// Generar nombre único para archivo
export function createFileName(originalName: string, userId?: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()
  const prefix = userId ? `${userId}-` : ''
  
  return `${prefix}${timestamp}-${random}.${extension}`
}

// Obtener clave de imagen desde URL pública
export function getKeyFromUrl(url: string): string | null {
  const match = url.match(/r2\.dev\/(.+)$/)
  return match ? match[1] : null
}

export { r2Client, BUCKET_NAME }
