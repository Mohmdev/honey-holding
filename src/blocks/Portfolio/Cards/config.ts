import { blockFields } from '@fields/blockFields'
import richText from '@fields/richText'

import type { Block } from 'payload'

export const PortfolioCards: Block = {
  slug: 'portfolioCards',
  labels: {
    singular: 'Portfolio Cards',
    plural: 'Portfolio Cards'
  },
  fields: [
    blockFields({
      name: 'portfolioCardFields',
      fields: [
        {
          name: 'pixels',
          label: 'Show Pixel Background?',
          type: 'checkbox',
          defaultValue: true
        },
        {
          name: 'cards',
          type: 'array',
          fields: [
            richText(),
            {
              name: 'portfolio',
              type: 'relationship',
              relationTo: 'portfolio',
              required: true
            }
          ]
        }
      ]
    })
  ]
}
