import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import ChatBubble from "../components/ChatBubble";
import Input from "../components/Input";
import AiResponse from "./AiResponse";

const dummyChat = [
  {
    role: "user",
    content: "Hi",
  },
  {
    role: "assistant",
    content: `## 👋 Hey there!  
I'm your AI coding assistant. Here's what I can help you with:

- Writing clean, scalable code  
- Explaining programming concepts  
- Debugging tricky errors  
- Designing full-stack architecture  

Just type your question and I'll break it down step by step.`,
  },
  {
    role: "user",
    content: "Can you explain what Material UI is?",
  },
  {
    role: "assistant",
    content: `### 🧩 What is Material UI (MUI)?  
Material UI (now called **MUI**) is a **React component library** that helps developers build fast, responsive, and beautiful UIs.  

**Key points:**
- 🎨 Pre-built components like buttons, modals, grids, and tables.  
- ⚡ Fully customizable using **theme** and **styled components**.  
- 🌗 Built-in dark mode support.  
- 🧱 Based on **Material Design** by Google.  

**Example: Basic Button**
\`\`\`tsx
import { Button } from "@mui/material";

export default function App() {
  return <Button variant="contained">Click Me</Button>;
}
\`\`\`

So, instead of writing CSS manually, you get modern and consistent design out of the box.`,
  },
  {
    role: "user",
    content: "Cool! How can I make a chat bubble using MUI?",
  },
  {
    role: "assistant",
    content: `### 💬 Creating a Chat Bubble with MUI  
You can easily create a chat bubble using **Box**, **Typography**, and **Avatar** components from MUI.

**Here’s the structure:**
1. Wrap everything in a parent \`Box\` with \`display="flex"\`.  
2. Use \`justifyContent\` to align based on the role (user/assistant).  
3. Style the message bubble using border-radius and background color.  
4. Add an avatar for each side.

**Example Code:**
\`\`\`tsx
<Box display="flex" justifyContent="flex-end" alignItems="flex-end" gap={1}>
  <Box
    sx={{
      bgcolor: "#1976d2",
      color: "white",
      px: 2,
      py: 1,
      borderRadius: "18px 18px 4px 18px",
      maxWidth: "70%",
    }}
  >
    <Typography variant="body1">
      Hey there! This is a chat message bubble.
    </Typography>
  </Box>
  <Avatar src="https://i.pravatar.cc/40" />
</Box>
\`\`\`

> 💡 **Tip:** Reverse \`justifyContent\` and border radius for the assistant side.`,
  },
  {
    role: "user",
    content: "Thanks! Can you summarize everything in short?",
  },
  {
    role: "assistant",
    content: `### 🧾 Summary  
Here's what we learned today:

✅ **Material UI (MUI):** A React library for creating modern UI fast.  
💬 **Chat Bubble Layout:** Use \`Box\`, \`Typography\`, and \`Avatar\` from MUI.  
🎨 **Style:** Play with \`borderRadius\`, \`bgcolor\`, and \`flex\` for alignment.  

You're all set to build a beautiful chat interface! 🚀`,
  },
];

const Ask = () => {
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
          {dummyChat.map((chat) =>
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
