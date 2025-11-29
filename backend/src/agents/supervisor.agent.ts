import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { END } from "@langchain/langgraph";
import { members, supervisorAgentPrompt } from "../../systemPrompt";
import { gemini } from "../config/gemini.config";
import { routingTool } from "./tools";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", supervisorAgentPrompt],
  new MessagesPlaceholder("messages"),
  [
    "human",
    `Given the conversation above, who should act next? 
    Or should we FINISH? Select one of: {[END, ...members]}`,
  ],
]);

const options = [END, ...members];

const formattedPrompt = await prompt.partial({
  options: options.join(", "),
  members: members.join(", "),
});

export const supervisorAgent = formattedPrompt.pipe(
  gemini.bindTools([routingTool], {
    tool_choice: "routing",
  })
);
