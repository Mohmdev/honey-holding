import { buildConfig } from 'payload'
import sharp from 'sharp'
import { emailAdapter } from '@/services/email/config'
import { adminConfig } from '@/services/admin/config'
import { databaseAdapter } from '@/services/database/config'
import { defaultLexical } from '@/services/editor/defaultLexical'
import { plugins } from '@/services/plugins'
import { collectionGroup } from '@/utils/groupContent'
import { getServerSideURL } from '@/lib/utils/getURL'
//
import { Users } from '@/CMS/Users/config'
import { Media } from '@/CMS/Media/config'
import { Assets } from '@/CMS/Assets/config'
import { Pages } from '@/CMS/Pages/config'
import { Posts } from '@/CMS/Posts/config'
import { Categories } from '@/CMS/Categories/config'

export default buildConfig({
  collections: [
    ...collectionGroup('Content', [Pages, Posts, Categories]),
    ...collectionGroup('Uploads', [Media, Assets]),
    ...collectionGroup('Settings', [Users])
  ],
  sharp,
  admin: adminConfig,
  email: emailAdapter,
  db: databaseAdapter,
  plugins: [...plugins],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET,
  cors: [getServerSideURL()].filter(Boolean),
  typescript: { outputFile: 'src/lib/payload-types.ts' }
})
