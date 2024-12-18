import type { CollectionSlug } from 'payload'

const ENABLED_COLLECTIONS: CollectionSlug[] = ['pages', 'posts']

const ROLES_WITH_ADMIN_ACCESS = ['admin', 'editor'] as const

export { ENABLED_COLLECTIONS, ROLES_WITH_ADMIN_ACCESS }
