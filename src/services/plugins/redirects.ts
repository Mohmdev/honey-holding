import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { revalidateRedirects } from '@hooks/revalidateRedirects'

import type { Plugin } from 'payload'

export const redirectsPluginConfig: Plugin = redirectsPlugin({
  collections: ['pages', 'posts'],
  overrides: {
    // @ts-expect-error: This is a valid override
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ('name' in field && field.name === 'from') {
          return {
            ...field,
            admin: {
              description:
                'You will need to rebuild the website when changing this field.'
            }
          }
        }
        return field
      })
    },
    hooks: {
      afterChange: [revalidateRedirects]
    },
    admin: {
      group: 'Settings'
    }
  }
})
