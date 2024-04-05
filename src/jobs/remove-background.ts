import { db } from "@/lib/db";
import { userCredits } from "@/lib/db/schema/subscriptions";
import { getUserCredits } from "@/lib/stripe/subscriptions";
import { client } from "@/trigger";
import { Replicate } from "@trigger.dev/replicate";
import { eventTrigger } from "@trigger.dev/sdk";
import { kv } from "@vercel/kv";
import { eq } from "drizzle-orm";
import { z } from "zod";

const replicate = new Replicate({
  id: "replicate",
  apiKey: process.env.REPLICATE_API_TOKEN!,
});

client.defineJob({
  id: "remove-background-image",
  name: "Remove Image Background",
  integrations: { replicate },
  version: "0.0.1",
  trigger: eventTrigger({
    name: "remove.background",
    schema: z.object({
      imageUrl: z.string(),
      userIp: z.string(),
      userId: z.string() || z.null(),
      userEmail: z.string() || z.null(),
    }),
  }),
  run: async (payload, io, ctx) => {
    const { imageUrl, userIp, userId, userEmail } = payload;

    await io.logger.info("Image upscaling started!");

    const generatingImageStatus = await io.createStatus("remove-bg-image", {
      label: "Removendo fundo da imagem",
      state: "loading",
    });

    const imageGenerated = await io.replicate.run("create-model", {
      identifier: process.env
        .REMOVE_BG_AI_URI as `${string}/${string}:${string}`,
      input: {
        image: imageUrl,
      },
    });

    if (imageGenerated.output === undefined || imageGenerated.error !== null) {
      await generatingImageStatus.update("remove-bg-image-error", {
        label: "Image background removal failed",
        state: "failure",
      });

      if (imageGenerated.error !== null) {
        throw new Error(JSON.stringify(imageGenerated.error));
      }

      throw new Error("Upscaling failed");
    }

    await generatingImageStatus.update("remove-bg-image-success", {
      label: "Imagem com fundo removido criada!",
      state: "success",
      data: {
        url: imageGenerated.output,
        originalUrl: imageUrl,
      },
    });

    await io.logger.info(JSON.stringify(imageGenerated));

    if (!userId) {
      const kvKey = `user-usage-${userIp}`;
      const userUsage = await kv.get(kvKey);
      if (!userUsage) await kv.set(kvKey, 1);
    } else {
      const { credits } = await getUserCredits(userId);
      await db
        .update(userCredits)
        .set({
          credits: credits - 1,
        })
        .where(eq(userCredits.userId, userId));
    }

    await client.sendEvent({
      name: "send.image.email",
      payload: {
        to: userEmail,
        subject: "PhotosHD - Removemos o fundo de sua imagem!",
        imageUrl: imageGenerated.output,
      },
    });

    return {
      image: imageGenerated.output,
      originalImage: imageUrl,
    };
  },
});
