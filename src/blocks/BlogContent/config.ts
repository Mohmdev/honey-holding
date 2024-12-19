import { blockFields } from '@fields/blockFields'
import richText from '@fields/richText'

import type { Block } from 'payload'

export const BlogContent: Block = {
  slug: 'blogContent',
  fields: [
    blockFields({
      name: 'blogContentFields',
      fields: [richText()]
    })
  ]
}
