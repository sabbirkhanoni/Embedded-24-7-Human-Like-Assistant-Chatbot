CREATE TABLE "startupdata" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_email" text NOT NULL,
	"business_name" text NOT NULL,
	"industry" text NOT NULL,
	"description" text NOT NULL,
	"external_url" text NOT NULL,
	"website" text NOT NULL,
	"created_at" text DEFAULT now()
);
