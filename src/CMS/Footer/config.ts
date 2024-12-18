import { revalidatePath } from 'next/cache'

import { link } from '@fields/link'
import { isAdmin } from '@access/isAdmin'

import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: isAdmin
  },
  fields: [
    {
      type: 'array',
      name: 'coloumns',
      maxRows: 3,
      minRows: 1,
      fields: [
        {
          type: 'text',
          name: 'label',
          required: true
        },
        {
          type: 'array',
          name: 'navItems',
          fields: [
            link({
              appearances: false
            })
          ]
          // admin: {
          //   initCollapsed: true,
          //   components: {
          //   RowLabel: '@admin-components/RowLabel#RowLabel'
          //   }
          // }
        }
      ]
    }
  ],
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')]
  }
}
