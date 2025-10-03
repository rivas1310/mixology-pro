'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Mail, 
  Send, 
  Check, 
  Sparkles, 
  Wine, 
  Star,
  Gift,
  Bell
} from 'lucide-react'

const benefits = [
  {
    icon: Wine,
    title: 'Recetas Exclusivas',
    description: 'Acceso a cócteles únicos no disponibles públicamente'
  },
  {
    icon: Star,
    title: 'Técnicas Avanzadas',
    description: 'Videos tutoriales de técnicas profesionales'
  },
  {
    icon: Gift,
    title: 'Descuentos Especiales',
    description: 'Ofertas exclusivas en ingredientes y herramientas'
  },
  {
    icon: Bell,
    title: 'Actualizaciones',
    description: 'Nuevas recetas y tendencias cada semana'
  }
]

export function Newsletter() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-900 via-primary-900 to-accent-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Newsletter Exclusivo
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            Mantente al Día con las Últimas Tendencias
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Recibe recetas exclusivas, técnicas avanzadas y las últimas tendencias en mixología directamente en tu bandeja de entrada
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6">
                ¿Qué recibirás?
              </h3>
              
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-white/70">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Newsletter Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              {!isSubscribed ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Suscríbete Ahora
                  </h3>
                  
                  <form onSubmit={handleSubscribe} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@email.com"
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white text-primary-900 font-semibold rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" />
                          Suscribiendo...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Suscribirse Gratis
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-white/70 text-sm mt-4">
                    Sin spam. Cancela cuando quieras. Más de 5,000 bartenders ya están suscritos.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/30 text-center"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    ¡Bienvenido a la Comunidad!
                  </h3>
                  
                  <p className="text-white/80 mb-6">
                    Gracias por suscribirte. Recibirás tu primer newsletter en las próximas 24 horas.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Verifica tu bandeja de entrada
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>5,000+ suscriptores</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Sin spam garantizado</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Cancelar en cualquier momento</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

