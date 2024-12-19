import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical'
import link from '@fields/link'

import type { Block, Field } from 'payload'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird'
      },
      {
        label: 'Half',
        value: 'half'
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds'
      },
      {
        label: 'Full',
        value: 'full'
      }
    ]
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature()
        ]
      }
    }),
    label: false
  },
  {
    name: 'enableLink',
    type: 'checkbox'
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink)
      }
    }
  })
]

export const BasicContentBlock: Block = {
  slug: 'content-basic',
  interfaceName: 'BasicContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true
      },
      fields: columnFields
    }
  ]
}
