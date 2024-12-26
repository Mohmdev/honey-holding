import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { CookieClientPage } from './client_page'

export default function Page(): React.ReactElement {
  return <CookieClientPage />
}

export const metadata: Metadata = {
  title: 'Cookie Policy | Nexweb',
  description: 'Nexweb Cookie Policy',
  openGraph: mergeOpenGraph({
    title: 'Cookie Policy | Nexweb',
    url: '/cookie'
  })
}
