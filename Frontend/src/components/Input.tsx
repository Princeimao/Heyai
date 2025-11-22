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
import { useState } from "react";
import aiLogo from "../assets/Ai.svg";

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

const suggestions = ["Summarize this", "Write a tweet", "Explain like I'm 5"];
const InputBox = ({ loading = false }) => {
  const [prompt, setPrompt] = useState<string>("");

  return (
    <Root>
      <Container
        sx={{
          width: 700,
        }}
      >
        <InputRow>
          <Avatar sx={{ bgcolor: "transparent" }}>
            <img src={aiLogo} alt="ailogo" />
          </Avatar>

          <StyledInput
            placeholder="Ask me anything..."
            multiline
            maxRows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
                  // onClick={handleSend}
                  disabled={prompt.trim() === "" || loading}
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
        {suggestions && suggestions.length > 0 && (
          <SuggestionsRow
            sx={{
              px: 1,
            }}
          >
            {suggestions.map((s, i) => (
              <Chip
                key={i}
                label={s}
                // onClick={() => handleSuggestionClick(s)}
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
};

export default InputBox;
