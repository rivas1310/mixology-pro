'use client'

import { AppProvider } from '@/contexts/AppProvider'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fbfaf8',
            color: '#2f312d',
            border: '1px solid #ddd6c9',
          },
        }}
      />
    </AppProvider>
  )
}
