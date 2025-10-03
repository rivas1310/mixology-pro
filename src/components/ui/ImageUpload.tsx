'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  X, 
  ImageIcon, 
  Check, 
  AlertCircle,
  Loader2,
  Trash2,
  Eye
} from 'lucide-react'
import { useImageUpload } from '@/hooks/useImageUpload'
import { CloudflareImage } from './CloudflareImage'

interface ImageUploadProps {
  folder: 'cocktails' | 'ingredients' | 'spirits' | 'beers' | 'wines' | 'users'
  userId?: string
  onImageUpload: (url: string, key: string) => void
  onImageRemove?: (key: string) => void
  currentImage?: string
  currentKey?: string
  maxImages?: number
  className?: string
}

export function ImageUpload({
  folder,
  userId,
  onImageUpload,
  onImageRemove,
  currentImage,
  currentKey,
  maxImages = 1,
  className = ''
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { uploadImage, isUploading, uploadProgress } = useImageUpload()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files).slice(0, maxImages)
    
    // Crear previews locales
    const previews = fileArray.map(file => URL.createObjectURL(file))
    setPreviewImages(previews)

    // Subir cada archivo
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]
      const result = await uploadImage(file, {
        folder,
        userId,
        onSuccess: (url, key) => {
          onImageUpload(url, key)
        },
        onError: (error) => {
          console.error('Error subiendo imagen:', error)
        }
      })

      if (result) {
        // Limpiar preview local
        URL.revokeObjectURL(previews[i])
      }
    }

    setPreviewImages([])
  }

  const handleRemoveImage = async () => {
    if (currentKey && onImageRemove) {
      try {
        const response = await fetch('/api/upload', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: currentKey }),
        })

        if (response.ok) {
          onImageRemove(currentKey)
        }
      } catch (error) {
        console.error('Error eliminando imagen:', error)
      }
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zona de subida */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
          dragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxImages > 1}
          accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
          onChange={handleChange}
          className="hidden"
        />

        <div className="text-center">
          {isUploading ? (
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 text-primary-600 mx-auto animate-spin" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Subiendo imagen...
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {uploadProgress}% completado
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <Upload className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Arrastra y suelta imágenes aquí
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  o{' '}
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    haz clic para seleccionar
                  </button>
                </p>
              </div>

              <div className="text-xs text-gray-400 dark:text-gray-500">
                <p>Formatos: JPEG, PNG, WebP, AVIF</p>
                <p>Tamaño máximo: {
                  folder === 'cocktails' ? '5MB' : 
                  folder === 'users' ? '2MB' : '3MB'
                }</p>
                {maxImages > 1 && <p>Máximo {maxImages} imágenes</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Imagen actual */}
      {currentImage && (
        <div className="relative">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <CloudflareImage
                        src={currentImage}
                        alt="Imagen actual"
                        fill
                        className="object-cover"
                      />
                    </div>
          
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => window.open(currentImage, '_blank')}
              className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <Eye className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            
            <button
              type="button"
              onClick={handleRemoveImage}
              className="p-2 bg-red-500/80 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Previews de imágenes en proceso */}
      <AnimatePresence>
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewImages.map((preview: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
              >
                <CloudflareImage
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
