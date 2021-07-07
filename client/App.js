import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#f0f4c3",
      dark: "#156064"
    },
    secondary: {
      main: "#9e9d24",
    },
    background: {
      default: "#f0f4c3",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div>
        <Navbar />
        <Routes />
      </div>
    </ThemeProvider>
  );
};

export default App;
