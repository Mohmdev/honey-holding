import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { Providers } from '@providers'
import { GeistMono } from 'geist/font/mono'

import { PrivacyProvider } from '@providers/Privacy'
import { untitledSans } from '@lib/fonts/fonts'
import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { getClientSideURL, getServerSideURL } from '@utils/getURL'

import { AdminBar } from '@components/AdminBar'
// import { GoogleAnalytics } from '@components/Analytics/GoogleAnalytics'
import { GoogleTagManager } from '@components/Analytics/GoogleTagManager'
import Favicon from '@components/Favicon'
import { PrivacyBanner } from '@components/PrivacyBanner'

import '@styles/app.scss'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isEnabled: draft } = await draftMode()
  return (
    <html lang="en">
      <PrivacyProvider>
        <head>
          <Favicon />
          <link rel="dns-prefetch" href={getClientSideURL()} />
          {/* TODO */}
          {/* <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
          /> */}
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
            <AdminBar adminBarProps={{ preview: draft }} />
            {children}
            <PrivacyBanner />
          </Providers>
        </body>
      </PrivacyProvider>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph()
  // twitter: {
  //   card: 'summary_large_image',
  //   creator: '@payloadcms',
  // },
}
