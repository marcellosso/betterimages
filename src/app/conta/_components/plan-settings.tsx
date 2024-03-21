import { getUserSubscriptionPlan } from "@/lib/stripe/subscriptions";
import AccountCard, {
  AccountCardBody,
  AccountCardFooter,
} from "./account-card";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { AuthSession } from "@/lib/auth/utils";
import Link from "next/link";

type Props = {
  session: AuthSession["session"];
};

export default async function PlanSettings({ session }: Props) {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <AccountCard
      params={{
        header: "Your Plan",
        description: subscriptionPlan.isSubscribed
          ? `You are currently on the ${subscriptionPlan.name} plan.`
          : `You are not subscribed to any plan.`.concat(
              !session?.user?.email || session?.user?.email.length < 5
                ? " Please add your email to upgrade your account."
                : ""
            ),
      }}
    >
      <AccountCardBody>
        {subscriptionPlan.isSubscribed && (
          <h3 className="font-semibold text-lg">
            ${subscriptionPlan.price ? subscriptionPlan.price / 100 : 0} / month
          </h3>
        )}
        {subscriptionPlan.stripeCurrentPeriodEnd && (
          <p className="text-sm mb-4 text-muted-foreground ">
            Your plan will{" "}
            {!subscriptionPlan.isSubscribed
              ? null
              : subscriptionPlan.isCanceled
              ? "cancel"
              : "renew"}
            {" on "}
            <span className="font-semibold">
              {subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString()}
            </span>
          </p>
        )}
      </AccountCardBody>
      <AccountCardFooter description="Manage your subscription on Stripe.">
        <Link href="/account/billing">
          <Button variant="outline">Go to billing</Button>
        </Link>
      </AccountCardFooter>
    </AccountCard>
  );
}
