import type { CollectionSlug } from 'payload'

const ENABLED_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'posts',
  'portfolio'
] as const

const ROLES_WITH_ADMIN_ACCESS = ['admin', 'editor'] as const

const DASHBOARD_SLUG = 'dashboard'

export { ENABLED_COLLECTIONS, ROLES_WITH_ADMIN_ACCESS, DASHBOARD_SLUG }
