"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { storeCreditsPlans } from "@/config/credits";
import { AuthSession } from "@/lib/auth/utils";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";
import ManageCredits from "./manage-credits";

export default function CreditsPricingCard({
  creditsPlan,
  session,
}: {
  creditsPlan: Record<string, any>;
  session: AuthSession["session"];
}) {
  const [selectedPlan, setSelectedPlan] = useState(storeCreditsPlans[0]);

  return (
    <Card className="flex flex-col items-center p-4 px-1">
      <CardHeader className="mt-2 mb-2">
        <CardTitle className="text-4xl font-light text-center mb-2">
          Créditos pré-pagos
        </CardTitle>
        <CardDescription className="text-4xl font-bold text-center">
          R$ {selectedPlan.price_per_image}{" "}
          <span className="text-lg font-extralight">/ imagem</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <RadioGroup
          className="gap-4"
          defaultValue={selectedPlan.id}
          onValueChange={(value: string) =>
            setSelectedPlan(
              storeCreditsPlans.find((plan) => plan.id === value) ||
                storeCreditsPlans[0]
            )
          }
        >
          {storeCreditsPlans.map((plan) => (
            <div key={plan.id} className="flex items-center space-x-2">
              <RadioGroupItem value={plan.id} id={plan.id} />
              <Label
                htmlFor={plan.id}
                className=" inline-flex justify-between gap-8 items-center w-full hover:cursor-pointer hover:opacity-70"
              >
                <div className="font-medium">{plan.name} </div>
                <p className="text-sm font-extralight">
                  R$ {(plan.price / 100).toFixed(2)}
                </p>
                <p className="text-sm font-bold">
                  R$ {plan.price_per_image}{" "}
                  <span className="font-normal">/ imagem</span>
                </p>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex items-center justify-center mt-6">
          {session?.user ? (
            <ManageCredits
              email={session?.user.email || ""}
              stripePriceId={selectedPlan.stripePriceId}
              stripeCustomerId={creditsPlan?.stripeCustomerId}
              creditsAmount={selectedPlan.creditsAmount}
            />
          ) : (
            <div>
              <Link href="/sign-in">
                <Button
                  className="text-center rounded-full py-3 px-7 text-base font-medium"
                  variant="default"
                >
                  Compre agora
                </Button>
              </Link>
            </div>
          )}
        </div>

        <p className="text-center font-light text-sm pt-2">
          R$ {selectedPlan.price / 100} Pagamento único.
        </p>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
}
