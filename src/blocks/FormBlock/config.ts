import { blockFields } from '@fields/blockFields'
import richText from '@fields/richText'

import type { Block } from 'payload'

export const Form: Block = {
  slug: 'form',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks'
  },
  graphQL: {
    singularName: 'FormBlock'
  },
  fields: [
    blockFields({
      name: 'formFields',
      fields: [
        richText(),
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          required: true
        }
      ]
    })
  ]
}
