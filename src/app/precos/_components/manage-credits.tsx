"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  email: string;
  stripePriceId: string;
  creditsAmount: number;

  stripeCustomerId?: string | null;
};

export default function ManageCredits({
  email,
  stripeCustomerId,
  stripePriceId,
  creditsAmount,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const res = await fetch("/api/billing/manage-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            stripeCustomerId,
            stripePriceId,
            creditsAmount,

            isSubscription: false,
          }),
        });
        const session: { url: string } = await res.json();
        if (session) {
          window.location.href = session.url;
        }
      } catch (err) {
        console.error((err as Error).message);
        toast.error("Algo deu errado. Por favor tente novamente.");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="w-fit self-center">
      <Button
        disabled={isPending}
        className="w-fit rounded-full py-3 px-7 text-base font-medium"
        variant="default"
      >
        {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
        Compre agora
      </Button>
    </form>
  );
}
