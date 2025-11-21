import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import React from "react";
import Main from "../../public/main.svg";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

interface TopbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ open, handleDrawerOpen }) => {
  return (
    <AppBar position="fixed" open={open} elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
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
            <img src={Main} alt="" />
            <Typography>Heyai</Typography>
          </Box>

          <SignedOut>
            <SignInButton>
              <Button
                sx={{
                  bgcolor: "white",
                  px: 3,
                  borderRadius: "999px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    letterSpacing: 1,
                    textTransform: "none",
                  }}
                >
                  Log in
                </Typography>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
