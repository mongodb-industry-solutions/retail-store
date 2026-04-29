/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Handle node: imports for server-side code
            config.externals = config.externals || [];
            config.externals.push({
                'node:crypto': 'crypto',
                'node:fs': 'fs',
                'node:path': 'path',
                'node:os': 'os',
                'node:util': 'util'
            });
        }
        return config;
    },
    images: {
        qualities: [25, 50, 75, 100], // Add quality options
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
