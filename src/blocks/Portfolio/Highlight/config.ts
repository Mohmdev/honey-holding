import { blockFields } from '@fields/blockFields'
import richText from '@fields/richText'

import type { Block } from 'payload'

export const PortfolioHighlight: Block = {
  slug: 'portfolioHighlight',
  fields: [
    blockFields({
      name: 'portfolioHighlightFields',
      fields: [
        richText(),
        {
          name: 'portfolio',
          type: 'relationship',
          relationTo: 'portfolio',
          hasMany: true,
          required: true
        }
      ]
    })
  ]
}
