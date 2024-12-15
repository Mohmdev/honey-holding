import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_docs_dummy" AS ENUM('dummy');
  ALTER TABLE "docs" ADD COLUMN "dummy" "enum_docs_dummy" DEFAULT 'dummy';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "docs" DROP COLUMN IF EXISTS "dummy";
  DROP TYPE "public"."enum_docs_dummy";`)
}
