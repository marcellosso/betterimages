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
  id: "generate-image",
  name: "Generate Image",
  integrations: { replicate },
  version: "0.0.1",
  trigger: eventTrigger({
    name: "generate.image",
    schema: z.object({
      imageUrl: z.string(),
      userIp: z.string(),
      userId: z.string() || z.null(),
    }),
  }),
  run: async (payload, io, ctx) => {
    const { imageUrl, userIp, userId } = payload;

    await io.logger.info("Image upscaling started!");

    const generatingImageStatus = await io.createStatus("upscaling-image", {
      label: "Criando imagem melhorada",
      state: "loading",
    });

    // const imageGenerated = await io.replicate.run("create-model", {
    //   identifier: process.env
    //     .UPSCALER_AI_V2_URI as `${string}/${string}:${string}`,
    //   input: {
    //     image: imageUrl,
    //     task: "real_sr",
    //   },
    // });

    const imageGenerated = await io.replicate.run("create-model", {
      identifier: process.env
        .UPSCALER_AI_URI as `${string}/${string}:${string}`,
      input: {
        image: imageUrl,
        prompt:
          "masterpiece, best quality, highres, <lora:more_details:0.5> <lora:SDXLrender_v2.0:1>",
        dynamic: 9,
        scheduler: "DPM++ 3M SDE Karras",
        creativity: 0.1,
        resemblance: 1.6,
        scale_factor: 2,
        negative_prompt:
          "(worst quality, low quality, normal quality:2) JuggernautNegative-neg",
        num_inference_steps: 18,
        tiling_width: 16,
        tiling_height: 16,
      },
    });

    if (imageGenerated.output === undefined || imageGenerated.error !== null) {
      await generatingImageStatus.update("upscaling-image-error", {
        label: "Image upscaling failed",
        state: "failure",
      });

      if (imageGenerated.error !== null) {
        throw new Error(JSON.stringify(imageGenerated.error));
      }

      throw new Error("Upscaling failed");
    }

    await generatingImageStatus.update("upscaling-image-success", {
      label: "Imagem melhorada criada!",
      state: "success",
      data: {
        url: Array.isArray(imageGenerated.output)
          ? imageGenerated.output[0]
          : imageGenerated.output,
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
        to: "marcel.losso@gmail.com",
        subject: "Imagem melhorada",
      },
    });

    return {
      image: imageGenerated.output,
      originalImage: imageUrl,
    };
  },
});
