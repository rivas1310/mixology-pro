import { NextRequest, NextResponse } from 'next/server'
import { 
  createUploadUrl, 
  validateImageType, 
  validateFileSize, 
  createFileName,
  getPublicUrl,
  MAX_FILE_SIZES
} from '@/lib/r2'

export async function POST(request: NextRequest) {
  try {
    const { fileName, contentType, fileSize, folder, userId } = await request.json()

    // Validar parámetros requeridos
    if (!fileName || !contentType || !fileSize || !folder) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    if (!validateImageType(contentType)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo se permiten: JPEG, PNG, WebP, AVIF' },
        { status: 400 }
      )
    }

    // Validar tamaño de archivo
    if (!validateFileSize(fileSize, folder as any)) {
      const maxSizeMB = Math.round(MAX_FILE_SIZES[folder as keyof typeof MAX_FILE_SIZES] / (1024 * 1024))
      return NextResponse.json(
        { error: `Archivo demasiado grande. Tamaño máximo: ${maxSizeMB}MB` },
        { status: 400 }
      )
    }

    // Generar nombre único
    const uniqueFileName = createFileName(fileName, userId)
    
    // Generar URL firmada
    const uploadUrl = await createUploadUrl(
      uniqueFileName,
      contentType,
      folder as any
    )

    // URL pública donde estará disponible la imagen
    const publicUrl = getPublicUrl(`${folder}/${uniqueFileName}`)

    return NextResponse.json({
      uploadUrl,
      publicUrl,
      fileName: uniqueFileName,
      key: `${folder}/${uniqueFileName}`
    })

  } catch (error) {
    console.error('Error en API de upload:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Endpoint para eliminar imagen
export async function DELETE(request: NextRequest) {
  try {
    const { key } = await request.json()

    if (!key) {
      return NextResponse.json(
        { error: 'Clave de imagen requerida' },
        { status: 400 }
      )
    }

    const { deleteImage } = await import('@/lib/r2')
    const success = await deleteImage(key)

    if (!success) {
      return NextResponse.json(
        { error: 'Error eliminando imagen' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error eliminando imagen:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
