import { beforeSyncWithSearch } from '@/modules/settings/Search/hooks/beforeSync'
import { searchFields } from '@/modules/settings/Search/fields/fieldOverrides'
import { searchPlugin } from '@payloadcms/plugin-search'

export const searchPluginConfig = searchPlugin({
  collections: ['posts'],
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [...defaultFields, ...searchFields]
    },
    admin: {
      group: 'Settings',
    },
  },
})
