'use client'

import { useState } from 'react'
import { Check, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [inLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'home' }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setMessage(data.error || 'No se pudo completar la suscripción')
        return
      }

      setMessage(
        data.alreadySubscribed
          ? 'Ya estabas en la lista. ¡Gracias por tu interés!'
          : data.message || '¡Listo! Te avisaremos con novedades.'
      )
      setIsSubscribed(true)
      setEmail('')
    } catch {
      setMessage('Error de conexión. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-cream-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-12 space-y-4">
          <p className="text-sm font-medium text-olive tracking-[0.18em] uppercase">
            Mantente Actualizado
          </p>
          <h2 className="text-5xl md:text-6xl font-display text-primary-800 leading-tight">
            Recibe Recetas Exclusivas
          </h2>
          <p className="text-lg text-primary-600 max-w-xl mx-auto">
            Nuevas recetas, técnicas y tendencias. Sin spam.
          </p>
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full border border-beige bg-white py-3 pl-12 pr-4 text-primary-800 placeholder:text-primary-400 transition-all focus:border-gold focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={inLoading}
                className="px-8 sm:w-auto w-full"
              >
                Suscribir
              </Button>
            </div>
            {message && !isSubscribed && (
              <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
            )}
            <p className="text-xs text-primary-500">
              Puedes darte de baja cuando quieras contactando al sitio.
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-300 bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="mb-1 font-semibold text-primary-800">¡Gracias!</p>
              <p className="text-sm text-primary-600 max-w-md">{message}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
