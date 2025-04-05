import React from "react";
import WebcamCapture from "./components/WebcamCapture";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// 🎨 Material-UI Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <WebcamCapture />
    </ThemeProvider>
  );
};

export default App;
