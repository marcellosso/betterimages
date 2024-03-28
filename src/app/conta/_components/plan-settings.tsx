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

  const isMonthlyPlan =
    subscriptionPlan.monthlyStripePriceId == subscriptionPlan.stripePriceId;

  return (
    <AccountCard
      params={{
        header: "Seu Plano",
        description: subscriptionPlan.isSubscribed
          ? `Atualmente, você está no Plano de ${subscriptionPlan.name} mensais.`
          : `Você não está inscrito em nenhum plano.`,
      }}
    >
      <AccountCardBody>
        {subscriptionPlan.isSubscribed && (
          <h3 className="font-semibold text-lg">
            R${" "}
            {subscriptionPlan?.[
              isMonthlyPlan ? "monthly_price" : "yearly_price"
            ]
              ? subscriptionPlan[
                  isMonthlyPlan ? "monthly_price" : "yearly_price"
                ]! / 100
              : 0}{" "}
            / {isMonthlyPlan ? "mês" : "ano"}
          </h3>
        )}
        {subscriptionPlan.stripeCurrentPeriodEnd && (
          <p className="text-sm mb-4 text-muted-foreground ">
            Seu plano irá{" "}
            {!subscriptionPlan.isSubscribed
              ? null
              : subscriptionPlan.isCanceled
              ? "expirar"
              : "renovar"}
            {" em "}
            <span className="font-semibold">
              {subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString()}
            </span>
          </p>
        )}
        {subscriptionPlan.creditsAmount && (
          <p className="text-sm mb-4 text-muted-foreground ">
            Com seu plano, você receberá{" "}
            <span className="font-semibold">
              {subscriptionPlan.creditsAmount} Créditos
            </span>{" "}
            por mês.
          </p>
        )}
      </AccountCardBody>
      <AccountCardFooter description="Você pode alterar ou cancelar seu plano a qualquer momento.">
        <Link href="/precos">
          <Button variant="outline">Planos</Button>
        </Link>
      </AccountCardFooter>
    </AccountCard>
  );
}
