ALTER TABLE "user_credits" ADD COLUMN "stripe_customer_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "user_credits" ADD CONSTRAINT "user_credits_stripe_customer_id_unique" UNIQUE("stripe_customer_id");