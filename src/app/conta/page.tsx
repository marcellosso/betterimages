import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import PlanSettings from "./_components/plan-settings";
import SuccessToast from "@/components/success-toast";

export default async function AccountPage() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 min-h-screen items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold mt-4 text-center">Minha Conta</h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {session?.user?.name}
        </h2>
        <div className="space-y-4">
          <PlanSettings session={session} />
        </div>
      </div>

      <SuccessToast />
    </div>
  );
}
