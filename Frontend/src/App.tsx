import { Box, Typography } from "@mui/material";
import HomeLayout from "./Layout/HomeLayout";
import Input from "./components/Input";

function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "primary.main",
      }}
    >
      <HomeLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            height: "50vh",
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
          <Input />
        </Box>
      </HomeLayout>
    </Box>
  );
}

export default App;
