import { Banner } from '@blocks/Banner/config'
import { BlogContent } from '@blocks/BlogContent/config'
import { BlogMarkdown } from '@blocks/BlogMarkdown/config'
import { Callout } from '@blocks/Callout/config'
import { CallToAction } from '@blocks/CallToAction/config'
import { CardGrid } from '@blocks/CardGrid/config'
import { Code } from '@blocks/Code/config'
import { CodeFeature } from '@blocks/CodeFeature/config'
import { Content } from '@blocks/Content/config'
import { ContentGrid } from '@blocks/ContentGrid/config'
import { ExampleTabs } from '@blocks/ExampleTabs/config'
import { Form } from '@blocks/FormBlock/config'
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
import { Pricing } from '@blocks/Pricing/config'
import { Slider } from '@blocks/Slider/config'
import { Statement } from '@blocks/Statement/config'
import { Steps } from '@blocks/Steps/config'
import { StickyHighlights } from '@blocks/StickyHighlights/config'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

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
        Banner,
        BlogContent,
        BlogMarkdown,
        Callout,
        CallToAction,
        CardGrid,
        PortfolioCards,
        PortfolioHighlight,
        PortfolioParallax,
        Code,
        CodeFeature,
        Content,
        ContentGrid,
        ExampleTabs,
        Form,
        HoverCards,
        HoverHighlights,
        LinkGrid,
        LogoGrid,
        MediaBlock,
        MediaContent,
        MediaContentAccordion,
        Pricing,
        Slider,
        Statement,
        Steps,
        StickyHighlights
      ],
      required: true
    }
  ]
}
