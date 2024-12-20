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
import { fullTitle } from '@fields/fullTitle/config'
import { hero } from '@fields/hero/config'
import { slugField } from '@fields/slug/config'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'
import { publishedOnly } from '@access/publishedOnly'

import type { CollectionConfig } from 'payload'

import { ENABLED_PAGE_BLOCKS } from '@constants'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
    readVersions: isAdminOrEditor
  },
  admin: {
    useAsTitle: 'fullTitle',
    defaultColumns: ['fullTitle', 'authors', 'slug', 'createdAt', 'updatedAt'],
    livePreview: getLivePreviewUrl('pages'),
    preview: getPreviewUrl('pages')
  },
  defaultPopulate: {
    slug: true,
    breadcrumbs: true,
    title: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    fullTitle,
    {
      name: 'noindex',
      type: 'checkbox',
      admin: {
        position: 'sidebar'
      },
      label: 'No Index'
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero'
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                ...(ENABLED_PAGE_BLOCKS.Callout ? [Callout] : []),
                ...(ENABLED_PAGE_BLOCKS.CallToAction ? [CallToAction] : []),
                ...(ENABLED_PAGE_BLOCKS.CardGrid ? [CardGrid] : []),
                ...(ENABLED_PAGE_BLOCKS.PortfolioCards ? [PortfolioCards] : []),
                ...(ENABLED_PAGE_BLOCKS.PortfolioHighlight
                  ? [PortfolioHighlight]
                  : []),
                ...(ENABLED_PAGE_BLOCKS.PortfolioParallax
                  ? [PortfolioParallax]
                  : []),
                ...(ENABLED_PAGE_BLOCKS.CodeFeature ? [CodeFeature] : []),
                ...(ENABLED_PAGE_BLOCKS.Content ? [Content] : []),
                ...(ENABLED_PAGE_BLOCKS.ContentGrid ? [ContentGrid] : []),
                ...(ENABLED_PAGE_BLOCKS.FormBlock ? [FormBlock] : []),
                ...(ENABLED_PAGE_BLOCKS.HoverCards ? [HoverCards] : []),
                ...(ENABLED_PAGE_BLOCKS.HoverHighlights
                  ? [HoverHighlights]
                  : []),
                ...(ENABLED_PAGE_BLOCKS.LinkGrid ? [LinkGrid] : []),
                ...(ENABLED_PAGE_BLOCKS.LogoGrid ? [LogoGrid] : []),
                ...(ENABLED_PAGE_BLOCKS.MediaBlock ? [MediaBlock] : []),
                ...(ENABLED_PAGE_BLOCKS.MediaContent ? [MediaContent] : []),
                ...(ENABLED_PAGE_BLOCKS.MediaContentAccordion
                  ? [MediaContentAccordion]
                  : []),
                ...(ENABLED_PAGE_BLOCKS.PricingBlock ? [PricingBlock] : []),
                ...(ENABLED_PAGE_BLOCKS.ReusableContent
                  ? [ReusableContent]
                  : []),
                ...(ENABLED_PAGE_BLOCKS.Slider ? [Slider] : []),
                ...(ENABLED_PAGE_BLOCKS.Statement ? [Statement] : []),
                ...(ENABLED_PAGE_BLOCKS.Steps ? [Steps] : []),
                ...(ENABLED_PAGE_BLOCKS.StickyHighlights
                  ? [StickyHighlights]
                  : []),
                ...(ENABLED_PAGE_BLOCKS.ExampleTabs ? [ExampleTabs] : [])
              ],
              required: true
            }
          ],
          label: 'Content'
        }
      ]
    },
    ...slugField(),
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar'
      },
      hasMany: true,
      relationTo: 'users',
      required: true
    }
  ],
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        if (
          doc._status === 'published' ||
          doc._status !== previousDoc._status
        ) {
          if (doc.breadcrumbs && doc.breadcrumbs.length > 0) {
            revalidatePath(doc.breadcrumbs[doc.breadcrumbs.length - 1].url)
            console.log(
              `Revalidated: ${doc.breadcrumbs[doc.breadcrumbs.length - 1].url}`
            )
            if (doc.breadcrumbs[0].url === '/home') {
              revalidatePath('/')
              console.log(`Revalidated: /`)
            }
          } else {
            revalidatePath(`/${doc.slug}`)
            console.log(`Revalidated: /${doc.slug}`)
            if (doc.slug === 'home') {
              revalidatePath('/')
              console.log(`Revalidated: /`)
            }
          }
        }
      }
    ]
  },
  versions: {
    drafts: true
  }
}
