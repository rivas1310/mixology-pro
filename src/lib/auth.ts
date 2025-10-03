import { NextRequest } from 'next/server'

export interface User {
  id: string
  email: string
  name: string
  role: 'USER' | 'BARTENDER' | 'ADMIN'
  avatar?: string
  createdAt: Date
}

export interface AuthSession {
  user: User
  isAuthenticated: boolean
  isAdmin: boolean
  isBartender: boolean
}

// Simulación de autenticación (en producción usar NextAuth.js)
export function getAuthSession(request: NextRequest): AuthSession {
  // Por ahora simulamos un usuario admin
  const mockUser: User = {
    id: '1',
    email: 'admin@mixologypro.com',
    name: 'Administrador',
    role: 'ADMIN',
    avatar: '/images/avatars/admin.jpg',
    createdAt: new Date()
  }

  return {
    user: mockUser,
    isAuthenticated: true,
    isAdmin: mockUser.role === 'ADMIN',
    isBartender: mockUser.role === 'BARTENDER' || mockUser.role === 'ADMIN'
  }
}

export function requireAuth(session: AuthSession) {
  if (!session.isAuthenticated) {
    throw new Error('Authentication required')
  }
}

export function requireAdmin(session: AuthSession) {
  if (!session.isAdmin) {
    throw new Error('Admin access required')
  }
}

export function requireBartender(session: AuthSession) {
  if (!session.isBartender) {
    throw new Error('Bartender access required')
  }
}
