import { Box } from "@mui/material";
import Topbar from "./components/Topbar";

function App() {
  return (
    <Box
      sx={{
        height: "100",
        width: "100",
        bgcolor: "primary.main",
      }}
      className="w-full h-screen bg-primary text-primary"
    >
      <Topbar />
    </Box>
  );
}

export default App;
