import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import type { Plugin } from 'payload'

import { NESTED_COLLECTIONS } from '@constants'

export const nestedDocsPluginConfig: Plugin = nestedDocsPlugin({
  collections: NESTED_COLLECTIONS,
  generateLabel: (_, doc) => doc.title as string,
  generateURL: (docs) =>
    docs.reduce((url, doc) => `${url}/${doc.slug as string}`, '')
})
