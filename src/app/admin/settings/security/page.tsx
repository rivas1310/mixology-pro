'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Shield,
  KeyRound,
  Cookie,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  Lock,
  Server,
  FileKey,
} from 'lucide-react'

type SecurityInfo = {
  passwordConfigured: boolean
  sessionSecretNeedsChange: boolean
  nodeEnv: string
  cookie: {
    name: string
    httpOnly: boolean
    sameSite: string
    maxAgeDays: number
    secureInProduction: boolean
  }
}

export default function AdminSecuritySettingsPage() {
  const router = useRouter()
  const [info, setInfo] = useState<SecurityInfo | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/admin/security')
        if (!res.ok) throw new Error('No se pudo cargar la información')
        const data = await res.json()
        if (!cancelled) setInfo(data)
      } catch {
        if (!cancelled) setLoadError('Error al cargar el estado de seguridad.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Shield className="h-6 w-6 text-purple-600" />
          Seguridad
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Autenticación del panel, cookies de sesión y buenas prácticas.
        </p>
      </div>

      {loadError && (
        <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-900/20 px-4 py-3 text-sm text-red-800 dark:text-red-200">
          {loadError}
        </div>
      )}

      {/* Alertas */}
      {info && !info.passwordConfigured && (
        <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/20 p-4">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="font-medium text-amber-900 dark:text-amber-100">
              Contraseña de administrador no definida
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200/90 mt-1">
              Define <code className="rounded bg-amber-100/80 dark:bg-amber-950/50 px-1">ADMIN_PASSWORD</code> en{' '}
              <code className="rounded bg-amber-100/80 dark:bg-amber-950/50 px-1">.env</code> y reinicia el servidor.
              Sin ella el middleware no protege el panel en producción.
            </p>
          </div>
        </div>
      )}

      {info?.sessionSecretNeedsChange && (
        <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/20 p-4">
          <FileKey className="h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="font-medium text-amber-900 dark:text-amber-100">
              Secreto de sesión por defecto
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200/90 mt-1">
              Establece <code className="rounded bg-amber-100/80 dark:bg-amber-950/50 px-1">ADMIN_SESSION_SECRET</code>{' '}
              en <code className="rounded bg-amber-100/80 dark:bg-amber-950/50 px-1">.env</code> con un valor largo y
              aleatorio (no uses el valor por defecto en producción).
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <KeyRound className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Acceso al panel</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contraseña única vía variables de entorno</p>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
              La contraseña se configura con <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">ADMIN_PASSWORD</code>; no se guarda en la base de datos.
            </li>
            <li className="flex gap-2">
              <Lock className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
              Para cambiarla, actualiza el valor en <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.env</code> y reinicia. Las sesiones existentes dejarán de ser válidas si cambias también el secreto.
            </li>
            <li className="flex gap-2">
              <Server className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
              Entorno actual:{' '}
              <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                {info?.nodeEnv ?? '…'}
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Cookie className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Cookie de sesión</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configuración aplicada en el login</p>
            </div>
          </div>
          {info ? (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                <dt className="text-gray-500 dark:text-gray-400">Nombre</dt>
                <dd className="font-mono text-gray-900 dark:text-white">{info.cookie.name}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                <dt className="text-gray-500 dark:text-gray-400">HttpOnly</dt>
                <dd className="text-gray-900 dark:text-white">{info.cookie.httpOnly ? 'Sí' : 'No'}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                <dt className="text-gray-500 dark:text-gray-400">SameSite</dt>
                <dd className="font-mono text-gray-900 dark:text-white">{info.cookie.sameSite}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                <dt className="text-gray-500 dark:text-gray-400">Duración máxima</dt>
                <dd className="text-gray-900 dark:text-white">{info.cookie.maxAgeDays} días</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Secure (HTTPS)</dt>
                <dd className="text-gray-900 dark:text-white">
                  {info.cookie.secureInProduction
                    ? `Solo en producción (${info.nodeEnv === 'production' ? 'activo' : 'se activará al desplegar'})`
                    : '—'}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-gray-500">Cargando…</p>
          )}
        </section>
      </div>

      <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recomendaciones</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>No subas <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.env</code> al repositorio.</li>
          <li>Usa HTTPS en producción para que la cookie solo viaje cifrada.</li>
          <li>Tras un acceso en un equipo compartido, cierra sesión con el botón inferior.</li>
          <li>Para varios administradores en el futuro, valora usuarios en base de datos y roles (no implementado en esta versión).</li>
        </ul>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-800 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200 dark:hover:bg-red-900/40"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión en este dispositivo
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Invalida la cookie de sesión en este navegador. Deberás volver a iniciar sesión.
        </p>
      </div>
    </div>
  )
}
