'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'

interface CloudflareImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
  quality?: number
  fallbackGradient?: string
}

export function CloudflareImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  quality = 75,
  fallbackGradient = 'from-beige to-gold-light'
}: CloudflareImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br ${fallbackGradient} overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center p-6 z-10">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <p className="text-sm text-white font-medium">
            {alt}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} animate-pulse z-10`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          </div>
        </div>
      )}
      
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-all duration-700 ease-out ${
          isLoading ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'
        } ${fill ? 'h-full w-full object-cover group-hover:scale-[1.02]' : ''}`}
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
