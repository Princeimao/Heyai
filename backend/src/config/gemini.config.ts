import { TaskType } from "@google/generative-ai";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI API KEY IS NOT DEFINE");
}

export const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: GEMINI_API_KEY,
});

export const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: GEMINI_API_KEY,
  modelName: "gemini-embedding-001",
  taskType: TaskType.RETRIEVAL_QUERY,
});
