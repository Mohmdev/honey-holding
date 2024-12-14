import { getServerSideURL } from '@/lib/utils/getURL'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import type { Plugin } from 'payload'

const generateURL: GenerateURL = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

const generateTitle: GenerateTitle = ({ doc }) => {
  return doc?.title ? `${doc.title} | Nexweb` : 'Nexweb'
}

export type GenerateTitle2<T = unknown> = (args: {
  doc: T
  locale?: string
}) => Promise<string> | string

export const seoPluginConfig: Plugin = seoPlugin({
  generateTitle,
  generateURL,
  uploadsCollection: 'media'
})
