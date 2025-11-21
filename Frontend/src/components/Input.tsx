// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import { IconButton, InputBase, Paper } from "@mui/material";
// import AiLogo from "../../public/Ai.svg";
// import Mic from "../../public/mic.svg";

// interface Props {
//   message: string;
//   setMessage: React.Dispatch<React.SetStateAction<string>>;
//   onClick: () => void;
// }

// const Input = ({ message, setMessage, onClick }: Props) => {
//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: "999px",
//         pr: 1,
//         pl: 2,
//         py: 0.5,
//         bgcolor: "background.paper",
//         width: "100%",
//         maxWidth: 600,
//         mx: "auto",
//         minHeight: 46,
//         transition: "height 0.2s ease",
//       }}
//     >
//       <img src={AiLogo} alt="logo" />

//       <InputBase
//         placeholder="Type your message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         multiline
//         maxRows={4} // limits visual expansion
//         sx={{
//           flex: 1,
//           ml: 1,
//           mr: 1,
//           maxHeight: 150,
//           overflowY: "auto",
//           fontSize: "0.95rem",
//           lineHeight: 1.4,
//         }}
//       />

//       <img src={Mic} alt="mic" />

//       <IconButton
//         onClick={onClick}
//         sx={{
//           borderRadius: "100%",
//           height: "35px",
//           width: "35px",
//           bgcolor: "primary.main",
//           ml: "7px",
//           ":hover": {
//             bgcolor: "primary.main",
//           },
//         }}
//       >
//         <ArrowUpwardIcon
//           sx={{
//             height: "20px",
//             color: "white",
//           }}
//         />
//       </IconButton>
//     </Paper>
//   );
// };

// export default Input;

import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import aiLogo from "../../public/Ai.svg";

const Root = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Container = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 900,
  padding: theme.spacing(1.25),
  borderRadius: 28,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  boxShadow:
    "0 6px 18px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.02)",
}));

const InputRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: theme.spacing(1),
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1.25, 1.75),
  borderRadius: 20,
  background: "transparent",
  fontSize: 15,
  "& .MuiInputBase-input": {
    padding: 0,
    lineHeight: 1.4,
  },
}));

const SuggestionsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
}));

export default function GeminiAIInput({
  onSend = (t) => console.log("send", t),
  placeholder = "Ask me anything...",
  suggestions = ["Summarize this", "Write a tweet", "Explain like I'm 5"],
  loading = false,
  maxRows = 4,
}) {
  const [text, setText] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setOpenSuggestions(
      text.trim() === "" && suggestions && suggestions.length > 0
    );
  }, [text, suggestions]);

  const handleSend = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText("");
    setOpenSuggestions(true);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    // Enter to send, Shift+Enter new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (s) => {
    // insert suggestion into input
    setText((prev) => (prev ? prev + " " + s : s));
    setOpenSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <Root>
      <Container sx={{
        width: 700cd 
      }}>
        <InputRow>
          <Avatar sx={{ bgcolor: "transparent" }}>
            <img src={aiLogo} alt="ailogo" />
          </Avatar>

          <StyledInput
            inputRef={inputRef}
            placeholder={placeholder}
            multiline
            maxRows={maxRows}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <input id="file-input" type="file" style={{ display: "none" }} />
            <label htmlFor="file-input">
              <Tooltip title="Attach file">
                <IconButton size="large" component="span">
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
            </label>

            <Tooltip title="Voice input (experimental)">
              <IconButton size="large">
                <MicIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Send">
              <span>
                <IconButton
                  size="large"
                  onClick={handleSend}
                  disabled={text.trim() === "" || loading}
                  aria-label="send message"
                >
                  {loading ? (
                    <CircularProgress size={20} thickness={5} />
                  ) : (
                    <SendIcon />
                  )}
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </InputRow>

        {/* Suggestions row (Gemini-style chips) */}
        {openSuggestions && suggestions && suggestions.length > 0 && (
          <SuggestionsRow
            sx={{
              px: 1,
            }}
          >
            {suggestions.map((s, i) => (
              <Chip
                key={i}
                label={s}
                onClick={() => handleSuggestionClick(s)}
                clickable
                size="small"
                variant="outlined"
                avatar={
                  <Avatar sx={{ bgcolor: "#EFF6FF", color: "#0B5FFF" }}>
                    G
                  </Avatar>
                }
              />
            ))}
          </SuggestionsRow>
        )}

        {/* Small helper / shortcut text */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Press Enter to send • Shift+Enter for newline
          </Typography>
        </Box>
      </Container>
    </Root>
  );
}

// Usage example (in the same file for convenience):
// import GeminiAIInput from './GeminiAIInput';
//
// function Demo() {
//   const [loading, setLoading] = React.useState(false);
//   const handleSend = async (text) => {
//     setLoading(true);
//     // simulate call to LLM
//     await new Promise((r) => setTimeout(r, 1200));
//     console.log('sent to LLM:', text);
//     setLoading(false);
//   };
//   return (
//     <div style={{ padding: 24 }}>
//       <GeminiAIInput onSend={handleSend} loading={loading} />
//     </div>
//   );
// }
