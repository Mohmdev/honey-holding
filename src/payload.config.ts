import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { getServerSideURL } from '@/lib/utilities/getURL'

// Core
import { plugins } from '@/lib/plugins'
import { defaultLexical } from '@/lib/editor/defaultLexical'

// Modules
import { Pages } from '@/modules/content/Pages/config'
import { Posts } from '@/modules/content/Posts/config'
import { Categories } from '@/modules/content/Categories/config'
import { Media } from '@/modules/uploads/Media/config'
import { Assets } from '@/modules/uploads/Assets/config'
import { Footer } from '@/modules/customize/Footer/config'
import { Header } from '@/modules/customize/Header/config'
// import { SiteInformation } from '@/modules/customize/SiteInformation'
// import { ContactInformation } from '@/modules/customize/ContactInformation'
// import { SiteGraphics } from '@/modules/customize/SiteGraphics'
import { Users } from '@/modules/settings/Users/config'
import { GettingStarted } from './modules/support/GettingStarted/config'
import { Docs } from './modules/support/Docs/config'
import { Tickets } from './modules/support/Tickets/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [
    // Content
    Pages,
    Posts,
    Categories,
    // Uploads
    Media,
    Assets,
    // Settings
    Users,
    // Support
    GettingStarted,
    Docs,
    Tickets,
  ],
  globals: [
    // Customize
    Header,
    Footer,
    // SiteGraphics,
    // SiteInformation,
    // ContactInformation,
  ],
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI,
    },
    migrationDir: './src/lib/migrations',
    // prodMigrations: migrations,
  }),
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
