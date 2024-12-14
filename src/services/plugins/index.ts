import { formBuilderPluginConfig } from './formBuilder'
import { nestedDocsPluginConfig } from './nestedDocs'
import { redirectsPluginConfig } from './redirects'
import { searchPluginConfig } from './search'
import { s3StoragePlugin } from './s3Storage'
import { seoPluginConfig } from './seo'

import type { Plugin } from 'payload'

export const plugins: Plugin[] = [
  s3StoragePlugin,
  redirectsPluginConfig,
  nestedDocsPluginConfig,
  searchPluginConfig,
  formBuilderPluginConfig,
  seoPluginConfig
]
