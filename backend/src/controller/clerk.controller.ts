import { verifyWebhook } from "@clerk/express/webhooks";
import { Request, Response } from "express";
import { prisma } from "../config/prisma.client";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    // Handle specific event Type
    if (eventType === "user.created") {
      await prisma.user.create({
        data: {
          clerkId: evt.data.id,
          name: `${evt.data.first_name} ${evt.data.last_name}`,
          email: evt.data.email_addresses[0].email_address,
          profileImage: evt.data.image_url,
        },
      });
    }

    return res.send("Webhook received");
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Error verifying webhook");
  }
};
