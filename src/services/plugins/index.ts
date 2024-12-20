import type { Plugin } from 'payload'

import { formBuilderPluginConfig } from './formBuilder'
import { nestedDocsPluginConfig } from './nestedDocs'
import { redirectsPluginConfig } from './redirects'
import { s3StoragePlugin } from './s3Storage'
import { searchPluginConfig } from './search'
import { seoPluginConfig } from './seo'

import { ENABLED_PLUGINS } from '@constants'

export const plugins: Plugin[] = [
  ...(ENABLED_PLUGINS.s3Storage ? [s3StoragePlugin] : []),
  ...(ENABLED_PLUGINS.formBuilder ? [formBuilderPluginConfig] : []),
  ...(ENABLED_PLUGINS.seo ? [seoPluginConfig] : []),
  ...(ENABLED_PLUGINS.redirects ? [redirectsPluginConfig] : []),
  ...(ENABLED_PLUGINS.nestedDocs ? [nestedDocsPluginConfig] : []),
  ...(ENABLED_PLUGINS.search ? [searchPluginConfig] : [])
]
