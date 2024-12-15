import { admins } from '@/access/admins'

import type { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  endpoints: false,
  labels: {
    singular: 'Tickets',
    plural: 'Tickets'
  },
  access: {
    read: admins
  },
  admin: {
    components: {
      views: {
        list: {
          Component: '@/CMS/Tickets/Component#Tickets',
          actions: undefined
        }
      }
    }
  },
  fields: [
    {
      name: 'dummyField',
      type: 'text',
      admin: {
        hidden: true
      },
      virtual: true
    }
  ]
}
