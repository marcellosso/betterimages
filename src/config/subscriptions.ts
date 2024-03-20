export interface SubscriptionPlan {
  id: string;
  name: string;
  monthly_price: number;
  monthly_price_per_image: number;
  yearly_monthly_price: number;
  yearly_monthly_price_per_image: number;
  monthlyStripePriceId: string;
  yearlyStripePriceId: string;
  creditsAmount: number;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "40_credits",
    name: "40 créditos",
    monthly_price: 3400,
    monthly_price_per_image: 0.85,
    yearly_monthly_price: 3100,
    yearly_monthly_price_per_image: 0.76,
    monthlyStripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_40_PLAN_PRICE_ID ?? "",
    yearlyStripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_YEARLY_40_PLAN_PRICE_ID ?? "",
    creditsAmount: 40,
  },
  {
    id: "200_credits",
    name: "200 créditos",
    monthly_price: 14900,
    monthly_price_per_image: 0.74,
    yearly_monthly_price: 13400,
    yearly_monthly_price_per_image: 0.67,
    monthlyStripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_200_PLAN_PRICE_ID ?? "",
    yearlyStripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_YEARLY_200_PLAN_PRICE_ID ?? "",
    creditsAmount: 200,
  },
  {
    id: "500_credits",
    name: "500 créditos",
    monthly_price: 34900,
    monthly_price_per_image: 0.71,
    yearly_monthly_price: 31400,
    yearly_monthly_price_per_image: 0.62,
    monthlyStripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_500_PLAN_PRICE_ID ?? "",
    yearlyStripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_YEARLY_500_PLAN_PRICE_ID ?? "",
    creditsAmount: 500,
  },
];
