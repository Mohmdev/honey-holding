import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import type { Plugin } from 'payload'

export const nestedDocsPluginConfig: Plugin = nestedDocsPlugin({
  collections: ['categories']
})
