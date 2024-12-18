import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_main_menu_tabs_description_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_tabs_nav_items_featured_link_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_tabs_nav_items_list_links_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_tabs_nav_items_style" AS ENUM('default', 'featured', 'list');
  CREATE TYPE "public"."enum_main_menu_tabs_nav_items_default_link_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_tabs_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_main_menu_menu_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_coloumns_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_description_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_main_menu_tabs_description_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_nav_items_featured_link_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_main_menu_tabs_nav_items_featured_link_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_nav_items_list_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_main_menu_tabs_nav_items_list_links_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_main_menu_tabs_nav_items_style" DEFAULT 'default',
  	"default_link_link_type" "enum_main_menu_tabs_nav_items_default_link_link_type" DEFAULT 'reference',
  	"default_link_link_new_tab" boolean,
  	"default_link_link_url" varchar,
  	"default_link_link_label" varchar,
  	"default_link_description" varchar,
  	"featured_link_tag" varchar,
  	"featured_link_label" jsonb,
  	"list_links_tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"enable_direct_link" boolean,
  	"enable_dropdown" boolean,
  	"link_type" "enum_main_menu_tabs_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"menu_cta_type" "enum_main_menu_menu_cta_type" DEFAULT 'reference',
  	"menu_cta_new_tab" boolean,
  	"menu_cta_url" varchar,
  	"menu_cta_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "main_menu_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "footer_coloumns_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_coloumns_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_coloumns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_description_links" ADD CONSTRAINT "main_menu_tabs_description_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_nav_items_featured_link_links" ADD CONSTRAINT "main_menu_tabs_nav_items_featured_link_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_nav_items_list_links_links" ADD CONSTRAINT "main_menu_tabs_nav_items_list_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs_nav_items" ADD CONSTRAINT "main_menu_tabs_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_tabs" ADD CONSTRAINT "main_menu_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."main_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_menu_rels" ADD CONSTRAINT "main_menu_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_coloumns_nav_items" ADD CONSTRAINT "footer_coloumns_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_coloumns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_coloumns" ADD CONSTRAINT "footer_coloumns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_description_links_order_idx" ON "main_menu_tabs_description_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_description_links_parent_id_idx" ON "main_menu_tabs_description_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_featured_link_links_order_idx" ON "main_menu_tabs_nav_items_featured_link_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_featured_link_links_parent_id_idx" ON "main_menu_tabs_nav_items_featured_link_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_list_links_links_order_idx" ON "main_menu_tabs_nav_items_list_links_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_list_links_links_parent_id_idx" ON "main_menu_tabs_nav_items_list_links_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_order_idx" ON "main_menu_tabs_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_nav_items_parent_id_idx" ON "main_menu_tabs_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_order_idx" ON "main_menu_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "main_menu_tabs_parent_id_idx" ON "main_menu_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_order_idx" ON "main_menu_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_parent_idx" ON "main_menu_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_path_idx" ON "main_menu_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "main_menu_rels_pages_id_idx" ON "main_menu_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "footer_coloumns_nav_items_order_idx" ON "footer_coloumns_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_coloumns_nav_items_parent_id_idx" ON "footer_coloumns_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_coloumns_order_idx" ON "footer_coloumns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_coloumns_parent_id_idx" ON "footer_coloumns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "main_menu_tabs_description_links" CASCADE;
  DROP TABLE "main_menu_tabs_nav_items_featured_link_links" CASCADE;
  DROP TABLE "main_menu_tabs_nav_items_list_links_links" CASCADE;
  DROP TABLE "main_menu_tabs_nav_items" CASCADE;
  DROP TABLE "main_menu_tabs" CASCADE;
  DROP TABLE "main_menu" CASCADE;
  DROP TABLE "main_menu_rels" CASCADE;
  DROP TABLE "footer_coloumns_nav_items" CASCADE;
  DROP TABLE "footer_coloumns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TYPE "public"."enum_main_menu_tabs_description_links_link_type";
  DROP TYPE "public"."enum_main_menu_tabs_nav_items_featured_link_links_link_type";
  DROP TYPE "public"."enum_main_menu_tabs_nav_items_list_links_links_link_type";
  DROP TYPE "public"."enum_main_menu_tabs_nav_items_style";
  DROP TYPE "public"."enum_main_menu_tabs_nav_items_default_link_link_type";
  DROP TYPE "public"."enum_main_menu_tabs_link_type";
  DROP TYPE "public"."enum_main_menu_menu_cta_type";
  DROP TYPE "public"."enum_footer_coloumns_nav_items_link_type";`)
}
