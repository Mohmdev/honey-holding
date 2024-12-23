import type { Metadata } from 'next'

import { getServerSideURL } from '../utils/getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Nexweb is a modern web development platform that lets you build, deploy, and scale websites and web applications with ease.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`
    }
  ],
  siteName: 'Nexweb - Modern Web Development Platform',
  title: 'Nexweb - Modern Web Development Platform'
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph']
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images
  }
}
