import path from 'path'
import { fileURLToPath } from 'url'

import { uploadDarkModeFallback } from '@/fields/uploadDarkModeFallback'

import { anyone } from '@access/anyone'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrEditorOrSelf } from '@access/isAdminOrEditorOrSelf'

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
    delete: isAdminOrEditorOrSelf,
    update: isAdminOrEditorOrSelf
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
  fields: [
    uploadDarkModeFallback,
    {
      name: 'alt',
      type: 'text',
      required: true
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
