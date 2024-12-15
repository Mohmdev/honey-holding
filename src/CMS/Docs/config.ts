
import { admins } from '@/access/admins'
import type { CollectionConfig } from 'payload'

export const Docs: CollectionConfig = {
  slug: 'docs',
  endpoints: false,
  labels: {
    singular: 'Docs',
    plural: 'Docs',
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
