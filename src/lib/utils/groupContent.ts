import type { CollectionConfig, GlobalConfig } from 'payload'

export const collectionGroup = (
  group: string,
  collections: CollectionConfig[]
): CollectionConfig[] => {
  return collections.map((collection) => {
    return {
      ...collection,
      admin: {
        ...collection.admin,
        group
      }
    }
  })
}

export const globalGroup = (
  group: string,
  globals: GlobalConfig[]
): GlobalConfig[] => {
  return globals.map((global) => {
    return {
      ...global,
      admin: {
        ...global.admin,
        group
      }
    }
  })
}
