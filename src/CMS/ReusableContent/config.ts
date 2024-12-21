import { Banner } from '@blocks/Banner/config'
import { BlogContent } from '@blocks/BlogContent/config'
import { BlogMarkdown } from '@blocks/BlogMarkdown/config'
import { Callout } from '@blocks/Callout/config'
import { CallToAction } from '@blocks/CallToAction/config'
import { CardGrid } from '@blocks/CardGrid/config'
import { Code } from '@blocks/CodeBlock/config'
import { CodeFeature } from '@blocks/CodeFeature/config'
import { Content } from '@blocks/Content/config'
import { ContentGrid } from '@blocks/ContentGrid/config'
import { ExampleTabs } from '@blocks/ExampleTabs/config'
import { FormBlock } from '@blocks/FormBlock/config'
import { HoverCards } from '@blocks/HoverCards/config'
import { HoverHighlights } from '@blocks/HoverHighlights/config'
import { LinkGrid } from '@blocks/LinkGrid/config'
import { LogoGrid } from '@blocks/LogoGrid/config'
import { MediaBlock } from '@blocks/MediaBlock/config'
import { MediaContent } from '@blocks/MediaContent/config'
import { MediaContentAccordion } from '@blocks/MediaContentAccordion/config'
import { PortfolioCards } from '@blocks/Portfolio/Cards/config'
import { PortfolioHighlight } from '@blocks/Portfolio/Highlight/config'
import { PortfolioParallax } from '@blocks/Portfolio/Parallax/config'
import { PricingBlock } from '@blocks/PricingBlock/config'
import { Slider } from '@blocks/Slider/config'
import { Statement } from '@blocks/Statement/config'
import { Steps } from '@blocks/Steps/config'
import { StickyHighlights } from '@blocks/StickyHighlights/config'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

import { ENABLED_REUSABLE_BLOCKS } from '@constants'

export const ReusableContent: CollectionConfig = {
  slug: 'reusable-content',
  labels: {
    plural: 'Reusable Contents',
    singular: 'Reusable Content'
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
    readVersions: isAdminOrEditor
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        ...(ENABLED_REUSABLE_BLOCKS.Banner ? [Banner] : []),
        ...(ENABLED_REUSABLE_BLOCKS.BlogContent ? [BlogContent] : []),
        ...(ENABLED_REUSABLE_BLOCKS.BlogMarkdown ? [BlogMarkdown] : []),
        ...(ENABLED_REUSABLE_BLOCKS.Callout ? [Callout] : []),
        ...(ENABLED_REUSABLE_BLOCKS.CallToAction ? [CallToAction] : []),
        ...(ENABLED_REUSABLE_BLOCKS.CardGrid ? [CardGrid] : []),
        ...(ENABLED_REUSABLE_BLOCKS.PortfolioCards ? [PortfolioCards] : []),
        ...(ENABLED_REUSABLE_BLOCKS.PortfolioHighlight
          ? [PortfolioHighlight]
          : []),
        ...(ENABLED_REUSABLE_BLOCKS.PortfolioParallax
          ? [PortfolioParallax]
          : []),
        ...(ENABLED_REUSABLE_BLOCKS.Code ? [Code] : []),
        ...(ENABLED_REUSABLE_BLOCKS.CodeFeature ? [CodeFeature] : []),
        ...(ENABLED_REUSABLE_BLOCKS.Content ? [Content] : []),
        ...(ENABLED_REUSABLE_BLOCKS.ContentGrid ? [ContentGrid] : []),
        ...(ENABLED_REUSABLE_BLOCKS.ExampleTabs ? [ExampleTabs] : []),
        ...(ENABLED_REUSABLE_BLOCKS.FormBlock ? [FormBlock] : []),
        ...(ENABLED_REUSABLE_BLOCKS.HoverCards ? [HoverCards] : []),
        ...(ENABLED_REUSABLE_BLOCKS.HoverHighlights ? [HoverHighlights] : []),
        ...(ENABLED_REUSABLE_BLOCKS.LinkGrid ? [LinkGrid] : []),
        ...(ENABLED_REUSABLE_BLOCKS.LogoGrid ? [LogoGrid] : []),
        ...(ENABLED_REUSABLE_BLOCKS.MediaBlock ? [MediaBlock] : []),
        ...(ENABLED_REUSABLE_BLOCKS.MediaContent ? [MediaContent] : []),
        ...(ENABLED_REUSABLE_BLOCKS.MediaContentAccordion
          ? [MediaContentAccordion]
          : []),
        ...(ENABLED_REUSABLE_BLOCKS.PricingBlock ? [PricingBlock] : []),
        ...(ENABLED_REUSABLE_BLOCKS.Slider ? [Slider] : []),
        ...(ENABLED_REUSABLE_BLOCKS.Statement ? [Statement] : []),
        ...(ENABLED_REUSABLE_BLOCKS.Steps ? [Steps] : []),
        ...(ENABLED_REUSABLE_BLOCKS.StickyHighlights ? [StickyHighlights] : [])
      ],
      required: true
    }
  ]
}
