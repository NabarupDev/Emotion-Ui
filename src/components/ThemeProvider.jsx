import React, { createContext, useState, useContext } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mood, setMood] = useState("Neutral");

  const themes = {
    Happy: createTheme({ palette: { primary: { main: "#ffeb3b" }, background: { default: "#fff9c4" } } }),
    Sad: createTheme({ palette: { primary: { main: "#37474f" }, background: { default: "#263238" } } }),
    Angry: createTheme({ palette: { primary: { main: "#d32f2f" }, background: { default: "#b71c1c" } } }),
    Surprised: createTheme({ palette: { primary: { main: "#ff9800" }, background: { default: "#ffe0b2" } } }),
    Neutral: createTheme({ palette: { primary: { main: "#90a4ae" }, background: { default: "#cfd8dc" } } }),
  };

  return (
    <ThemeContext.Provider value={{ mood, setMood }}>
      <MuiThemeProvider theme={themes[mood]}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
