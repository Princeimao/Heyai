import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
import Input from "../components/Input";
import AiResponse from "./AiResponse";

type Role = "user" | "assistant";

interface Conversation {
  content: string;
  id?: string;
  role: Role;
}

const Ask = () => {
  const { chatId } = useParams();
  const [conversation, setConversation] = useState<Conversation[] | null>();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<string>("");

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

  const createConversation = async () => {
    try {
      const userPrompt = await localStorage.getItem("tempMessage");

      if (!userPrompt) {
        navigate("/");
        return;
      }

      setConversation([
        {
          role: "user",
          content: userPrompt,
        },
      ]);

      const response = await axios.post(
        `http://localhost:3000/v1/ai/create/conversation`,
        {
          content: userPrompt,
        }
      );

      if (response.data.success === false) {
        throw new Error("something went wrong");
      }

      localStorage.removeItem("tempMessage");

      window.history.replaceState(
        {},
        "",
        `/${response.data.AiResponse.execution}`
      );

      setConversation((prev) => [
        ...(prev ?? []),
        {
          role: "assistant",
          content: response.data.AiResponse.response,
        },
      ]);
    } catch (error) {
      console.log("something went wrong while creating conversation", error);
    }
  };

  const createChat = async () => {
    setConversation((prev) => [
      ...prev!,
      {
        role: "user",
        content: prompt,
      },
    ]);

    try {
      if (prompt.trim() === "") return;

      if (!chatId) {
        throw new Error("Chat id is not defined");
      }

      const response = await axios.post(
        `http://localhost:3000/v1/ai/conversation/${chatId}`,
        {
          content: prompt,
        }
      );

      setPrompt("");

      if (response.data.success === false) {
        throw new Error("something went wrong");
      }

      setConversation((prev) => [
        ...prev!,
        {
          role: "assistant",
          content: response.data.response,
        },
      ]);
    } catch (error) {
      console.log("something went wrong creating chat", error);
    }
  };

  useEffect(() => {
    if (chatId === "ask") {
      createConversation();
    } else {
      getChats();
    }
  }, [chatId]);

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
          <Input message={prompt} setMessage={setPrompt} onClick={createChat} />
        </Box>
      </Container>
    </Box>
  );
};

export default Ask;
