import { createAgent } from "langchain";
import { gemini } from "../config/gemini.config";
import { prisma } from "../config/prisma.client";
import { getWeather } from "./tools";

const chatAgent = createAgent({
  model: gemini,
  tools: [getWeather],
});

export const getResponse = async (
  content: string,
  userId: string,
  executionId?: string
) => {
  try {
    if (executionId) {
      // do something
      return "hi something";
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
        title: "sting",
        type: "conversation",
        userId: userId,
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
