import { Box, Typography } from "@mui/material";
import Main from "../../public/main.svg";
import Side from "../../public/side.svg";

const Topbar = () => {
  return (
    <Box
      sx={{
        height: "100",
        width: "100",
        bgcolor: "primary.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: "2rem",
        py: "1rem",
      }}
    >
      <Box
        sx={{
          height: "20",
          color: "text.white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img src={Main} alt="" />
        <Typography>Heyai</Typography>
      </Box>

      <img src={Side} alt="" />
    </Box>
  );
};

export default Topbar;
