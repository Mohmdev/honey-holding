import { buildConfig, type CollectionConfig } from 'payload'
import sharp from 'sharp'
import { emailAdapter } from '@/services/email/config'
import { adminConfig } from '@/services/admin/config'
import { databaseAdapter } from '@/services/database/config'
import { defaultLexical } from '@/services/editor/defaultLexical'
import { plugins } from '@/services/plugins'
//
import { Users } from '@/CMS/Users/config'
import { Media } from '@/CMS/Media/config'
import { Assets } from '@/CMS/Assets/config'

import { getServerSideURL } from '@/lib/utils/getURL'
const groupCollections = (
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

export default buildConfig({
  collections: [
    ...groupCollections('Settings', [Users]),
    ...groupCollections('Uploads', [Media, Assets])
  ],
  sharp,
  admin: adminConfig,
  email: emailAdapter,
  db: databaseAdapter,
  // plugins: [...plugins],
  // editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET,
  cors: [getServerSideURL()].filter(Boolean),
  typescript: { outputFile: 'src/lib/payload-types.ts' }
})
