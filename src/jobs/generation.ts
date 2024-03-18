import { client } from "@/trigger";
import { Replicate } from "@trigger.dev/replicate";
import { eventTrigger } from "@trigger.dev/sdk";
import { z } from "zod";

const replicate = new Replicate({
  id: "replicate",
  apiKey: process.env.REPLICATE_API_TOKEN!,
});

client.defineJob({
  id: "generate-image",
  name: "Generate Image",
  //👇🏻 integrates Replicate
  integrations: { replicate },
  version: "0.0.1",
  trigger: eventTrigger({
    name: "generate.image",
    schema: z.object({
      // image: z.(),
    }),
  }),
  run: async (payload, io, ctx) => {
    console.log("here");
    // const { image } = payload;
    // console.log(image);

    await io.logger.info("Image upscaling started!");

    const generatingImageStatus = await io.createStatus("upscaling-image", {
      label: "Generating upscaled image",
      state: "loading",
    });

    const imageGenerated = await io.replicate.run("create-model", {
      identifier: process.env
        .UPSCALER_AI_URI as `${string}/${string}:${string}`,
      input: {
        seed: 1337,
        image:
          "https://replicate.delivery/pbxt/KZVIDUcU15XCjloQMdqitfzi6pau7rO70IuGgdRAyHgku70q/13_before.png",
        prompt:
          "masterpiece, best quality, highres, <lora:more_details:0.5> <lora:SDXLrender_v2.0:1>",
        dynamic: 6,
        scheduler: "DPM++ 3M SDE Karras",
        creativity: 0.35,
        resemblance: 0.6,
        scale_factor: 2,
        negative_prompt:
          "(worst quality, low quality, normal quality:2) JuggernautNegative-neg",
        num_inference_steps: 18,
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
      label: "Upscaled image generated",
      state: "success",
      data: {
        url: Array.isArray(imageGenerated.output)
          ? imageGenerated.output[0]
          : undefined,
      },
    });

    await io.logger.info(JSON.stringify(imageGenerated));

    return {
      image: imageGenerated.output,
    };
  },
});
