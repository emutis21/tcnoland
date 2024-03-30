/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.*.*',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.*',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
