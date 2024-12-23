import { revalidatePath } from 'next/cache'

import link from '@fields/link'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'

// import { isAdmin } from '@access/isAdmin'

import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: publishedOnly,
    update: isAdminOrEditor,
    readVersions: isAdminOrEditor,
    readDrafts: isAdminOrEditor
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100
      }
    }
  },
  fields: [
    {
      type: 'array',
      name: 'columns',
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
