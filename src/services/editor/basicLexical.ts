import { Config } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical'
import { Banner } from '@blocks/Banner/basic'
import { Code } from '@blocks/Code/config'
import { MediaBlock } from '@blocks/MediaBlock/config'

export const basicLexical: Config['editor'] = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
      }),
      BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature()
    ]
  }
})
