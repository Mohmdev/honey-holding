import { revalidatePath } from 'next/cache'

// import { isAdmin } from '@access/isAdmin'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'

import type { GlobalConfig } from 'payload'

import { revalidateGraphics } from './revalidateGraphics'

export const Graphics: GlobalConfig = {
  slug: 'graphics',
  label: {
    singular: 'Graphics',
    plural: 'Graphics'
  },
  access: {
    read: publishedOnly,
    update: isAdminOrEditor,
    readVersions: isAdminOrEditor,
    readDrafts: isAdminOrEditor
  },
  hooks: {
    afterChange: [revalidateGraphics]
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100
      }
    }
  },
  fields: [
    // Group 1
    // {
    //   name: 'logoLight',
    //   label: 'Logo Light',
    //   type: 'upload',
    //   relationTo: 'assets',
    //   admin: {
    //     description:
    //       'Light-colored version of your logo optimized for dark backgrounds and dark mode displays.'
    //   }
    // },
    // {
    //   name: 'logoDark',
    //   label: 'Logo Dark',
    //   type: 'upload',
    //   relationTo: 'assets',
    //   admin: {
    //     description:
    //       'Dark-colored version of your logo optimized for light backgrounds and standard displays.'
    //   }
    // },
    // Group 2
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'assets',
      admin: {
        description:
          'The small icon that is displayed in the browser tab. Recommended size: 32x32px.'
      }
    }
    // {
    //   name: 'brandImage',
    //   label: 'Brand Image',
    //   type: 'upload',
    //   relationTo: 'assets',
    //   admin: {
    //     description:
    //       'Default branded image for SEO metadata, social media cards, and general marketing materials.'
    //   }
    // }
  ]
}
