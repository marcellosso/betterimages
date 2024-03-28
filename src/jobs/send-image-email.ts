import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { Resend } from "@trigger.dev/resend";
import { z } from "zod";

import { ImageUpscaleEmail } from "../../emails/image-email";

const resend = new Resend({
  id: "resend",
  apiKey: process.env.RESEND_API_KEY!,
});

client.defineJob({
  id: "resend-send-image-email",
  name: "Resend: Send Image Email",
  version: "1.0.0",
  trigger: eventTrigger({
    name: "send.image.email",
    schema: z.object({
      to: z.string(),
      subject: z.string(),
      imageUrl: z.string(),
    }),
  }),
  integrations: {
    resend,
  },
  run: async (payload, io, ctx) => {
    await io.resend.emails.send("send-image-email", {
      to: payload.to,
      subject: payload.subject,
      from: "PhotosHD <contato@photoshd.com.br>",
      // text: "Sua imagem está pronta!",
      // react: <SampleEmail />,;
      react: ImageUpscaleEmail({ imageUrl: payload.imageUrl }),
    });
  },
});
