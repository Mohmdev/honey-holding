import type { CollectionSlug } from 'payload'

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
  // 'pages',
  // 'posts',
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
  // 'pages',
  // 'posts',
  'portfolio'
] as const
export const NESTED_COLLECTIONS: CollectionSlug[] = [
  //
  'pages'
  // 'categories'
] as const
export const INDEXED_COLLECTIONS: CollectionSlug[] = [
  //
  'posts'
] as const

export const ENABLED_REUSABLE_BLOCKS = {
  Banner: true,
  BlogContent: false,
  BlogMarkdown: false,
  Callout: false,
  CallToAction: false,
  CardGrid: false,
  PortfolioCards: false,
  PortfolioHighlight: false,
  PortfolioParallax: false,
  Code: false,
  CodeFeature: false,
  Content: false,
  ContentGrid: false,
  ExampleTabs: false,
  FormBlock: false,
  HoverCards: false,
  HoverHighlights: false,
  LinkGrid: false,
  LogoGrid: false,
  MediaBlock: false,
  MediaContent: false,
  MediaContentAccordion: false,
  PricingBlock: false,
  Slider: false,
  Statement: false,
  Steps: false,
  StickyHighlights: false
} as const

export const ENABLED_PORTFOLIO_BLOCKS = {
  Callout: true,
  CallToAction: true,
  CardGrid: false,
  PortfolioCards: false,
  PortfolioHighlight: false,
  PortfolioParallax: false,
  CodeFeature: false,
  Content: false,
  ContentGrid: false,
  FormBlock: false,
  HoverCards: false,
  HoverHighlights: false,
  LinkGrid: false,
  LogoGrid: false,
  MediaBlock: false,
  MediaContent: false,
  MediaContentAccordion: false,
  PricingBlock: false,
  ReusableContent: false,
  Slider: false,
  Statement: false,
  Steps: false,
  StickyHighlights: false,
  ExampleTabs: false
} as const

export const ENABLED_PAGE_BLOCKS = {
  Callout: true,
  CallToAction: false,
  CardGrid: false,
  PortfolioCards: false,
  PortfolioHighlight: false,
  PortfolioParallax: false,
  CodeFeature: false,
  Content: false,
  ContentGrid: false,
  FormBlock: false,
  HoverCards: false,
  HoverHighlights: false,
  LinkGrid: false,
  LogoGrid: false,
  MediaBlock: false,
  MediaContent: false,
  MediaContentAccordion: false,
  PricingBlock: false,
  ReusableContent: false,
  Slider: false,
  Statement: false,
  Steps: false,
  StickyHighlights: false,
  ExampleTabs: false
} as const
