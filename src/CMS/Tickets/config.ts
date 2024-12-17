import { isAdminOrEditor } from '@access/isAdminOrEditor'

import type { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  endpoints: false,
  labels: {
    singular: 'Tickets',
    plural: 'Tickets'
  },
  access: {
    read: isAdminOrEditor
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
      name: 'dummy',
      type: 'text',
      admin: {
        hidden: true
      }
    }
  ]
}
