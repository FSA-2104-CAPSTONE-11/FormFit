import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import history from "../history";

const useStyles = makeStyles({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: "50%",
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
    <Card className={classes.root}>
      <CardContent className={classes.actions}>
        <Typography variant="body2" component="p">
          Logo Goes here
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LogoLoad;
