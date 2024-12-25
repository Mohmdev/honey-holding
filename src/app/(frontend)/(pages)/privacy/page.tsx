import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { PrivacyClientPage } from './page_client'

export default function Page(props) {
  return <PrivacyClientPage {...props} />
}

export const metadata: Metadata = {
  title: 'Privacy Policy | Nexweb',
  description: 'Nexweb Privacy Policy',
  openGraph: mergeOpenGraph({
    title: 'Privacy Policy | Nexweb',
    url: '/privacy'
  })
}
