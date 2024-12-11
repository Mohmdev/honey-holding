import { authenticated } from '@/lib/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  endpoints: false,
  labels: {
    singular: 'Tickets',
    plural: 'Tickets',
  },
  access: {
    read: authenticated,
  },
  admin: {
    group: 'Support',
    components: {
      views: {
        list: {
          Component: '@/modules/support/Tickets/Component#Tickets',
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
