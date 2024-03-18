// import { auth } from "@clerk/nextjs";

import { client } from "@/trigger";
import { auth } from "@clerk/nextjs";

const TEN_MB_LIMIT = 10 * 1024 * 1024;

export async function POST(req: Request) {
  const { userId } = auth();
  // const plan = await getUserSubscriptionPlan();

  if (!userId) {
    return Response.json(
      { error: "You need to be logged in to upload a document" },
      { status: 401 }
    );
  }

  // if (!plan.isSubscribed) {
  //   return Response.json(
  //     { error: "You need to subscribe to upload a document" },
  //     { status: 401 }
  //   );
  // }

  // const { documents: DOCUMENTS_UPLOAD_LIMIT } = plan.limitations!;
  // const { documents } = await getDocuments();

  // if (
  //   DOCUMENTS_UPLOAD_LIMIT !== -1 &&
  //   documents.length >= DOCUMENTS_UPLOAD_LIMIT
  // ) {
  //   return Response.json(
  //     {
  //       error: `You have reached your limit of ${DOCUMENTS_UPLOAD_LIMIT} documents. Please upgrade to upload more documents.`,
  //     },
  //     {
  //       status: 403,
  //     }
  //   );
  // }

  const data = await req.formData();
  try {
    const image = data.get("image");

    const event = await client.sendEvent({
      name: "generate.image",
      payload: {
        image,
      },
    });

    return Response.json({ status: "Processing", eventId: event.id });
  } catch (error) {
    return Response.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
