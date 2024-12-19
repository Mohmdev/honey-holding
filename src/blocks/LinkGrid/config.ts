import { blockFields } from '@fields/blockFields'
import linkGroup from '@fields/linkGroup'

import type { Block } from 'payload'

export const LinkGrid: Block = {
  slug: 'linkGrid',
  fields: [
    blockFields({
      name: 'linkGridFields',
      fields: [
        linkGroup({
          appearances: false
        })
      ]
    })
  ]
}
