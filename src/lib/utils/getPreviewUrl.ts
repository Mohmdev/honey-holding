import { generatePreviewPath } from '@utils/generatePreviewPath'

import type { CollectionSlug, GeneratePreviewURL } from 'payload'

export const getPreviewUrl = (
  collection: CollectionSlug
): GeneratePreviewURL => {
  return (data, { req }) =>
    generatePreviewPath({
      slug: typeof data?.slug === 'string' ? data.slug : '',
      collection,
      req
    })
}
