import { generatePreviewPath } from '@utils/generatePreviewPath'

import type { CollectionSlug, LivePreviewConfig } from 'payload'

export const getLivePreviewUrl = (
  collection: CollectionSlug
): LivePreviewConfig => ({
  url: ({ data, req }) => {
    const path = generatePreviewPath({
      slug: typeof data?.slug === 'string' ? data.slug : '',
      collection,
      req
    })

    return path
  }
})
