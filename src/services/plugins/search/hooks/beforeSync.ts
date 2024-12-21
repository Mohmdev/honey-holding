import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

import { INDEXED_TAXONOMY_COLLECTIONS } from '@constants'

export const beforeSyncWithSearch: BeforeSync = async ({
  originalDoc,
  searchDoc,
  payload
}) => {
  const {
    doc: { relationTo: collection }
  } = searchDoc

  const { slug, id, categories, title, meta, excerpt } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description
    },
    categories: []
  }

  // Checks if document has categories
  if (categories && Array.isArray(categories) && categories.length > 0) {
    // get full categories and keep a flattened copy of their most important properties
    try {
      // Maps each category to a simplified format
      const mappedCategories = categories.map((category) => {
        const { id, title } = category

        return {
          relationTo: INDEXED_TAXONOMY_COLLECTIONS,
          id,
          title
        }
      })

      modifiedDoc.categories = mappedCategories
    } catch (err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`
      )
    }
  }

  return modifiedDoc
}
