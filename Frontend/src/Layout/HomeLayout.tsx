import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="webview" sx={{ flexGrow: 1, p: 3, color: "white" }}>
        <Container maxWidth="md">
          <Toolbar />
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default HomeLayout;
