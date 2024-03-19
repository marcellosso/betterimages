import {
  timestamp,
  pgTable,
  varchar,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";

export const userSubscriptions = pgTable(
  "subscriptions",
  {
    userId: varchar("user_id").notNull().unique(),
    monthlyCredits: integer("monthly_credits").notNull().default(0),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 })
      .notNull()
      .unique(),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 })
      .notNull()
      .unique(),
    stripePriceId: varchar("stripe_price_id", { length: 255 }).notNull(),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.stripeCustomerId] }),
    };
  }
);

export type UserSubscriptionType = typeof userSubscriptions.$inferSelect;

export const userCredits = pgTable("user_credits", {
  userId: varchar("user_id").notNull().unique(),
  credits: integer("credits").notNull().default(0),
});

export type UserCreditsType = typeof userCredits.$inferSelect;
