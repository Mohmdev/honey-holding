import { buildConfig } from 'payload'
import sharp from 'sharp'
import { emailAdapter } from '@/services/email/config'
import { adminConfig } from '@/services/admin/config'
import { databaseAdapter } from '@/services/database/config'
import { defaultLexical } from '@/services/editor/defaultLexical'
import { plugins } from '@/services/plugins'
//
// import { Categories } from '@/collections/Categories/config'
// import { Media } from '@/collections/Media/config'
// import { Orders } from '@/collections/Orders'
// import { Pages } from '@/collections/Pages/config'
// import { Products } from '@/collections/Products/config'
// import { Users } from '@/collections/Users/config'
// import { Footer } from '@/globals/Footer'
// import { Header } from '@/globals/Header'
// import { Posts } from '@/collections/Posts/config'
import { getServerSideURL } from '@/lib/utils/getURL'

export default buildConfig({
  // globals: [Header, Footer],
  // collections: [
  //   Products,
  //   Orders,
  //   // Content
  //   Pages,
  //   Posts,
  //   Categories,
  //   Media,
  //   // Settings
  //   Users
  // ],
  sharp,
  admin: adminConfig,
  email: emailAdapter,
  db: databaseAdapter,
  plugins: [...plugins],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET,
  cors: [getServerSideURL()].filter(Boolean),
  typescript: { outputFile: 'payload.types.ts' }
})
