CREATE TABLE IF NOT EXISTS "Leads" (
	"leadid" serial PRIMARY KEY NOT NULL,
	"customerId" integer NOT NULL,
	"contact" text,
	"purpose" text,
	"email" text NOT NULL,
	"status" text DEFAULT 'Neutral',
	"read" boolean DEFAULT false,
	"response" text,
	"readat" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Customers" (
	"customerid" serial PRIMARY KEY NOT NULL,
	"Name" text NOT NULL,
	"customerimage" text,
	"created_at" date DEFAULT now(),
	"customertkey" integer NOT NULL,
	"status" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Leads" ADD CONSTRAINT "Leads_customerId_Customers_customertkey_fk" FOREIGN KEY ("customerId") REFERENCES "Customers"("customertkey") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
