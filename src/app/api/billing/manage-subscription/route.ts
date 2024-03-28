import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface ManageStripeSubscriptionActionProps {
  email: string;
  isSubscription: boolean;
  stripePriceId: string;
  creditsAmount: number;

  isSubscribed?: boolean;
  stripeCustomerId?: string | null;
  isCurrentPlan?: boolean;
}

export async function POST(req: Request) {
  const body: ManageStripeSubscriptionActionProps = await req.json();
  const {
    isSubscribed,
    stripeCustomerId,
    stripePriceId,
    email,
    isSubscription,
    creditsAmount,
  } = body;

  const billingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/conta`;

  const { userId } = auth();

  if (!userId) {
    return new Response(null, { status: 401 });
  }

  if (isSubscribed && stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: billingUrl,
    });

    return NextResponse.json({ url: stripeSession.url }, { status: 200 });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl.concat("?success=true"),
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: isSubscription ? "subscription" : "payment",
    billing_address_collection: "auto",
    allow_promotion_codes: true,
    customer_email: email,
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      isSubscription: `${isSubscription}`,
      creditsAmount,
    },
  });

  return NextResponse.json({ url: stripeSession.url }, { status: 200 });
}
