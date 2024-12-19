import { blockFields } from '@fields/blockFields'

import type { Block } from 'payload'

export const BlogMarkdown: Block = {
  slug: 'blogMarkdown',
  fields: [
    blockFields({
      name: 'blogMarkdownFields',
      fields: [
        {
          name: 'markdown',
          type: 'text',
          admin: {
            components: {
              Field: '@blocks/BlogMarkdown/Field#BlogMarkdownField'
            }
          },
          required: true
        }
      ]
    })
  ],
  labels: {
    plural: 'Markdown Blocks',
    singular: 'Markdown'
  }
}
