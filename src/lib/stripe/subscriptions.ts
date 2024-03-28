import { db } from "../db";
import { userCredits, userSubscriptions } from "../db/schema/subscriptions";
import { eq } from "drizzle-orm";
import {
  SubscriptionPlan,
  storeSubscriptionPlans,
} from "@/config/subscriptions";
import { stripe } from ".";
import { getUserAuth } from "../auth/utils";

export async function getUserCredits(userId: string | null) {
  const [credits] = await db
    .select()
    .from(userCredits)
    .where(eq(userCredits.userId, userId ?? ""));

  if (!credits) {
    return {
      credits: 0,
      stripeCustomerId: null,
    };
  }

  return credits;
}

export async function getUserSubscriptionPlan(): Promise<
  Partial<SubscriptionPlan> & { [key: string]: any }
> {
  const { session } = await getUserAuth();

  const [subscription] = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.userId, session?.user.id ?? ""));

  if (!subscription) {
    return {
      id: undefined,
      name: undefined,
      description: undefined,
      stripePriceId: undefined,
      price: undefined,
      limitations: undefined,
      stripeSubscriptionId: null,
      stripeCurrentPeriodEnd: null,
      stripeCustomerId: null,
      isSubscribed: false,
      isCanceled: false,
    };
  }

  const isSubscribed =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd &&
    subscription.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now(); // 1 day of extra time

  const plan = isSubscribed
    ? storeSubscriptionPlans.find(
        (p) =>
          p.monthlyStripePriceId === subscription.stripePriceId ||
          p.yearlyStripePriceId === subscription.stripePriceId
      )
    : undefined;

  let isCanceled = false;
  if (isSubscribed && subscription.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionid: subscription.stripeSubscriptionId,
    stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd,
    stripeCustomerId: subscription.stripeCustomerId,
    stripePriceId: subscription.stripePriceId,
    isSubscribed,
    isCanceled,
  };
}
