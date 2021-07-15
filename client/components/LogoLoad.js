import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import history from "../history";
import FullLogo from "./FullLogo";
import NavbarOffset from "./NavbarOffset";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "calc(100% - 30px)",
  },
  logo: {
    display: "flex",
  },
});

function LogoLoad() {
  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => {
      history.push("/login");
    }, 3000);
  });

  return (
    <div>
      <NavbarOffset />
      <div className={classes.container}>
        <FullLogo className={classes.logo} ratio={1} />
      </div>
    </div>
  );
}

export default LogoLoad;
