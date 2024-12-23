import path from 'path'
import { fileURLToPath } from 'url'

import { basicLexical } from '@services/editor/basicLexical'
import { mediaDarkModeFallback } from '@fields/darkModeFallback/media'
import { uploadAltField } from '@fields/uploadAlt/config'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig<'media'> = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media'
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  defaultPopulate: {
    alt: true,
    mediaDarkModeFallback: true,
    filename: true,
    height: true,
    mimeType: true,
    url: true,
    width: true
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'thumbnail',
      'title',
      'mimeType',
      'authors',
      'createdAt',
      'updatedAt'
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    ...uploadAltField(),
    {
      name: 'caption',
      type: 'richText',
      editor: basicLexical,
      admin: {
        description: 'Optional'
      }
    },
    mediaDarkModeFallback
  ],
  upload: {
    crop: true,
    displayPreview: true,
    focalPoint: true,
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300
      },
      {
        name: 'square',
        width: 500,
        height: 500
      },
      {
        name: 'small',
        width: 600
      },
      {
        name: 'medium',
        width: 900
      },
      {
        name: 'large',
        width: 1400
      },
      {
        name: 'xlarge',
        width: 1920
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center'
      }
    ],
    staticDir: path.resolve(dirname, '../../public/media')
  }
}
