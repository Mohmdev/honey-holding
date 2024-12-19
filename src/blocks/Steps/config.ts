import { blockFields } from '@fields/blockFields'

import type { Block } from 'payload'

export const Steps: Block = {
  slug: 'steps',
  fields: [
    blockFields({
      name: 'stepsFields',
      fields: [
        {
          name: 'steps',
          type: 'array',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media'
            }
          ],
          required: true
        }
      ]
    })
  ],
  interfaceName: 'StepsBlock',
  labels: {
    plural: 'Steps Blocks',
    singular: 'Steps Block'
  }
}
