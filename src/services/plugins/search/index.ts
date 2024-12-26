import { INDEXED_COLLECTIONS } from '@lib/constants/constants'

import { searchPlugin } from '@payloadcms/plugin-search'

import type { Plugin } from 'payload'

import { searchFields } from './fields/fieldOverrides'
import { beforeSyncWithSearch } from './hooks/beforeSync'

export const searchPluginConfig: Plugin = searchPlugin({
  collections: INDEXED_COLLECTIONS,
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
