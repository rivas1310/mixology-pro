'use client'

import { formatFileSize, getMaxFileSizeMB } from '@/lib/fileValidation'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

interface FileInfoProps {
  file: File
  folder: string
  isValid: boolean
  error?: string
}

export function FileInfo({ file, folder, isValid, error }: FileInfoProps) {
  const maxSizeMB = getMaxFileSizeMB(folder)
  const fileSizeMB = Math.round(file.size / (1024 * 1024) * 100) / 100

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        {isValid ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-500" />
        )}
        <span className={`font-medium ${isValid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
          {isValid ? 'Archivo válido' : 'Archivo inválido'}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Nombre:</span>
          <span className="font-medium text-gray-900 dark:text-white truncate max-w-48">
            {file.name}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {file.type}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Tamaño:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatFileSize(file.size)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Límite:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {maxSizeMB}MB
          </span>
        </div>
      </div>

      {!isValid && error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {isValid && (
        <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-300">
            El archivo cumple con todos los requisitos y está listo para subir.
          </p>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <p className="font-medium mb-1">Información de la carpeta:</p>
          <p>Carpeta: <span className="font-mono">{folder}</span></p>
          <p>Formatos permitidos: JPEG, PNG, WebP, AVIF</p>
          <p>Tamaño máximo: {maxSizeMB}MB</p>
        </div>
      </div>
    </div>
  )
}
