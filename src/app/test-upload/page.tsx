'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { FileInfo } from '@/components/ui/FileInfo'
import { CloudflareImage } from '@/components/ui/CloudflareImage'
import { validateFile } from '@/lib/fileValidation'
import { 
  Upload, 
  Check, 
  X, 
  ExternalLink,
  Copy,
  Trash2
} from 'lucide-react'
import toast from 'react-hot-toast'

interface UploadedImage {
  url: string
  key: string
  fileName: string
}

export default function TestUploadPage() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isTesting, setIsTesting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileValidation, setFileValidation] = useState<{ isValid: boolean; error?: string } | null>(null)

  const handleImageUpload = (url: string, key: string) => {
    const newImage: UploadedImage = {
      url,
      key,
      fileName: key.split('/').pop() || 'unknown'
    }
    
    setUploadedImages(prev => [...prev, newImage])
    toast.success('Imagen subida exitosamente')
  }

  const handleImageRemove = (key: string) => {
    setUploadedImages(prev => prev.filter(img => img.key !== key))
    toast.success('Imagen eliminada')
  }

  const handleFileSelect = (file: File, folder: string) => {
    setSelectedFile(file)
    const validation = validateFile(file, folder)
    setFileValidation(validation)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiado al portapapeles')
  }

  const testConnection = async () => {
    setIsTesting(true)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: 'test-connection.txt',
          contentType: 'text/plain',
          fileSize: 100,
          folder: 'cocktails',
        }),
      })

      if (response.ok) {
        toast.success('✅ Conexión con R2 exitosa')
      } else {
        const error = await response.json()
        toast.error(`❌ Error: ${error.error}`)
      }
    } catch (error) {
      toast.error('❌ Error de conexión')
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🖼️ Prueba de Subida de Imágenes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Prueba la integración con Cloudflare R2
            </p>
          </div>

          {/* Test Connection */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🔗 Prueba de Conexión
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Verifica que la conexión con Cloudflare R2 esté funcionando correctamente.
            </p>
            <Button
              onClick={testConnection}
              disabled={isTesting}
              className="flex items-center gap-2"
            >
              {isTesting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Probando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Probar Conexión
                </>
              )}
            </Button>
          </div>

          {/* File Validation Info */}
          {selectedFile && fileValidation && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📋 Información del Archivo
              </h2>
              <FileInfo 
                file={selectedFile}
                folder="cocktails"
                isValid={fileValidation.isValid}
                error={fileValidation.error}
              />
            </div>
          )}

          {/* Upload Test */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📤 Prueba de Subida
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sube imágenes para probar la funcionalidad completa.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cócteles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🍸 Imágenes de Cócteles
                </h3>
                <ImageUpload
                  folder="cocktails"
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                  maxImages={3}
                />
              </div>

              {/* Ingredientes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🍋 Imágenes de Ingredientes
                </h3>
                <ImageUpload
                  folder="ingredients"
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                  maxImages={3}
                />
              </div>
            </div>
          </div>

          {/* Uploaded Images */}
          {uploadedImages.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📋 Imágenes Subidas ({uploadedImages.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedImages.map((image, index) => (
                  <motion.div
                    key={image.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="aspect-square bg-gray-200 dark:bg-gray-600 rounded-lg mb-4 overflow-hidden">
                      <CloudflareImage
                        src={image.url}
                        alt={image.fileName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {image.fileName}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(image.url)}
                          className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                          URL
                        </button>
                        
                        <button
                          onClick={() => window.open(image.url, '_blank')}
                          className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Ver
                        </button>
                        
                        <button
                          onClick={() => handleImageRemove(image.key)}
                          className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              📝 Instrucciones
            </h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <p>1. <strong>Prueba la conexión</strong> - Verifica que R2 esté configurado correctamente</p>
              <p>2. <strong>Sube imágenes</strong> - Arrastra y suelta o haz clic para seleccionar</p>
              <p>3. <strong>Verifica URLs</strong> - Las imágenes se suben directamente a R2</p>
              <p>4. <strong>Prueba eliminación</strong> - Las imágenes se eliminan de R2</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
