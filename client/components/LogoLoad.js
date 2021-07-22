import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
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
        <FullLogo className={classes.logo} />
      </div>
    </div>
  );
}

export default LogoLoad;
