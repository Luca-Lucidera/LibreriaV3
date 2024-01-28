CREATE TABLE IF NOT EXISTS "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"price" numeric NOT NULL,
	"comment" varchar,
	"rating" numeric DEFAULT '0',
	"cover" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "table_headers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"can_sort" boolean DEFAULT false NOT NULL
);
