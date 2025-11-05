import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getChats = useCallback(async () => {
    try {
      if (!chatId) throw new Error("Chat ID not defined");

      const response = await axios.get(
        `http://localhost:3000/v1/ai/get/conversation/${chatId}`,
        { withCredentials: true }
      );

      if (!response.data.success) throw new Error("Something went wrong");

      setConversation(response.data.conversation.message || []);
    } catch (error) {
      console.log("Error fetching chat:", error);
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  const createConversation = useCallback(async () => {
    try {
      const userPrompt = localStorage.getItem("tempMessage");
      if (!userPrompt) {
        navigate("/");
        return;
      }

      setConversation([{ role: "user", content: userPrompt }]);

      const response = await axios.post(
        `http://localhost:3000/v1/ai/create/conversation`,
        { content: userPrompt },
        { withCredentials: true }
      );

      if (!response.data.success) throw new Error("Something went wrong");

      localStorage.removeItem("tempMessage");

      window.history.replaceState(
        {},
        "",
        `/${response.data.AiResponse.execution}`
      );

      console.log(response.data.AiResponse.response);

      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.AiResponse.response,
        },
      ]);
    } catch (error) {
      console.log("Error creating conversation:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const createChat = async () => {
    if (prompt.trim() === "") return;

    setConversation((prev) => [...prev, { role: "user", content: prompt }]);

    try {
      if (!chatId) throw new Error("Chat ID not defined");

      const response = await axios.post(
        `http://localhost:3000/v1/ai/conversation/${chatId}`,
        { content: prompt },
        { withCredentials: true }
      );

      setPrompt("");

      if (!response.data.success) throw new Error("Something went wrong");

      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response.response },
      ]);
    } catch (error) {
      console.log("Error creating chat:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (chatId === "ask") {
      createConversation();
    } else {
      getChats();
    }
  }, [chatId, createConversation, getChats]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "primary.main",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

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
          {conversation.map((chat, i) =>
            chat.role === "user" ? (
              <ChatBubble key={i} content={chat.content} profilePic="" />
            ) : (
              <AiResponse key={i} content={chat.content} />
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
