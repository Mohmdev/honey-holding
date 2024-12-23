import path from 'path'
import { fileURLToPath } from 'url'

import { assetDarkModeFallback } from '@fields/darkModeFallback/asset'
import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Assets: CollectionConfig<'assets'> = {
  slug: 'assets',
  labels: {
    singular: 'Asset',
    plural: 'Assets'
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf
  },
  defaultPopulate: {
    alt: true,
    darkModeFallback: true,
    filename: true,
    height: true,
    mimeType: true,
    url: true,
    width: true
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
    assetDarkModeFallback,
    {
      name: 'alt',
      type: 'text',
      hooks: {}
    }
  ],
  upload: {
    crop: true,
    displayPreview: true,
    focalPoint: true,
    disableLocalStorage: true,
    staticDir: path.resolve(dirname, '../../public/assets')
  }
}
