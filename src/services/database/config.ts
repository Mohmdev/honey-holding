import { mongooseAdapter } from '@payloadcms/db-mongodb'

// import { postgresAdapter } from '@payloadcms/db-postgres'

import type { Config } from 'payload'

export const MongooseAdapter: Config['db'] = mongooseAdapter({
  url: process.env.DATABASE_URI || '',
  connectOptions: {
    dbName: process.env.DATABASE_NAME || 'production'
  },
  migrationDir: './src/services/database/migrations'
})

// export const PostgresAdapter: Config['db'] = postgresAdapter({
//   pool: {
//     connectionString: process.env.POSTGRES_URI
//   },

//   // prodMigrations: migrations,
//   migrationDir: './src/services/database/migrations'
// })
