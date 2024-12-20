import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import type { Plugin } from 'payload'

import { NESTED_COLLECTIONS } from '@constants'

export const nestedDocsPluginConfig: Plugin = nestedDocsPlugin({
  // collections: 'categories'
  collections: NESTED_COLLECTIONS // This will receive an empty array. What will happen?
})
