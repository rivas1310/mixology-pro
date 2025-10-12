/**
 * Helper function to get the correct API URL for both client and server
 */
export function getApiUrl(path: string): string {
  // Si estamos en el cliente (browser), usar URL relativa
  if (typeof window !== 'undefined') {
    return path
  }
  
  // Si estamos en el servidor, usar URL absoluta
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                  'http://localhost:3000'
  
  return `${baseUrl}${path}`
}

/**
 * Fetch wrapper that automatically handles URLs for SSR
 */
export async function apiFetch(path: string, options?: RequestInit) {
  const url = getApiUrl(path)
  
  const defaultOptions: RequestInit = {
    cache: 'no-store',
    ...options
  }
  
  return fetch(url, defaultOptions)
}

