import { useState } from 'react'
import toast from 'react-hot-toast'
import { validateFile } from '@/lib/fileValidation'

interface UploadOptions {
  folder: 'cocktails' | 'ingredients' | 'spirits' | 'beers' | 'wines' | 'users'
  userId?: string
  onSuccess?: (url: string, key: string) => void
  onError?: (error: string) => void
}

interface UploadResult {
  url: string
  key: string
  fileName: string
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadImage = async (
    file: File,
    options: UploadOptions
  ): Promise<UploadResult | null> => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Validar archivo antes de subir
      const validation = validateFile(file, options.folder)
      if (!validation.isValid) {
        throw new Error(validation.error)
      }
      // 1. Obtener URL firmada del servidor
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          fileSize: file.size,
          folder: options.folder,
          userId: options.userId,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error obteniendo URL de subida')
      }

      const { uploadUrl, publicUrl, fileName, key } = await response.json()

      // 2. Subir archivo directamente a R2
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!uploadResponse.ok) {
        throw new Error('Error subiendo archivo a R2')
      }

      setUploadProgress(100)

      const result: UploadResult = {
        url: publicUrl,
        key,
        fileName,
      }

      // 3. Callback de éxito
      if (options.onSuccess) {
        options.onSuccess(publicUrl, key)
      }

      toast.success('Imagen subida exitosamente')
      return result

    } catch (error) {
      console.error('Error subiendo imagen:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      
      if (options.onError) {
        options.onError(errorMessage)
      }
      
      toast.error(`Error subiendo imagen: ${errorMessage}`)
      return null
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const uploadMultipleImages = async (
    files: File[],
    options: UploadOptions
  ): Promise<UploadResult[]> => {
    const results: UploadResult[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadProgress((i / files.length) * 100)
      
      const result = await uploadImage(file, options)
      if (result) {
        results.push(result)
      }
    }
    
    setUploadProgress(100)
    return results
  }

  return {
    uploadImage,
    uploadMultipleImages,
    isUploading,
    uploadProgress,
  }
}
