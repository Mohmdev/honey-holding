import { Config } from 'payload'

import {
  // ItalicFeature,
  // BoldFeature,
  // LinkFeature,
  // ParagraphFeature,
  // UnderlineFeature,
  BlocksFeature,
  lexicalEditor,
  UploadFeature
} from '@payloadcms/richtext-lexical'
import link from '@fields/link'
import { LabelFeature } from '@fields/richText/features/label/server'
import { LargeBodyFeature } from '@fields/richText/features/largeBody/server'

// import { LINKABLE_COLLECTIONS } from '@constants'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'enableLink',
              type: 'checkbox',
              label: 'Enable Link'
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                admin: {
                  condition: (_, data) => Boolean(data?.enableLink)
                }
              }
            })
          ]
        }
      }
    }),
    LabelFeature(),
    LargeBodyFeature(),
    BlocksFeature({
      blocks: [
        {
          slug: 'spotlight',
          fields: [
            {
              name: 'element',
              type: 'select',
              options: [
                {
                  label: 'H1',
                  value: 'h1'
                },
                {
                  label: 'H2',
                  value: 'h2'
                },
                {
                  label: 'H3',
                  value: 'h3'
                },
                {
                  label: 'Paragraph',
                  value: 'p'
                }
              ]
            },
            {
              name: 'richText',
              type: 'richText',
              editor: lexicalEditor()
            }
          ],
          interfaceName: 'SpotlightBlock'
        },
        {
          slug: 'video',
          fields: [
            {
              name: 'url',
              type: 'text'
            }
          ],
          interfaceName: 'VideoBlock'
        },
        {
          slug: 'br',
          fields: [
            {
              name: 'ignore',
              type: 'text'
            }
          ],

          interfaceName: 'BrBlock'
        },
        {
          slug: 'commandLine',
          fields: [
            {
              name: 'command',
              type: 'text'
            }
          ],
          interfaceName: 'CommandLineBlock'
        },
        {
          slug: 'templateCards',
          fields: [
            {
              name: 'templates',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true
                },
                {
                  name: 'image',
                  type: 'text',
                  required: true
                },
                {
                  name: 'slug',
                  type: 'text',
                  required: true
                },
                {
                  name: 'order',
                  type: 'number',
                  required: true
                }
              ],
              labels: {
                plural: 'Templates',
                singular: 'Template'
              }
            }
          ],
          interfaceName: 'TemplateCardsBlock'
        },
        {
          slug: 'banner',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'default',
              options: [
                {
                  label: 'Default',
                  value: 'default'
                },
                {
                  label: 'Success',
                  value: 'success'
                },
                {
                  label: 'Warning',
                  value: 'warning'
                },
                {
                  label: 'Error',
                  value: 'error'
                }
              ]
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor()
            }
          ],
          interfaceName: 'BannerBlock'
        }
      ]
    })
  ]
})
