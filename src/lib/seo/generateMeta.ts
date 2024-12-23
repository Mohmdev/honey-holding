import type { Metadata } from 'next'

import { getServerSideURL } from '@utils/getURL'

import type { Page, Post } from '@payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'

import { getGlobalSettings } from '@data/globals/cachedSiteMeta'

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post>
}): Promise<Metadata> => {
  const { doc } = args || {}

  const siteName = (await getGlobalSettings.siteName()) || 'Nexweb'
  const siteDescription =
    (await getGlobalSettings.siteDescription()) ||
    'Nexweb Content Management Systems'

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    `${getServerSideURL()}`

  // Base OpenGraph configuration
  const openGraphBase = mergeOpenGraph({
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: ogImage ? [{ url: ogImage }] : undefined
  })

  // Special handling for homepage
  if (doc?.slug === 'home') {
    return {
      title: siteName,
      description: siteDescription,
      openGraph: {
        ...openGraphBase,
        url: '/'
      }
    }
  }

  if (doc?.slug === 'posts') {
    return {
      title: `Blog | ${siteName}`,
      description: 'Browse all posts.',
      openGraph: {
        ...openGraphBase,
        title: `Blog | ${siteName}`,
        description: 'Browse all posts.',
        url: '/blog'
      }
    }
  }

  if (doc?.slug === 'search') {
    return {
      title: `Search | ${siteName}`,
      description: 'Search across our site',
      openGraph: {
        ...openGraphBase,
        title: `Search | ${siteName}`,
        description: 'Search across our site',
        url: '/search'
      }
    }
  }

  // All other docs
  const documentTitle = doc?.meta?.title
    ? `${doc.meta.title} | ${siteName}`
    : siteName

  const documentDescription = doc?.meta?.description || siteDescription

  return {
    title: documentTitle,
    description: documentDescription,
    openGraph: {
      ...openGraphBase,
      title: documentTitle,
      description: documentDescription,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/'
    }
  }
}
