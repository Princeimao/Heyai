import { Box, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export interface Execution {
  id: string;
  title: string;
}

const HomeLayout = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [executions, setExecutions] = useState<Execution[] | null>(null);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/auth/me`, {
        withCredentials: true,
      });

      if (response.data.success === false) {
        return;
      }

      const session = {
        name: response.data.user.name,
        profilePicture: response.data.user.profilePicture,
        email: response.data.user.email,
        id: response.data.user.id,
      };

      sessionStorage.setItem("session", JSON.stringify(session));
      setExecutions(response.data.user.execution);
    } catch (error) {
      console.log("something went wrong getting chats", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box>
      <CssBaseline />
      <Topbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        execution={executions}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeLayout;
