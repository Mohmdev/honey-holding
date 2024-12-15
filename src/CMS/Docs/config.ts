
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
    useAsTitle: 'dummy',
    components: {
      views: {
        list: {
          Component: '@/CMS/Docs/Component#Docs',
          actions: undefined,
        },
      },
    },
    pagination: {
      defaultLimit: undefined
    },
  },
  fields: [
    {
      type: 'select',
      name: 'dummy',
      defaultValue: 'dummy',
      options: [
        {
          label: 'Dummy',
          value: 'dummy',
        },
      ],
      admin: {
        hidden: true,
      },
    }
  ],
}
