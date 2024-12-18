import { isAdminOrEditor } from '@access/isAdminOrEditor'

import type { CollectionConfig } from 'payload'

export const Docs: CollectionConfig = {
  slug: 'docs',
  labels: {
    singular: 'Docs',
    plural: 'Docs'
  },
  access: {
    read: isAdminOrEditor
  },
  endpoints: false,
  admin: {
    useAsTitle: 'dummy',
    components: {
      views: {
        list: {
          Component: '@CMS/Docs/Component#Docs',
          actions: undefined
        }
      }
    },
    pagination: {
      defaultLimit: undefined
    }
  },
  fields: [
    {
      type: 'text',
      name: 'dummy',
      admin: {
        hidden: true
      }
    }
  ]
}
