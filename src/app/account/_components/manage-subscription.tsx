"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  email: string;
  isCurrentPlan: boolean;
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  stripePriceId: string;
};

export default function ManageSubscription({
  userId,
  email,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
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
            userId,
            isSubscribed,
            isCurrentPlan,
            stripeCustomerId,
            stripePriceId,
          }),
        });
        const session: { url: string } = await res.json();
        if (session) {
          window.location.href = session.url;
        }
      } catch (err) {
        console.error((err as Error).message);
        toast.error("Something went wrong, please try again later.");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Button
        disabled={isPending}
        className="w-full"
        variant={isCurrentPlan ? "default" : "outline"}
      >
        {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
        {isCurrentPlan ? "Manage Subscription" : "Subscribe"}
      </Button>
    </form>
  );
}
