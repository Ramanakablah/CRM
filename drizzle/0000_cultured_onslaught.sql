CREATE TABLE IF NOT EXISTS "Leads" (
	"leadid" serial PRIMARY KEY NOT NULL,
	"customerId" integer NOT NULL,
	"client_name" text NOT NULL,
	"contact" text,
	"purpose" text,
	"email" text NOT NULL,
	"status" text DEFAULT 'Neutral',
	"created_at" date DEFAULT now(),
	"read" boolean DEFAULT false,
	"response" text,
	"readat" date,
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Customers" (
	"customerid" serial PRIMARY KEY NOT NULL,
	"Customerame" text NOT NULL,
	"customerimage" text,
	"created_at" date DEFAULT now(),
	"customertkey" integer NOT NULL,
	"status" boolean DEFAULT false NOT NULL,
	CONSTRAINT "Customers_customertkey_unique" UNIQUE("customertkey")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Leads" ADD CONSTRAINT "Leads_customerId_Customers_customertkey_fk" FOREIGN KEY ("customerId") REFERENCES "Customers"("customertkey") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
