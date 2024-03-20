export interface CreditPlan {
  id: string;
  name: string;
  price: number;
  price_per_image: number;
  stripePriceId: string;
  creditsAmount: number;
}

export const storeCreditsPlans: CreditPlan[] = [
  {
    id: "1_credit",
    name: "1 crédito",
    price: 749,
    price_per_image: 7.49,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_1_CREDIT_PRICE_ID ?? "",
    creditsAmount: 1,
  },
  {
    id: "5_credit",
    name: "5 créditos",
    price: 2095,
    price_per_image: 4.19,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_5_CREDIT_PRICE_ID ?? "",
    creditsAmount: 5,
  },
  {
    id: "10_credit",
    name: "10 créditos",
    price: 3490,
    price_per_image: 3.49,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_10_CREDIT_PRICE_ID ?? "",
    creditsAmount: 10,
  },
];
