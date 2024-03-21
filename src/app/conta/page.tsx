import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import PlanSettings from "./_components/plan-settings";

export default async function AccountPage() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 max-h-screen">
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="space-y-4">
        <PlanSettings session={session} />
        {/* <UserSettings session={session} /> */}
      </div>
    </div>
  );
}
