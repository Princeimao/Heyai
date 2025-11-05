import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Typography,
} from "@mui/material";
import {
  styled,
  useTheme,
  type CSSObject,
  type Theme,
} from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../public/chat.svg";
import Main from "../../public/main.svg";
import type { Execution } from "../layout/HomeLayout";
import type { User } from "../types";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          backgroundColor: theme.palette.text.white_06,
          color: theme.palette.text.white,
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.white,
        },
      },
    },
  ],
}));

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
  execution: Execution[] | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  handleDrawerClose,
  execution,
}) => {
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = sessionStorage.getItem("session");
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []);

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
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
              px: "15px",
            }}
          >
            <img src={Main} alt="" />
            <Typography>Heyai</Typography>
          </Box>

          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: "white",
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Box>
      </DrawerHeader>

      <Divider />

      <List
        sx={{
          color: "white",
          height: "100%",
        }}
      >
        {[
          {
            label: "New Chat",
            icon: <img src={Chat} alt="" />,
            to: "/",
          },
          // {
          //   label: "Seach",
          //   icon: (
          //     <SearchIcon
          //       sx={{
          //         color: "text.white_64",
          //       }}
          //     />
          //   ),
          // },
        ].map((text, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate(text.to)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {text.icon}
              </ListItemIcon>
              <ListItemText
                primary={text.label}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {open && execution && (
          <Typography
            sx={{
              ml: 3,
              mt: 1,
              color: "text.white_48",
            }}
          >
            chats
          </Typography>
        )}

        {execution &&
          execution.map((conversations) => (
            <ListItem
              key={conversations.id}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                onClick={() => navigate(`/${conversations.id}`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {/* <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {text.icon}
              </ListItemIcon> */}
                <ListItemText
                  primary={conversations.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <Divider />
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: "10px" }}>
        <Avatar
          alt="Remy Sharp"
          src={user?.profilePicture !== null ? user?.profilePicture : ""}
          sx={{
            height: "30px",
            width: "30px",
          }}
        />
        {open && (
          <Typography variant="body2">
            {user === null ? "Guest" : user.name}
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
