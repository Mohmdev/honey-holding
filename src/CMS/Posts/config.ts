import { revalidatePath } from 'next/cache'

import { getLivePreviewUrl } from '@utils/getLivePreviewUrl'
import { getPreviewUrl } from '@utils/getPreviewUrl'

import { Banner } from '@blocks/Banner/config'
import { BlogContent } from '@blocks/BlogContent/config'
import { BlogMarkdown } from '@blocks/BlogMarkdown/config'
import { Code } from '@blocks/Code/config'
import { MediaBlock } from '@blocks/MediaBlock/config'
import { ReusableContent } from '@blocks/ReusableContent/config'
import richText from '@fields/richText'
import { slugField } from '@fields/slug/config'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'
import { publishedOnly } from '@access/publishedOnly'

import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts'
  },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
    readVersions: isAdminOrEditor
  },
  admin: {
    livePreview: getLivePreviewUrl('posts'),
    preview: getPreviewUrl('posts')
  },
  defaultPopulate: {
    slug: true,
    authors: true,
    image: true,
    publishedOn: true,
    title: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'useVideo',
      type: 'checkbox',
      label: 'Use Youtube video as header image'
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.useVideo
      },
      label: 'Video URL'
    },
    richText({
      name: 'excerpt'
    }),
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        Banner,
        BlogContent,
        Code,
        BlogMarkdown,
        MediaBlock,
        ReusableContent
      ],
      required: true
    },
    {
      name: 'lexicalContent',
      type: 'richText'
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id]
          }
        }
      },
      hasMany: true,
      relationTo: 'posts'
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
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        },
        position: 'sidebar'
      },
      required: true
    }
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePath(`/blog/${doc.slug}`)
        revalidatePath(`/blog`, 'page')
        console.log(`Revalidated: /blog/${doc.slug}`)
      }
    ]
  },
  versions: {
    drafts: true
  }
}
