'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Wine, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Heart
} from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Cócteles', href: '/cocktails' },
    { name: 'Licores', href: '/spirits' },
    { name: 'Ingredientes', href: '/ingredients' },
    { name: 'Técnicas', href: '/techniques' },
    { name: 'Herramientas', href: '/tools' },
    { name: 'Calculadora', href: '/calculator' }
  ],
  company: [
    { name: 'Acerca de', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carreras', href: '/careers' },
    { name: 'Prensa', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contacto', href: '/contact' }
  ],
  resources: [
    { name: 'Centro de Ayuda', href: '/help' },
    { name: 'Documentación', href: '/docs' },
    { name: 'API', href: '/api' },
    { name: 'Comunidad', href: '/community' },
    { name: 'Tutoriales', href: '/tutorials' },
    { name: 'Estado del Sistema', href: '/status' }
  ],
  legal: [
    { name: 'Términos de Servicio', href: '/terms' },
    { name: 'Política de Privacidad', href: '/privacy' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licencias', href: '/licenses' },
    { name: 'GDPR', href: '/gdpr' }
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/mixologypro' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/mixologypro' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/mixologypro' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/mixologypro' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/mixologypro' }
]

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 text-primary-800 dark:text-zinc-100 border-t border-beige dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <div className="relative">
                    <Wine className="h-8 w-8 text-olive" />
                    <Sparkles className="h-3 w-3 text-gold absolute -top-1 -right-1" />
                  </div>
                  <span className="text-2xl font-display text-primary-800">
                    Mixology Pro
                  </span>
                </Link>
                
                <p className="text-primary-600 mb-6 max-w-md">
                  La plataforma más completa para bartenders y mixólogos profesionales. 
                  Recetas, técnicas, ingredientes y herramientas para dominar el arte de la mixología.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary-600">
                    <Mail className="h-4 w-4 text-gold-dark" />
                    <span>hola@mixologypro.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-600">
                    <Phone className="h-4 w-4 text-gold-dark" />
                    <span>+34 900 123 456</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-600">
                    <MapPin className="h-4 w-4 text-gold-dark" />
                    <span>Madrid, España</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Producto</h3>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href}
                          className="text-primary-600 hover:text-gold-dark transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Empresa</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href}
                          className="text-primary-600 hover:text-gold-dark transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Recursos</h3>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href}
                          className="text-primary-600 hover:text-gold-dark transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Legal</h3>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href}
                          className="text-primary-600 hover:text-gold-dark transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-beige dark:border-zinc-800 py-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-primary-800 mb-4">
              Mantente al Día
            </h3>
            <p className="text-primary-600 mb-8">
              Recibe las últimas recetas, técnicas y tendencias en mixología
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 border border-beige dark:border-zinc-700 bg-cream-50 dark:bg-zinc-900 px-4 py-3 text-primary-800 dark:text-zinc-100 placeholder-primary-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold dark:focus:border-amber-500"
              />
              <button className="px-6 py-3 bg-primary-800 hover:bg-primary-900 dark:bg-amber-600 dark:hover:bg-amber-500 text-cream-50 dark:text-zinc-950 font-semibold transition-colors duration-300">
                Suscribirse
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-beige dark:border-zinc-800 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-primary-600">
              <span>&copy; 2024 Mixology Pro. Todos los derechos reservados.</span>
              <Heart className="h-4 w-4 text-gold fill-current" />
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-beige dark:border-zinc-700 bg-cream-50 dark:bg-zinc-900 text-primary-500 dark:text-zinc-300 transition-all duration-300 hover:border-gold dark:hover:border-amber-500 hover:text-gold-dark dark:hover:text-amber-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

