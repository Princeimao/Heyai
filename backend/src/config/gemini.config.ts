import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY,
});
