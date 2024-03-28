import { client } from "@/trigger";
import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { getUserAuth, validateUser } from "@/lib/auth/utils";

export async function POST(request: NextRequest) {
  const { session } = await getUserAuth();
  const userIp = request.ip || "127.0.0.1";

  const { error, message } = await validateUser(
    session?.user.id as string,
    userIp
  );
  if (error) {
    return Response.json({ error: message }, { status: 403 });
  }
  try {
    const { imageUrl } = await request.json();

    const event = await client.sendEvent({
      name: "generate.image",
      payload: {
        imageUrl,
        userIp: userIp,
        userId: session?.user.id,
        userEmail: session?.user.email,
      },
    });

    return Response.json({ eventId: event.id });
  } catch (error) {
    return Response.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
