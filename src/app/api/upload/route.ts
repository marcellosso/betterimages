import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { v4 } from "uuid";
import { NextRequest } from "next/server";
import { validateUser } from "@/lib/auth/utils";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const userIp = request.ip || "127.0.0.1";

  const { error, message } = await validateUser(userId, userIp);
  if (error) {
    return Response.json({ error: message }, { status: 403 });
  }

  const { contentType } = await request.json();

  const imageName = v4();
  try {
    const client = new S3Client({ region: process.env.AWS_REGION });

    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `Temp/${imageName}`,
      Fields: {
        "Content-Type": contentType,
        acl: "public-read",
      },
      Conditions: [
        // ["content-length-range", 0, TEN_MB_LIMIT],
        ["starts-with", "$Content-Type", contentType],
      ],
      Expires: 300, // 5 minutes,
    });

    return Response.json({ url, fields });
  } catch (error) {
    return Response.json(
      { error: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
