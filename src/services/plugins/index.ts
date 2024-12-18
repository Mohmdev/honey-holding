import type { Plugin } from 'payload'

import { formBuilderPluginConfig } from './formBuilder'
import { nestedDocsPluginConfig } from './nestedDocs'
import { redirectsPluginConfig } from './redirects'
import { s3StoragePlugin } from './s3Storage'
import { searchPluginConfig } from './search'
import { seoPluginConfig } from './seo'

export const plugins: Plugin[] = [
  s3StoragePlugin,
  redirectsPluginConfig,
  nestedDocsPluginConfig,
  searchPluginConfig,
  formBuilderPluginConfig,
  seoPluginConfig
]
