import { createAgent } from "langchain";
import { systemPrompt } from "../../systemPrompt";
import { gemini } from "../config/gemini.config";
import { prisma } from "../config/prisma.client";
import { getWeather } from "./tools";

const chatAgent = createAgent({
  model: gemini,
  tools: [getWeather],
  systemPrompt: systemPrompt,
});

export const getResponse = async (
  content: string,
  userId: string,
  executionId?: string
) => {
  try {
    if (executionId) {
      const execution = await prisma.execution.findFirst({
        where: {
          id: executionId,
          clerkId: userId,
        },
      });

      if (!execution) {
        return {
          success: false,
          message: "Execution not found",
        };
      }

      const conversation = await prisma.conversation.findFirst({
        where: {
          id: execution?.externalId,
        },
        include: {
          message: {
            select: {
              role: true,
              content: true,
            },
          },
        },
      });

      if (!conversation) {
        throw new Error("Content not found");
      }

      const response = await chatAgent.invoke({
        messages: [
          ...conversation.message,
          {
            role: "user",
            content: content,
          },
        ],
      });

      if (!response) {
        throw new Error("something went wrong");
      }

      const contentResponse =
        response.messages[response.messages.length - 1].content;

      await prisma.message.createMany({
        data: [
          { role: "user", content: content, conversationId: conversation.id },
          {
            role: "assistant",
            content: contentResponse as string,
            conversationId: conversation.id,
          },
        ],
      });

      return {
        response: response.messages[response.messages.length - 1].content,
      };
    }

    const response = await chatAgent.invoke({
      messages: content,
    });

    const conversation = await prisma.conversation.create({
      data: {
        message: {
          createMany: {
            data: [
              { role: "user", content: content },
              {
                role: "assistant",
                content: response.messages[response.messages.length - 1]
                  .content as string,
              },
            ],
          },
        },
      },
    });

    const execution = await prisma.execution.create({
      data: {
        title: content.slice(0, 10),
        type: "conversation",
        clerkId: userId,
        externalId: conversation.id,
      },
    });

    return {
      response: response.messages[response.messages.length - 1].content,
      execution: execution.id,
    };
  } catch (error) {
    console.log("something went wrong while getting response", error);
    return {
      success: false,
      message: "something went wrong while getting response",
      error: error,
    };
  }
};
