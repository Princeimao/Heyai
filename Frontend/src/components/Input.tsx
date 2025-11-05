import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton, InputBase, Paper } from "@mui/material";
import AiLogo from "../../public/Ai.svg";
import Mic from "../../public/mic.svg";

interface Props {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
}

const Input = ({ message, setMessage, onClick }: Props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "999px",
        pr: 1,
        pl: 2,
        py: 0.5,
        bgcolor: "background.paper",
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        minHeight: 46,
        transition: "height 0.2s ease",
      }}
    >
      <img src={AiLogo} alt="logo" />

      <InputBase
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        maxRows={4} // limits visual expansion
        sx={{
          flex: 1,
          ml: 1,
          mr: 1,
          maxHeight: 150,
          overflowY: "auto",
          fontSize: "0.95rem",
          lineHeight: 1.4,
        }}
      />

      <img src={Mic} alt="mic" />

      <IconButton
        onClick={onClick}
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
