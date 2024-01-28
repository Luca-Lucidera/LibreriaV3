CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"email" text,
	"password" text,
	"date_of_birth" date,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now()
);
