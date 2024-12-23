import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'

import type { GlobalConfig } from 'payload'

import { revalidateGlobalSettings } from './revalidateGlobalSettings'

export const GlobalSettings: GlobalConfig = {
  slug: 'global-settings',
  label: {
    singular: 'Globals',
    plural: 'Globals'
  },
  access: {
    read: publishedOnly,
    update: isAdminOrEditor,
    readVersions: isAdminOrEditor,
    readDrafts: isAdminOrEditor
  },
  hooks: {
    afterChange: [revalidateGlobalSettings]
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
      type: 'tabs',
      tabs: [
        {
          name: 'siteIdentity',
          label: 'Site Identity',
          fields: [
            {
              name: 'siteName',
              label: 'Site Name',
              type: 'text'
            },
            {
              name: 'siteDescription',
              label: 'Site Description',
              type: 'textarea'
            }
          ]
        },
        {
          name: 'branding',
          label: 'Branding',
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
        },
        {
          name: 'contactInfo',
          label: 'Contact Information',
          fields: [
            {
              name: 'contactName',
              label: 'Contact Name',
              type: 'text'
            },
            {
              name: 'contactEmail',
              label: 'Email Address',
              type: 'text'
            },
            {
              name: 'contactPhone',
              label: 'Phone Number',
              type: 'text'
            },
            {
              name: 'contactAddress',
              label: 'Address',
              type: 'textarea'
            },
            {
              name: 'socialMedia',
              type: 'group',
              label: 'Social Media',
              fields: [
                {
                  name: 'facebook',
                  label: 'Facebook',
                  type: 'text'
                },
                {
                  name: 'twitter',
                  label: 'Twitter',
                  type: 'text'
                },
                {
                  name: 'instagram',
                  label: 'Instagram',
                  type: 'text'
                },
                {
                  name: 'linkedin',
                  label: 'LinkedIn',
                  type: 'text'
                },
                {
                  name: 'youtube',
                  label: 'YouTube',
                  type: 'text'
                },
                {
                  name: 'whatsapp',
                  label: 'WhatsApp',
                  type: 'text'
                },
                {
                  name: 'telegram',
                  label: 'Telegram',
                  type: 'text'
                }
              ]
            }
          ]
        },
        {
          name: 'globalSeo',
          label: 'Global SEO',
          fields: [
            {
              name: 'keywords',
              label: 'Global SEO Keywords',
              type: 'text'
            },
            {
              name: 'ogImage',
              label: 'Global Meta Image',
              type: 'upload',
              relationTo: 'assets',
              admin: {
                description:
                  'The image that will appear when sharing your site on social media.'
              }
            }
          ]
        }
      ]
    }
  ]
}
