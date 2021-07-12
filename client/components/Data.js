import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUser} from "../store/user";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import FitnessCenterSharpIcon from "@material-ui/icons/FitnessCenterSharp";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Data = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const {poseSessions} = useSelector((state) => state.user);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log(poseSessions);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, [isLoggedIn]);

  return (
    <div>
      {poseSessions ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <FitnessCenterSharpIcon />
              <Typography component="h2" variant="h1">
                {
                  poseSessions.filter(
                    (session) => session.pose.name === "squat"
                  ).length
                }
              </Typography>
              <Typography component="h2" variant="h6" gutterBottom>
                Total Squat Sessions
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Typography component="h2" variant="h1">
                {poseSessions.reduce((a, session) => {
                  return a + session.reps;
                }, 0)}
              </Typography>
              <Typography component="h2" variant="h6" gutterBottom>
                Total Squats
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={6}>
            <Paper className={fixedHeightPaper}>
              <Typography component="h2" variant="h6" gutterBottom>
                Average Score per Session
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Data;
