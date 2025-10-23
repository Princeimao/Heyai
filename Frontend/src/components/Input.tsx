import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import AiLogo from "../../public/Ai.svg";
import Mic from "../../public/mic.svg";

const Input = () => {
  const [message, setMessage] = useState<string>("");

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "999px",
        pr: 1,
        pl: 2,
        py: 0.5,
        bgcolor: "background.paper",
        width: "100%",
        maxWidth: 600,
        height: 46,
        mx: "auto",
      }}
    >
      <img src={AiLogo} alt="logo" />
      <InputBase
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        maxRows={4}
        sx={{
          flex: 1,
          ml: 1,
          mr: 1,
          "::placeholder": "I’m looking for...",
        }}
      />
      <img src={Mic} alt="mic" />

      <IconButton
        sx={{
          borderRadius: "100%",
          height: "35px",
          width: "35px",
          bgcolor: "primary.main",
          ml: "7px",
          ":hover": {
            bgcolor: "primary.main",
          },
        }}
      >
        <ArrowUpwardIcon
          sx={{
            height: "20px",
            color: "white",
          }}
        />
      </IconButton>
    </Paper>
  );
};

export default Input;
