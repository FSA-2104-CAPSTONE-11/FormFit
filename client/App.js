import React from "react";
import {createTheme, ThemeProvider, CssBaseline} from "@material-ui/core";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#008BF5",
      dark: "#0E0E52",
    },
    secondary: {
      main: "#77CBB9",
    },
    background: {
      default: "#008BF5",
    },
  },
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    marginLeft: -drawerWidth,
  },
}));

const App = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div>
        {isLoggedIn ? (
          <div className={classes.root}>
            <Navbar />
            <div className={classes.content}>
              <Routes />
            </div>
          </div>
        ) : (
          <Routes />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
