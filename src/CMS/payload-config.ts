import { buildConfig } from 'payload'
import sharp from 'sharp'

import { getServerSideURL } from '@utils/getURL'
import { collectionGroup, globalGroup } from '@utils/groupContent'

import { Assets } from '@CMS/Assets/config'
import { Categories } from '@CMS/Categories/config'
import { Docs } from '@CMS/Docs/config'
import { Footer } from '@CMS/Footer/config'
import { MainMenu } from '@CMS/MainMenu/config'
import { Media } from '@CMS/Media/config'
import { Pages } from '@CMS/Pages/config'
import { Posts } from '@CMS/Posts/config'
import { Tickets } from '@CMS/Tickets/config'
//
import { Users } from '@CMS/Users/config'
import { adminConfig } from '@services/admin/config'
import { databaseAdapter } from '@services/database/config'
import { defaultLexical } from '@services/editor/defaultLexical'
import { emailAdapter } from '@services/email/config'
import { plugins } from '@services/plugins'

export default buildConfig({
  collections: [
    ...collectionGroup('Content', [Pages, Posts, Categories]),
    ...collectionGroup('Uploads', [Media, Assets]),
    ...collectionGroup('Settings', [Users]),
    ...collectionGroup('Support', [Docs, Tickets])
  ],
  globals: [...globalGroup('Navigation', [MainMenu, Footer])],
  sharp,
  admin: adminConfig,
  email: emailAdapter,
  db: databaseAdapter,
  plugins: [...plugins],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET,
  cors: [getServerSideURL()].filter(Boolean),
  typescript: { outputFile: 'src/CMS/payload-types.ts' }
})
