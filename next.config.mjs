/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // use remotePatterns instead of deprecated domains list
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
  reactStrictMode: true,

  // Strong cache for immutable build assets served under _next/static
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // Cache optimized images in public or routed under /images for one week
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, s-maxage=604800, must-revalidate'
          }
        ]
      },
      {
        // Generic rule for common static image extensions at root
        source: '/:all*\.(jpg|jpeg|png|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, s-maxage=604800, must-revalidate'
          }
        ]
      }
    ]
  }
}

export default nextConfig;
