import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {handleLogout} from "../store";
import DrawerComponent from "./Drawer";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ThumbLogo from "./ThumbLogo";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "transparent",
  },
  appBar: {
    background: "transparent",
    boxShadow: "none",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  logoContainer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: -12,
  },
  logo: {
    justifyContent: "right",
    alignItems: "right",
    display: "flex",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickLogout = () => {
    dispatch(handleLogout());
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            style={{margin: "0px", padding: "0px 8px 0px 8px"}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            FormFit
          </Typography>
          <div className={classes.logoContainer}>
            <ThumbLogo className={classes.logo} />
          </div>
        </Toolbar>
      </AppBar>
      {open ? (
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <div>
            <DrawerComponent
              open={open}
              setOpen={() => setOpen(false)}
              handleClickLogout={() => handleClickLogout()}
              handleDrawerClose={() => handleDrawerClose()}
            />
          </div>
        </ClickAwayListener>
      ) : (
        <DrawerComponent
          open={open}
          setOpen={() => setOpen(false)}
          handleClickLogout={() => handleClickLogout()}
          handleDrawerClose={() => handleDrawerClose()}
        />
      )}
    </div>
  );
};

export default Navbar;
