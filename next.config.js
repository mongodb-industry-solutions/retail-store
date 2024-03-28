/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingIncludes: {
          '/app/api/signURLs': ['./ist-retail-demo-c2e70dfceaa3.json'],
        },
      },
}

module.exports = nextConfig