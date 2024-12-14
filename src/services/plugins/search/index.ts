import { searchPlugin } from '@payloadcms/plugin-search'
import { beforeSyncWithSearch } from './hooks/beforeSync'
import { searchFields } from './fields/fieldOverrides'

import type { Plugin } from 'payload'

export const searchPluginConfig: Plugin = searchPlugin({
  collections: ['products'],
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [...defaultFields, ...searchFields]
    },
    admin: {
      group: 'Settings'
    }
  }
})
