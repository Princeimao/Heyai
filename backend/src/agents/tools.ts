
import { END } from "@langchain/langgraph";
import { tool } from "langchain";
import { YoutubeTranscript } from "youtube-transcript";
import { z } from "zod";
import { members, supervisorAgentPrompt } from "../../systemPrompt";
import { embeddings } from "../config/gemini.config";
import { videoCollection } from "../db/chroma.connection";

export const getWeather = tool(
  ({ city }: { city: string }) => `It's always sunny in ${city}!`,
  {
    name: "get_weather",
    description: "Get the weather for a given city",
    schema: z.object({
      city: z.string(),
    }),
  }
);

export const transcribeYoutTubeVideo = tool(
  async (url: string) => {
    const transcribe = await YoutubeTranscript.fetchTranscript(url);
    // logging what i get
    console.log(transcribe);
    return transcribe[0].text;
  },
  {
    name: "transcribe_youtube_video",
    description:
      "Fetches a YouTube video's audio using its URL and generates an accurate text transcription. Ideal for extracting spoken content from lectures, interviews, podcasts, tutorials, or any YouTube video. Supports optional language specification and timestamps for improved navigation and post-processing.",
    schema: z.object({
      url: z.url(),
      // .regex(
      //   /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[^\s]*)$/,
      //   "Invalid YouTube video URL"
      // ),
    }),
  }
);

// Right now my application can able to handle one video during chat for handling more video save the id into the prisma and also put metadata as the video url
export const createVideoEmbeddings = tool(
  async ({ text, conversationId }) => {
    const embedding = await embeddings.embedDocuments([text]);
    (await videoCollection).add({
      ids: [conversationId],
      embeddings: embedding,
      documents: [text],
    });

    return conversationId;
  },
  {
    name: "create_video_embeddings",
    description: "Create embeddings for text",
    schema: z.object({
      text: z.string(),
      conversationId: z.string(),
    }),
  }
);

export const getVectorEmbeddings = tool(
  async ({ conversationId, query }) => {
    const embeddings = (await videoCollection).query({
      ids: [conversationId],
      queryTexts: [query],
      nResults: 8,
    });

    return JSON.stringify(embeddings);
  },
  {
    name: "search_vector_db",
    description: "search embedding in video collection vector database",
    schema: z.object({
      conversationId: z.string(),
      query: z.string(),
    }),
  }
);

export const routingTool = {
  name: "routing",
  description: "Select the next role.",
  schema: z.object({
    next: z.enum([END, ...members]),
  }),
};

