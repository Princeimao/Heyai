import { ChromaClient } from "chromadb";
const client = new ChromaClient();

export const videoCollection = client.createCollection({
  name: "video_collection",
});
