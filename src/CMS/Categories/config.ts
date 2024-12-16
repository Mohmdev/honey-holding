import { admins } from '@access/admins'
import { adminsOrPublished } from '@access/adminsOrPublished'

import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  access: {
    create: admins,
    delete: admins,
    read: adminsOrPublished,
    update: admins
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
