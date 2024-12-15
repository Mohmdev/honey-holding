
import { admins } from '@/access/admins'
import type { CollectionConfig } from 'payload'

export const GettingStarted: CollectionConfig = {
  slug: 'getting-started',
  endpoints: false,
  labels: {
    singular: 'Getting Started',
    plural: 'Getting Started',
  },
  access: {
    read: admins,
  },
  admin: {
    components: {
      views: {
        list: {
          Component: '@/CMS/Docs/Component#Docs',
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
