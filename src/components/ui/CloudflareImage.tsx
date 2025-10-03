'use client'

import { useState } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'

interface CloudflareImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
  quality?: number
}

export function CloudflareImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  quality = 75
}: CloudflareImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}>
        <div className="text-center p-4">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Error cargando imagen
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
          <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
        </div>
      )}
      
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${fill ? 'w-full h-full object-cover' : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
}
