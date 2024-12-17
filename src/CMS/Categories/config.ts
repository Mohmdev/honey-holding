import { publishedOnly } from '@/services/access/publishedOnly'

import { isAdmin } from '@access/isAdmin'

import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publishedOnly,
    update: isAdmin
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    }
  ]
}
