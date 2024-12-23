import React from 'react'
import { Metadata } from 'next'

import { Providers } from '@providers'
import { GeistMono } from 'geist/font/mono'

import { PrivacyProvider } from '@providers/Privacy'
import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { GoogleAnalytics } from '@components/Analytics/GoogleAnalytics'
import { GoogleTagManager } from '@components/Analytics/GoogleTagManager'
import { PrivacyBanner } from '@components/PrivacyBanner'

import '@styles/app.scss'

import { untitledSans } from '@lib/fonts/fonts'
import { getClientSideURL } from '@utils/getURL'

import Favicon from '@components/Favicon'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <PrivacyProvider>
        <head>
          <Favicon />
          <link rel="dns-prefetch" href={getClientSideURL()} />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
          />
          {/* <link
            rel="dns-prefetch"
            href="https://api.github.com/repos/payloadcms/payload"
          /> */}
          {/*  */}
          {/* <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <GoogleAnalytics /> */}
        </head>
        <body className={[GeistMono.variable, untitledSans.variable].join(' ')}>
          <GoogleTagManager />
          <Providers>
            {children}
            <PrivacyBanner />
          </Providers>
        </body>
      </PrivacyProvider>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://payloadcms.com'
  ),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms'
  },
  openGraph: mergeOpenGraph()
}
