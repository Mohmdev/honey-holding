import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'
import { publishedOnly } from '@access/publishedOnly'

import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories'
  },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'postsInCategory',
      type: 'join',
      collection: 'posts',
      on: 'categories'
    }
  ]
}
