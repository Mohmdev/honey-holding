import { postgresAdapter } from '@payloadcms/db-postgres'
// import { mongooseAdapter } from '@payloadcms/db-mongodb'

import type { Config } from 'payload'

export const databaseAdapter: Config['db'] = postgresAdapter({
  pool: {
    connectionString: process.env.POSTGRES_URI
  },

  // prodMigrations: migrations,
  migrationDir: '@services/database/migrations'
})
