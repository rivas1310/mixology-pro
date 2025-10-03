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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand */}
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
                    <Wine className="h-8 w-8 text-primary-400" />
                    <Sparkles className="h-3 w-3 text-accent-400 absolute -top-1 -right-1" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                    Mixology Pro
                  </span>
                </Link>
                
                <p className="text-gray-300 mb-6 max-w-md">
                  La plataforma más completa para bartenders y mixólogos profesionales. 
                  Recetas, técnicas, ingredientes y herramientas para dominar el arte de la mixología.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="h-4 w-4 text-primary-400" />
                    <span>hola@mixologypro.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="h-4 w-4 text-primary-400" />
                    <span>+34 900 123 456</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="h-4 w-4 text-primary-400" />
                    <span>Madrid, España</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Product */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Producto</h3>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Company */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Resources */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Recursos</h3>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Legal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
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

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Mantente al Día
            </h3>
            <p className="text-gray-300 mb-8">
              Recibe las últimas recetas, técnicas y tendencias en mixología
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-300">
                Suscribirse
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-gray-300">
              <span>&copy; 2024 Mixology Pro. Todos los derechos reservados.</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
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

