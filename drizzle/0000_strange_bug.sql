CREATE TABLE IF NOT EXISTS "url" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(10) NOT NULL,
	"original_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "url_slug_unique" UNIQUE("slug")
);
