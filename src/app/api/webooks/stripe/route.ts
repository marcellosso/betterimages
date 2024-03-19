import { db } from "@/lib/db";
import { userSubscriptions } from "@/lib/db/schema/subscriptions";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature") ?? "";
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.metadata?.userId && session.customer == null) {
    console.error("session customer", session.customer);
    console.error("no metadata for userid");
    return new Response(null, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const updatedData = {
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      monthlyCredits: parseInt(subscription.metadata.monthly_credits),
    };

    if (session?.metadata?.userId != null) {
      const [sub] = await db
        .select()
        .from(userSubscriptions)
        .where(eq(userSubscriptions.userId, session.metadata.userId));

      if (sub != undefined) {
        await db
          .update(userSubscriptions)
          .set(updatedData)
          .where(eq(userSubscriptions.userId, sub.userId));
      } else {
        await db
          .insert(userSubscriptions)
          .values({ ...updatedData, userId: session.metadata.userId });
      }
    } else if (
      typeof session.customer === "string" &&
      session.customer != null
    ) {
      await db
        .update(userSubscriptions)
        .set(updatedData)
        .where(eq(userSubscriptions.stripeCustomerId, session.customer));
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db
      .update(userSubscriptions)
      .set({
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      })
      .where(eq(userSubscriptions.stripeSubscriptionId, subscription.id));
  }

  return new Response(null, { status: 200 });
}
