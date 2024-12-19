import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical'
import { blockFields } from '@fields/blockFields'
import richText from '@fields/richText'

import type { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block'
  },
  interfaceName: 'FormBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'enableIntro',
          type: 'checkbox',
          label: 'Enable Intro Content'
        },
        {
          name: 'introContent',
          type: 'richText',
          admin: {
            condition: (_, { enableIntro }) => Boolean(enableIntro)
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({
                  enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature()
              ]
            }
          }),
          label: 'Intro Content'
        }
      ]
    },
    richText(),
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
  ],
  graphQL: {
    singularName: 'FormBlock'
  }
}
