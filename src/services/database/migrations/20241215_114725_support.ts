import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "getting_started" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tickets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "getting_started_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tickets_id" integer;
  CREATE INDEX IF NOT EXISTS "getting_started_updated_at_idx" ON "getting_started" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "getting_started_created_at_idx" ON "getting_started" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tickets_updated_at_idx" ON "tickets" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tickets_created_at_idx" ON "tickets" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_getting_started_fk" FOREIGN KEY ("getting_started_id") REFERENCES "public"."getting_started"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tickets_fk" FOREIGN KEY ("tickets_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_getting_started_id_idx" ON "payload_locked_documents_rels" USING btree ("getting_started_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tickets_id_idx" ON "payload_locked_documents_rels" USING btree ("tickets_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "getting_started" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tickets" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "getting_started" CASCADE;
  DROP TABLE "tickets" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_getting_started_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tickets_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_getting_started_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_tickets_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "getting_started_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "tickets_id";`)
}
