import { createTheme, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare module "@mui/material" {
  interface TypeText {
    white?: string;
    white_86?: string;
    white_64?: string;
    white_48?: string;
    white_32?: string;
    white_06?: string;
    gradient?: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b2c33",
    },
    text: {
      white: "#ffffff",
      white_86: "#ffffffdb",
      white_64: "#ffffffa3",
      white_48: "#ffffff7a",
      white_32: "#ffffff52",
      white_06: "#ffffff0f",
      gradient:
        "linear-gradient(110.71deg, #f76a4b 15.87%, #a24ae7 60.65%, #4859f3 89.14%)",
    },
  },

  typography: {
    fontFamily: '"Anonymous Pro", sans-serif',
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
