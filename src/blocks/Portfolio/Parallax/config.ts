import { blockFields } from '@fields/blockFields'

import type { Block } from 'payload'

export const PortfolioParallax: Block = {
  slug: 'portfolioParallax',
  labels: {
    singular: 'Portfolio Parallax',
    plural: 'Portfolio Parallax'
  },
  fields: [
    blockFields({
      name: 'portfolioParallaxFields',
      fields: [
        {
          name: 'items',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true
            },
            {
              name: 'author',
              type: 'text'
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true
            },
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true
                }
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'tabLabel',
                  type: 'text',
                  required: true,
                  admin: {
                    description:
                      'A label for the navigation tab at the bottom of the parallax'
                  }
                },
                {
                  name: 'portfolio',
                  type: 'relationship',
                  relationTo: 'portfolio',
                  required: true
                }
              ]
            }
          ]
        }
      ]
    })
  ]
}
