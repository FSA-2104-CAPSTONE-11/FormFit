import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../store";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import history from "../history";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  appBarTransparent: {
    backgroundColor: "transparent",
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    setAnchorEl(null);
    dispatch(handleLogout());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        elevation={0}
        className={classes.appBarTransparent}
      >
        <Toolbar variant="dense">
          <>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuClick("/home")}>Home</MenuItem>
              <MenuItem onClick={() => handleMenuClick("/detector")}>
                Detect Squats Here
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/history")}>
                Pose History
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/profile")}>
                My Profile
              </MenuItem>
              <MenuItem onClick={handleClickLogout}>Logout</MenuItem>)
            </Menu>
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
