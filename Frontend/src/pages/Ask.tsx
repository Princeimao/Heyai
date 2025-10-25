import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import Input from "../components/Input";

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
          }}
        >
          {/* some chats */}
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
