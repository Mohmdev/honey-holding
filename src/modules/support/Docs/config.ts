import { authenticated } from '@/lib/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Docs: CollectionConfig = {
  slug: 'docs',
  endpoints: false,
  labels: {
    singular: 'Documentation',
    plural: 'Documentation',
  },
  access: {
    read: authenticated
  },
  admin: {
    group: 'Support',
    components: {
      views: {
        list: {
          Component: '@/modules/support/Docs/Component#Documentation',
          actions: undefined,
        },
      },
    },
  },
  fields: [
    {
      name: 'dummyField',
      type: 'text',
      admin: {
        hidden: true,
      },
      virtual: true,
    },
  ],
}
