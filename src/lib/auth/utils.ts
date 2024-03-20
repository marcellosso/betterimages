import { auth } from "@clerk/nextjs/server";
import { kv } from "@vercel/kv";
import { redirect } from "next/navigation";
import {
  getUserCredits,
  getUserSubscriptionPlan,
} from "../stripe/subscriptions";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const getUserAuth = async () => {
  // find out more about setting up 'sessionClaims' (custom sessions) here: https://clerk.com/docs/backend-requests/making/custom-session-token
  const { userId, sessionClaims } = auth();
  if (userId) {
    return {
      session: {
        user: {
          id: userId,
          name: `${sessionClaims?.firstName} ${sessionClaims?.lastName}`,
          email: sessionClaims?.email,
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
};

export const validateUser = async (userId: string | null, userIp: string) => {
  const userUsage = await kv.get(`user-usage-${userIp}`);

  const { credits } = await getUserCredits(userId);
  const plan = await getUserSubscriptionPlan();

  let errorMessage = null;
  if (userUsage && !userId) {
    errorMessage =
      "Você não pode melhorar mais imagens, inscreva-se para continuar.";
  }

  if (!credits && userUsage) {
    if (plan.isSubscribed) {
      errorMessage = "Você atingiu seu limite mensal de imagens.";
    } else {
      errorMessage = "Você não possui mais créditos.";
    }
  }

  return { error: !!errorMessage, message: errorMessage };
};
