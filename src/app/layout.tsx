import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Mixology Pro - El Santo Grial del Bartender',
  description: 'La plataforma más completa para bartenders y mixólogos profesionales. Recetas, técnicas, ingredientes y herramientas profesionales.',
  keywords: 'bartender, mixología, cócteles, recetas, licores, bebidas, bar, profesional',
  authors: [{ name: 'Mixology Pro Team' }],
  openGraph: {
    title: 'Mixology Pro - El Santo Grial del Bartender',
    description: 'La plataforma más completa para bartenders y mixólogos profesionales.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
