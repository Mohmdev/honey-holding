// import { slateEditor } from '@payloadcms/richtext-slate'
import { revalidatePath } from 'next/cache'

import { getLivePreviewUrl } from '@utils/getLivePreviewUrl'
import { getPreviewUrl } from '@utils/getPreviewUrl'

import { Callout } from '@blocks/Callout/config'
import { CallToAction } from '@blocks/CallToAction/config'
import { CardGrid } from '@blocks/CardGrid/config'
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
import { ReusableContent } from '@blocks/ReusableContent/config'
import { Slider } from '@blocks/Slider/config'
import { Statement } from '@blocks/Statement/config'
import { Steps } from '@blocks/Steps/config'
import { StickyHighlights } from '@blocks/StickyHighlights/config'
import richText from '@fields/richText'
import { slugField } from '@fields/slug/config'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'
import { publishedOnly } from '@access/publishedOnly'

import type { CollectionConfig } from 'payload'

import { ENABLED_PORTFOLIO_BLOCKS } from '@constants'

export const Portfolio: CollectionConfig<'portfolio'> = {
  slug: 'portfolio',
  labels: {
    singular: 'Portfolio',
    plural: 'Portfolio'
  },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    readVersions: isAdminOrSelf,
    update: isAdminOrSelf
  },
  admin: {
    livePreview: getLivePreviewUrl('portfolio'),
    preview: getPreviewUrl('portfolio'),
    useAsTitle: 'title'
  },
  defaultPopulate: {
    slug: true,
    featuredImage: true,
    title: true,
    url: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    richText({
      name: 'introContent'
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'industry',
          type: 'text'
        },
        {
          name: 'useCase',
          type: 'text'
        }
      ]
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        ...(ENABLED_PORTFOLIO_BLOCKS.Callout ? [Callout] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.CallToAction ? [CallToAction] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.CardGrid ? [CardGrid] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.PortfolioCards ? [PortfolioCards] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.PortfolioHighlight
          ? [PortfolioHighlight]
          : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.PortfolioParallax
          ? [PortfolioParallax]
          : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.CodeFeature ? [CodeFeature] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.Content ? [Content] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.ContentGrid ? [ContentGrid] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.FormBlock ? [FormBlock] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.HoverCards ? [HoverCards] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.HoverHighlights ? [HoverHighlights] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.LinkGrid ? [LinkGrid] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.LogoGrid ? [LogoGrid] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.MediaBlock ? [MediaBlock] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.MediaContent ? [MediaContent] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.MediaContentAccordion
          ? [MediaContentAccordion]
          : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.PricingBlock ? [PricingBlock] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.ReusableContent ? [ReusableContent] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.Slider ? [Slider] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.Statement ? [Statement] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.Steps ? [Steps] : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.StickyHighlights
          ? [StickyHighlights]
          : []),
        ...(ENABLED_PORTFOLIO_BLOCKS.ExampleTabs ? [ExampleTabs] : [])
      ]
    },
    ...slugField(),
    {
      name: 'url',
      type: 'text',
      admin: {
        position: 'sidebar'
      },
      label: 'URL'
    }
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePath(`/portfolio/${doc.slug}`)
        revalidatePath(`/portfolio`, 'page')
        console.log(`Revalidated: /portfolio/${doc.slug}`)
      }
    ]
  },
  versions: {
    drafts: true
  }
}
