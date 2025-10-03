// Utilidades para validación de archivos

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/avif'
]

export const MAX_FILE_SIZES = {
  cocktails: 5 * 1024 * 1024, // 5MB
  ingredients: 3 * 1024 * 1024, // 3MB
  spirits: 3 * 1024 * 1024, // 3MB
  beers: 3 * 1024 * 1024, // 3MB
  wines: 3 * 1024 * 1024, // 3MB
  users: 2 * 1024 * 1024, // 2MB
}

export function validateImageType(contentType: string): boolean {
  return ALLOWED_IMAGE_TYPES.includes(contentType)
}

export function validateFileSize(size: number, folder: string): boolean {
  return size <= MAX_FILE_SIZES[folder as keyof typeof MAX_FILE_SIZES]
}

export function getMaxFileSizeMB(folder: string): number {
  return Math.round(MAX_FILE_SIZES[folder as keyof typeof MAX_FILE_SIZES] / (1024 * 1024))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function validateFile(file: File, folder: string): { isValid: boolean; error?: string } {
  // Validar tipo
  if (!validateImageType(file.type)) {
    return {
      isValid: false,
      error: 'Tipo de archivo no permitido. Solo se permiten: JPEG, PNG, WebP, AVIF'
    }
  }

  // Validar tamaño
  if (!validateFileSize(file.size, folder)) {
    const maxSizeMB = getMaxFileSizeMB(folder)
    return {
      isValid: false,
      error: `Archivo demasiado grande. Tamaño máximo: ${maxSizeMB}MB. Tu archivo: ${formatFileSize(file.size)}`
    }
  }

  return { isValid: true }
}
