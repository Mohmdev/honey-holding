import { Plugin } from 'payload'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3StoragePlugin } from './s3Storage'
import { formBuilderPluginConfig } from '../../modules/settings/FormBuilder/config.plugin'
import { redirectsPluginConfig } from '../../modules/settings/Redirects/config.plugin'
import { searchPluginConfig } from '@/modules/settings/Search/config.plugin'
import { nestedDocsPluginConfig } from './nestedDocs'
import { seoPluginConfig } from './seo'

export const plugins: Plugin[] = [
  s3StoragePlugin,
  redirectsPluginConfig,
  nestedDocsPluginConfig,
  seoPluginConfig,
  formBuilderPluginConfig,
  searchPluginConfig,
  payloadCloudPlugin(),
]
