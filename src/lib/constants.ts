import type { CollectionSlug, GlobalSlug } from 'payload'

export const ROLES_WITH_ADMIN_ACCESS = ['admin', 'editor'] as const
export const DASHBOARD_SLUG = 'dashboard'

export const ENABLED_COLLECTIONS: CollectionSlug[] = [
  // 'pages',
  // 'posts',
  'portfolio'
] as const
export const PREVIEWABLE_COLLECTIONS: CollectionSlug[] = [
  // 'pages',
  // 'posts',
  'portfolio'
] as const
export const LINKABLE_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'posts',
  'portfolio'
] as const

export const ENABLED_PLUGINS = {
  s3Storage: true,
  formBuilder: true,
  seo: true,
  redirects: true,
  nestedDocs: true,
  search: false
} as const
export const REDIRECTABLE_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'posts',
  'portfolio'
] as const
export const NESTED_COLLECTIONS: CollectionSlug[] = [
  //
  'pages',
  'categories'
] as const
export const INDEXED_COLLECTIONS: CollectionSlug[] = [
  //
  'posts'
] as const
export const INDEXED_TAXONOMY_COLLECTIONS: CollectionSlug[] = [
  //
  'categories'
] as const
export const SEO_ENABLED_COLLECTIONS: CollectionSlug[] = [
  'portfolio',
  'pages',
  'posts'
] as const
export const SEO_ENABLED_GLOBALS: GlobalSlug[] = [
  // 'get-started',
] as const

export const ENABLED_REUSABLE_BLOCKS = {
  Banner: true,
  BlogContent: true,
  Code: true,
  CodeFeature: true,
  Slider: true,
  Statement: true,
  StickyHighlights: true,
  BlogMarkdown: true,
  MediaBlock: true,
  HoverHighlights: true,
  //
  HoverCards: false,
  Callout: false,
  CallToAction: false,
  CardGrid: false,
  PortfolioCards: false,
  PortfolioHighlight: false,
  PortfolioParallax: false,
  Content: false,
  ContentGrid: false,
  ExampleTabs: false,
  FormBlock: false,
  LinkGrid: false,
  LogoGrid: false,
  MediaContent: false,
  MediaContentAccordion: false,
  PricingBlock: false,
  Steps: false
} as const

export const ENABLED_PORTFOLIO_BLOCKS = {
  Callout: true,
  CallToAction: true,
  CardGrid: true,
  CodeFeature: true,
  Slider: true,
  Statement: true,
  StickyHighlights: true,
  HoverHighlights: true,
  //
  HoverCards: false,
  PortfolioCards: false,
  PortfolioHighlight: false,
  PortfolioParallax: false,
  Content: false,
  ContentGrid: false,
  FormBlock: false,
  LinkGrid: false,
  LogoGrid: false,
  MediaBlock: false,
  MediaContent: false,
  MediaContentAccordion: false,
  PricingBlock: false,
  ReusableContent: false,
  Steps: false,
  ExampleTabs: false
} as const

export const ENABLED_PAGE_BLOCKS = {
  CardGrid: true,
  Slider: true,
  Statement: true,
  CodeFeature: true,
  StickyHighlights: true,
  Callout: true,
  Steps: true,
  CallToAction: true,
  Content: true,
  ContentGrid: true,
  FormBlock: true,
  HoverCards: true,
  HoverHighlights: true,
  LinkGrid: true,
  MediaContent: true,
  MediaContentAccordion: true,
  LogoGrid: true,
  PortfolioCards: true,
  PortfolioHighlight: true,
  PortfolioParallax: true,
  PricingBlock: true,
  ReusableContent: true,
  //
  MediaBlock: true,
  ExampleTabs: true
} as const
