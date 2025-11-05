import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const Home = () => {
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (message.trim() === "") {
      return;
    }

    localStorage.setItem("tempMessage", message);

    navigate("/ask");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: "primary.main",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "px",
            alignItems: "center",
            height: "70vh",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              background:
                "linear-gradient(110.71deg, #f76a4b 15.87%, #a24ae7 60.65%, #4859f3 89.14%)",
              textAlign: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            What's in your mind.
          </Typography>
          <Typography
            sx={{
              color: "text.white_32",
              textAlign: "center",
            }}
          >
            Talk freely and our AI will fit the best headphones for you
          </Typography>

          {/* Input Box */}
          <Input
            message={message}
            setMessage={setMessage}
            onClick={handleSubmit}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
