// import { slateEditor } from '@payloadcms/richtext-slate'
import { revalidatePath } from 'next/cache'

import { getLivePreviewUrl } from '@lib/utils/getLivePreviewUrl'
import { getPreviewUrl } from '@lib/utils/getPreviewUrl'

import { isAdminOrEditor } from '@services/access/isAdminOrEditor'
import { isAdminOrSelf } from '@services/access/isAdminOrSelf'
import { publishedOnly } from '@services/access/publishedOnly'
import { slugField } from '@fields/slug/config'

import type { CollectionConfig } from 'payload'

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
    // richText({
    //   name: 'introContent'
    // }),
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
        Callout,
        CallToAction,
        CardGrid,
        CaseStudyCards,
        CaseStudiesHighlight,
        CaseStudyParallax,
        CodeFeature,
        Content,
        ContentGrid,
        Form,
        HoverCards,
        HoverHighlights,
        LinkGrid,
        LogoGrid,
        MediaBlock,
        MediaContent,
        MediaContentAccordion,
        Pricing,
        ReusableContent,
        Slider,
        Statement,
        Steps,
        StickyHighlights,
        ExampleTabs
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
