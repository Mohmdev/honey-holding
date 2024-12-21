import { Config } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature
} from '@payloadcms/richtext-lexical'

export const basicLexical: Config['editor'] = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      ParagraphFeature()
    ]
  }
})
