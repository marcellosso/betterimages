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
    <main className="flex container min-h-screen w-full flex-col items-center justify-center">
      <header className="mb-8 flex w-full flex-col items-center justify-center">
        <h1 className="text-2xl sm:Text-4xl md:text-6xl font-bold text-center">
          Deixe suas imagens com uma qualidade perfeita
        </h1>
        <p className="text-muted-foreground font-medium mt-4 text-lg sm:text-xl md:text-2xl">
          1 IMAGEM = 1 CRÉDITO
        </p>
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
