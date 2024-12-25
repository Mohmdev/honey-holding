import { buildConfig } from 'payload'
import sharp from 'sharp'

import { getServerSideURL } from '@utils/getURL'
import { collectionGroup, globalGroup } from '@utils/groupContent'

import { Assets } from '@CMS/Assets/config'
import { Categories } from '@CMS/Categories/config'
import { Docs } from '@CMS/Docs/config'
import { Footer } from '@CMS/Footer/config'
import { GlobalSettings } from '@CMS/GlobalSettings/config'
import { MainMenu } from '@CMS/MainMenu/config'
import { Media } from '@CMS/Media/config'
import { Pages } from '@CMS/Pages/config'
import { Portfolio } from '@CMS/Portfolio/config'
import { Posts } from '@CMS/Posts/config'
import { ReusableContent } from '@CMS/ReusableContent/config'
import { Tickets } from '@CMS/Tickets/config'
import { Users } from '@CMS/Users/config'
import { adminConfig } from '@services/admin/config'
import { MongooseAdapter } from '@services/database/config'
import { defaultLexical } from '@services/editor/defaultLexical'
import { emailAdapter } from '@services/email/config'
import { plugins } from '@services/plugins'

export default buildConfig({
  collections: [
    ...collectionGroup('Content', [
      Pages,
      Portfolio,
      Posts,
      Categories,
      ReusableContent
    ]),
    ...collectionGroup('Uploads', [Media, Assets]),
    ...collectionGroup('Settings', [Users]),
    ...collectionGroup('Support', [Docs, Tickets])
  ],
  globals: [...globalGroup('Customize', [GlobalSettings, MainMenu, Footer])],
  defaultDepth: 1,
  sharp,
  admin: adminConfig,
  email: emailAdapter,
  db: MongooseAdapter,
  plugins: [...plugins],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  cors: [getServerSideURL()].filter(Boolean),
  typescript: { outputFile: 'src/CMS/payload-types.ts' },
  cookiePrefix: 'nexweb',
  // csrf: [process.env.NEXT_PUBLIC_SERVER_URL].filter(Boolean),
  // debug: true,
  telemetry: false
})
