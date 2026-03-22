'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { useImageUpload } from '@/hooks/useImageUpload'
import { Select } from '@/components/ui/Select'
import toast from 'react-hot-toast'

const FOLDERS = [
  { value: 'cocktails', label: 'Cócteles' },
  { value: 'ingredients', label: 'Ingredientes' },
  { value: 'spirits', label: 'Licores' },
  { value: 'beers', label: 'Cervezas' },
  { value: 'wines', label: 'Vinos' },
  { value: 'techniques', label: 'Técnicas' },
  { value: 'tools', label: 'Herramientas' },
  { value: 'users', label: 'Usuarios' },
] as const

type MediaFolder = (typeof FOLDERS)[number]['value']

interface BucketItem {
  key: string
  url: string
  lastModified: string | null
  size?: number
}

export default function AdminMediaPage() {
  const { uploadImage, isUploading, uploadProgress } = useImageUpload()
  const [folder, setFolder] = useState<MediaFolder>('cocktails')
  const [items, setItems] = useState<BucketItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [listError, setListError] = useState<string | null>(null)
  const [isTruncated, setIsTruncated] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchList = useCallback(
    async (mode: 'reset' | { appendWithCursor: string }) => {
      const reset = mode === 'reset'
      const cursor = reset ? undefined : mode.appendWithCursor

      if (reset) {
        setLoading(true)
        setListError(null)
      } else {
        if (!cursor) return
        setLoadingMore(true)
      }

      try {
        const params = new URLSearchParams({
          folder,
          limit: '200',
        })
        if (cursor) params.set('cursor', cursor)

        const res = await fetch(`/api/admin/media?${params}`)
        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
          setListError(data.error || 'Error al listar imágenes')
          if (reset) setItems([])
          return
        }

        const newItems: BucketItem[] = (data.items || []).map((i: BucketItem) => ({
          key: i.key,
          url: i.url,
          lastModified: i.lastModified,
          size: i.size,
        }))

        setIsTruncated(!!data.isTruncated)
        setNextCursor(data.nextContinuationToken ?? null)

        if (reset) {
          setItems(sortByDate(newItems))
        } else {
          setItems((prev) => sortByDate(mergeByKey(prev, newItems)))
        }
      } catch {
        setListError('Error de red al cargar el bucket')
        if (reset) setItems([])
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [folder]
  )

  useEffect(() => {
    setNextCursor(null)
    setIsTruncated(false)
    fetchList('reset')
  }, [folder, fetchList])

  const refresh = () => {
    setNextCursor(null)
    setIsTruncated(false)
    fetchList('reset')
  }

  const handlePick = () => fileRef.current?.click()

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return
    for (const file of Array.from(files)) {
      await uploadImage(file, { folder })
    }
    if (fileRef.current) fileRef.current.value = ''
    refresh()
  }

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copiado al portapapeles')
    } catch {
      toast.error('No se pudo copiar')
    }
  }

  const deleteRemote = async (key: string) => {
    if (!window.confirm('¿Eliminar esta imagen del almacenamiento (R2)?')) return
    try {
      const res = await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      if (res.ok) {
        setItems((prev) => prev.filter((x) => x.key !== key))
        toast.success('Imagen eliminada')
      } else {
        const err = await res.json().catch(() => ({}))
        toast.error(err.error || 'No se pudo eliminar')
      }
    } catch {
      toast.error('Error de red')
    }
  }

  const loadMore = () => {
    if (nextCursor && !loadingMore) fetchList({ appendWithCursor: nextCursor })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Medios</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Galería desde Cloudflare R2: listado por carpeta, subida y eliminación.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:flex-wrap">
          <div className="flex-1 max-w-xs">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Carpeta en R2
            </label>
            <Select
              value={folder}
              onChange={(e) => setFolder(e.target.value as MediaFolder)}
            >
              {FOLDERS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={handlePick}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
            >
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Upload className="h-5 w-5" />
              )}
              {isUploading ? 'Subiendo…' : 'Subir imágenes'}
            </button>
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
            {isUploading && (
              <span className="self-center text-sm text-gray-500 dark:text-gray-400">
                {uploadProgress}%
              </span>
            )}
          </div>
        </div>

        {listError && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
            {listError}
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
        </div>
      ) : items.length === 0 && !listError ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No hay imágenes en esta carpeta
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Sube archivos o elige otra carpeta. Solo se listan JPG, PNG, WebP y AVIF.
          </p>
        </div>
      ) : items.length === 0 && listError ? null : (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {items.length} {items.length === 1 ? 'imagen mostrada' : 'imágenes mostradas'}
            {isTruncated ? ' (hay más en el bucket)' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.key}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm"
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-3 space-y-2">
                  <p
                    className="text-xs text-gray-500 dark:text-gray-400 truncate font-mono"
                    title={item.key}
                  >
                    {item.key}
                  </p>
                  {(item.lastModified || item.size != null) && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {item.lastModified &&
                        new Date(item.lastModified).toLocaleString()}
                      {item.size != null &&
                        ` · ${(item.size / 1024).toFixed(1)} KB`}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(item.url)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Copy className="h-3 w-3" />
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => copyText(item.key)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Copy className="h-3 w-3" />
                      Clave
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRemote(item.key)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50"
                    >
                      <Trash2 className="h-3 w-3" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isTruncated && nextCursor && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                {loadingMore ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : null}
                Cargar más
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function mergeByKey(a: BucketItem[], b: BucketItem[]): BucketItem[] {
  const map = new Map<string, BucketItem>()
  for (const x of a) map.set(x.key, x)
  for (const x of b) map.set(x.key, x)
  return Array.from(map.values())
}

function sortByDate(items: BucketItem[]): BucketItem[] {
  return [...items].sort((x, y) => {
    const tx = x.lastModified ? new Date(x.lastModified).getTime() : 0
    const ty = y.lastModified ? new Date(y.lastModified).getTime() : 0
    return ty - tx
  })
}
