import { getUserAuth } from "@/lib/auth/utils";
import SubscriptionPricingCard from "./_components/subscriptions-pricing-card";
import {
  getUserCredits,
  getUserSubscriptionPlan,
} from "@/lib/stripe/subscriptions";
import CreditsPricingCard from "./_components/credits-pricing-card";
import ExampleSection from "../(index)/_components/example-section";
import Link from "next/link";

export default async function PricingPage() {
  const { session } = await getUserAuth();
  const subscriptionPlan = await getUserSubscriptionPlan();
  const creditsPlan = await getUserCredits(session?.user?.id ?? "");

  return (
    <main className="flex container min-h-screen w-full flex-col items-center justify-center relative">
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

      {/* <ExampleSection hideText /> */}

      <p className="mt-16 sm:mt-20 md:mt-24 text-muted-foreground text-[8px] sm:text-[10px] text-center max-w-4xl">
        Ao clicar no botão acima para prosseguir, você concorda com os{" "}
        <Link href="/legal" className="underline">
          Termos de Serviço
        </Link>{" "}
        da PhotosHD. A PhotosHD fornece acesso imediato ao conteúdo digital
        assim que você concluir sua compra, sem aguardar o período de 14 dias de
        retirada. Portanto, você renuncia expressamente ao seu direito de
        retirar esta compra. Devido aos altos custos de processamento de GPU,
        não podemos oferecer reembolsos, pois reservamos servidores e incorremos
        em altos custos para o seu uso imediato. Você pode cancelar a qualquer
        momento.
      </p>
    </main>
  );
}
