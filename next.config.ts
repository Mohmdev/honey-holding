import type { NextConfig } from 'next'

import bundleAnalyzer from '@next/bundle-analyzer'

import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = withBundleAnalyzer({
  experimental: {
    reactCompiler: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  redirects,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year,
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https'
        }
      })
    ]
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import']
  }
})

export default withPayload(nextConfig)
