/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
          },
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
          },
        ],
      },
}

module.exports = nextConfig
