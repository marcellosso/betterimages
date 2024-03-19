import { db } from "../db";
import { userCredits, userSubscriptions } from "../db/schema/subscriptions";
import { eq } from "drizzle-orm";
import { storeSubscriptionPlans } from "@/config/subscriptions";
import { stripe } from ".";
import { getUserAuth } from "../auth/utils";

export async function getUserCredits(userId: string | null) {
  if (!userId) return 0;

  const res = await db
    .select()
    .from(userCredits)
    .where(eq(userCredits.userId, userId));

  const credits = res?.[0]?.credits || 0;
  return credits;
}

export async function getUserSubscriptionPlan() {
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
        (p) => p.stripePriceId === subscription.stripePriceId
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
    isSubscribed,
    isCanceled,
  };
}
