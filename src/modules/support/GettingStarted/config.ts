import { authenticated } from '@/lib/access/authenticated'
import type { CollectionConfig } from 'payload'

export const GettingStarted: CollectionConfig = {
  slug: 'getting-started',
  endpoints: false,
  labels: {
    singular: 'Getting Started',
    plural: 'Getting Started',
  },
  access: {
    read: authenticated,
  },
  admin: {
    group: 'Support',
    components: {
      views: {
        list: {
          Component: '@/modules/support/GettingStarted/Component#GettingStarted',
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
