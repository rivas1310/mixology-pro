/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'via.placeholder.com',
      'pub-e8a8b952b622c99dd6ef04f58cd87ed8.r2.dev'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
