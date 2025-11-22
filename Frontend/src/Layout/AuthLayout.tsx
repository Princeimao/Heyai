import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Main from "../assets/main.svg";
import Side from "../assets/side.svg";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "primary.main",
      }}
    >
      {/* TopBar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "7vh",
          px: "4vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img src={Main} alt="website logo" />
          <Typography
            sx={{
              color: "white",
            }}
          >
            Heyai
          </Typography>
        </Box>

        <img src={Side} alt="side logo" />
      </Box>

      <Outlet />
    </Box>
  );
};

export default AuthLayout;
