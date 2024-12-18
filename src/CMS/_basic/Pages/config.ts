import { getLivePreviewUrl } from '@utils/getLivePreviewUrl'
import { getPreviewUrl } from '@utils/getPreviewUrl'
import { populatePublishedAt } from '@hooks/populatePublishedAt'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField
} from '@payloadcms/plugin-seo/fields'
import { CallToAction } from '@blocks/_basic/CallToAction/config'
import { Archive } from '@blocks/ArchiveBlock/config'
import { Content } from '@blocks/Content/config'
import { FormBlock } from '@blocks/Form/config'
import { MediaBlock } from '@blocks/MediaBlock/config'
import { hero } from '@fields/_basic/heros/config'
import { slugField } from '@fields/slug/config'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'
import { publishedOnly } from '@access/publishedOnly'

import type { CollectionConfig } from 'payload'

import { revalidateDelete, revalidatePage } from './revalidatePage'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages'
  },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: getLivePreviewUrl('pages'),
    preview: getPreviewUrl('pages'),
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
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
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: false
              }
            }
          ],
          label: 'Content'
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image'
            }),
            MetaTitleField({
              hasGenerateFn: true
            }),
            MetaImageField({
              relationTo: 'media'
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description'
            })
          ]
        }
      ]
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar'
      }
    },
    ...slugField()
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    beforeDelete: [revalidateDelete]
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100 // We set this interval for optimal live preview
      }
    },
    maxPerDoc: 50
  }
}
