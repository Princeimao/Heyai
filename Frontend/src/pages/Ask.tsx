import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
import Input from "../components/Input";
import AiResponse from "./AiResponse";

type Role = "user" | "assistant";

interface Conversation {
  content: string;
  id: string;
  createtAt: Date;
  updateAt: Date;
  role: Role;
  conversationId: string;
}

const Ask = () => {
  const { chatId } = useParams();
  const [conversation, setConversation] = useState<Conversation[] | null>();

  const getChats = async () => {
    try {
      if (!chatId) {
        throw new Error("Execution id is not defined");
      }

      const response = await axios.get(
        `http://localhost:3000/v1/ai/get/conversation/${chatId}`,
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error("somethign went wrong");
      }

      setConversation(response.data.conversation.message);
    } catch (error) {
      console.log("something went wrong getting chat", error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "primary.main",
      }}
    >
      <Container maxWidth="md">
        <CssBaseline />
        <Toolbar />
        <Box
          sx={{
            height: "80vh",
            overflow: "auto",
            padding: 2,
            scrollbarWidth: "none",
          }}
        >
          {conversation &&
            conversation.map((chat) =>
              chat.role === "user" ? (
                <ChatBubble content={chat.content} profilePic="" />
              ) : (
                <AiResponse content={chat.content} />
              )
            )}
        </Box>

        <Box
          sx={{
            height: "8vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input />
        </Box>
      </Container>
    </Box>
  );
};

export default Ask;
