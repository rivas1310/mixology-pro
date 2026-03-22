import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/app/providers'
import { AppShell } from '@/components/layout/AppShell'

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
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
