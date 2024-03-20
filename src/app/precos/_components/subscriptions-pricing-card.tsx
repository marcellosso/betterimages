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
import { Switch } from "@/components/ui/switch";
import { storeSubscriptionPlans } from "@/config/subscriptions";
import { AuthSession } from "@/lib/auth/utils";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";
import ManageSubscription from "./manage-subscription";

export default function SubscriptionsPricingCard({
  subscriptionPlan,
  session,
}: {
  subscriptionPlan: Record<string, any>;
  session: AuthSession["session"];
}) {
  const [selectedPlan, setSelectedPlan] = useState(storeSubscriptionPlans[0]);
  const [yearlyView, setYearlyView] = useState(false);

  return (
    <Card className="flex flex-col items-center p-4 px-1">
      <CardHeader className="mt-2 mb-2">
        <CardTitle className="text-4xl font-light text-center mb-2">
          Planos de Assinatura
        </CardTitle>
        <CardDescription className="text-4xl font-bold text-center">
          R${" "}
          {
            selectedPlan[
              yearlyView
                ? "yearly_monthly_price_per_image"
                : "monthly_price_per_image"
            ]
          }{" "}
          <span className="text-lg font-extralight">/ imagem</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <RadioGroup
          className="gap-4"
          defaultValue={selectedPlan.id}
          onValueChange={(value: string) =>
            setSelectedPlan(
              storeSubscriptionPlans.find((plan) => plan.id === value) ||
                storeSubscriptionPlans[0]
            )
          }
        >
          {storeSubscriptionPlans.map((plan) => (
            <div key={plan.id} className="flex items-center space-x-2">
              <RadioGroupItem value={plan.id} id={plan.id} />
              <Label
                htmlFor={plan.id}
                className=" inline-flex justify-between gap-8 items-center w-full hover:cursor-pointer hover:opacity-70"
              >
                <div className="font-medium">
                  {plan.name}{" "}
                  <span className="text-sm font-extralight">/ mês</span>
                </div>
                <p className="text-sm font-extralight">
                  R${" "}
                  {plan[yearlyView ? "yearly_monthly_price" : "monthly_price"] /
                    100}
                </p>
                <p className="text-sm font-bold">
                  R${" "}
                  {
                    plan[
                      yearlyView
                        ? "yearly_monthly_price_per_image"
                        : "monthly_price_per_image"
                    ]
                  }{" "}
                  <span className="font-normal">/ imagem</span>
                </p>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex items-center justify-center space-x-2 my-6">
          <Label htmlFor="view-mode" className={!yearlyView ? "font-bold" : ""}>
            Mensal
          </Label>
          <Switch
            id="view-mode"
            className="bg-primary"
            checked={yearlyView}
            onCheckedChange={setYearlyView}
          />
          <Label htmlFor="view-mode" className={yearlyView ? "font-bold" : ""}>
            Anual
            <span className="text-destructive text-sm"> 10% off</span>
          </Label>
        </div>
        <div className="flex items-center justify-center">
          {session?.user ? (
            <ManageSubscription
              email={session?.user.email || ""}
              stripePriceId={
                selectedPlan[
                  yearlyView ? "yearlyStripePriceId" : "monthlyStripePriceId"
                ]
              }
              creditsAmount={selectedPlan.creditsAmount}
              stripeCustomerId={subscriptionPlan?.stripeCustomerId}
              isSubscribed={!!subscriptionPlan.isSubscribed}
              isCurrentPlan={subscriptionPlan?.name === selectedPlan.name}
            />
          ) : (
            <div>
              <Link href="/sign-in">
                <Button
                  className="text-center rounded-full py-3 px-7 text-base font-medium"
                  variant="default"
                >
                  Inscreva-se
                </Button>
              </Link>
            </div>
          )}
        </div>

        <p className="text-center font-light text-sm pt-2">
          R${" "}
          {selectedPlan[yearlyView ? "yearly_monthly_price" : "monthly_price"] /
            100}{" "}
          por mês{yearlyView ? ", cobrados anualmente." : "."}
        </p>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
}
