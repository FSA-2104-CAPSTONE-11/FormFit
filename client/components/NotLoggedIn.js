import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

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

export default function NotLoggedIn() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.actions}>
        <Typography variant="body2" component="p">
          Oh no! You must be logged in to view this page!
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Link to="/login">
          <Button fullWidth={true} size="medium">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button fullWidth={true} size="medium">
            Sign Up
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
