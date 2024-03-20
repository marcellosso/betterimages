import { storeCreditsPlans } from "@/config/credits";
import { db } from "@/lib/db";
import { userCredits, userSubscriptions } from "@/lib/db/schema/subscriptions";
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

  const creditsAmount = parseInt(session?.metadata?.creditsAmount ?? "0");

  if (event.type === "checkout.session.completed") {
    let customerId = session.customer;

    if (session.metadata?.isSubscription == "true") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      customerId = subscription.customer as string;

      const updatedData = {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customerId,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        monthlyCredits: creditsAmount,
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

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.customer_email!,
      });

      customerId = customer.id;
    }

    if (session.metadata?.userId != null) {
      const updatedCreditsData = {
        userId: session.metadata?.userId,
        stripeCustomerId: customerId as string,
      };

      const [credits] = await db
        .select()
        .from(userCredits)
        .where(eq(userCredits.userId, session.metadata.userId));

      if (credits != undefined) {
        await db
          .update(userCredits)
          .set({
            ...updatedCreditsData,
            credits: credits.credits + creditsAmount,
          })
          .where(eq(userCredits.userId, credits.userId));
      } else {
        await db
          .insert(userCredits)
          .values({ ...updatedCreditsData, credits: creditsAmount });
      }
    }
  }

  if (
    event.type === "invoice.payment_succeeded" &&
    session.metadata?.isSubscription == "true"
  ) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const [sub] = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.stripeSubscriptionId, subscription.id));

    const [cred] = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.stripeCustomerId, subscription.customer as string));

    await db
      .update(userCredits)
      .set({ credits: cred.credits + sub.monthlyCredits })
      .where(eq(userCredits.stripeCustomerId, subscription.customer as string));

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
