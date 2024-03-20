import { getUserAuth } from "@/lib/auth/utils";
import SubscriptionPricingCard from "./_components/subscriptions-pricing-card";
import {
  getUserCredits,
  getUserSubscriptionPlan,
} from "@/lib/stripe/subscriptions";
import CreditsPricingCard from "./_components/credits-pricing-card";

export default async function PricingPage() {
  const { session } = await getUserAuth();
  const subscriptionPlan = await getUserSubscriptionPlan();
  const creditsPlan = await getUserCredits(session?.user?.id ?? "");

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-secondary justify-center px-4 md:p-8">
      <header className="mb-8 flex w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Get Full Resolution Images</h1>
        <p className="opacity-60">1 IMAGE = 1 CREDIT</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SubscriptionPricingCard
          session={session}
          subscriptionPlan={subscriptionPlan}
        />
        <CreditsPricingCard creditsPlan={creditsPlan} session={session} />
      </section>
    </main>
  );
}
