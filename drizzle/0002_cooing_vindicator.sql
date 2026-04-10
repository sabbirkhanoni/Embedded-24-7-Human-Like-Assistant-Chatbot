CREATE TABLE "prompts" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_email" text NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"status" text NOT NULL,
	"source_url" text NOT NULL,
	"content" text,
	"metadata" text,
	"created_at" text DEFAULT now()
);
