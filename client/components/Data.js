import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUser} from "../store/user";
import Chart from "./Chart";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import FitnessCenterSharpIcon from "@material-ui/icons/FitnessCenterSharp";
import ShowChartSharpIcon from "@material-ui/icons/ShowChartSharp";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fixedHeight: {
    height: 240,
  },
  avatar: {
    backgroundColor: theme.palette.background,
    border: `1px solid ${theme.palette.primary.dark}`,
    color: theme.palette.primary.dark,
  },
}));

const Data = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const {poseSessions} = useSelector((state) => state.user);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, [isLoggedIn]);

  // when poseSessions is loaded, filter by exercise and add to exerciseSessions array
  const exerciseSessions = [];
  if (poseSessions) {
    if (poseSessions.some((session) => session.pose.name === "squat")) {
      const squatSessions = poseSessions.filter(
        (session) => session.pose.name === "squat"
      );
      exerciseSessions.push(squatSessions);
    } else if (poseSessions.some((session) => session.pose.name === "pushup")) {
      const pushupSessions = poseSessions.filter(
        (session) => session.pose.name === "pushup"
      );
      exerciseSessions.push(pushupSessions);
    }
  }

  return (
    <div>
      {/* if poseSessions is loaded, map through exerciseSessions array and display data */}
      {poseSessions ? (
        exerciseSessions.map((exercise) => {
          return (
            <div key={exerciseSessions.indexOf(exercise)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper elevation={5} className={fixedHeightPaper}>
                    <Avatar className={classes.avatar}>
                      <FitnessCenterSharpIcon />
                    </Avatar>
                    <Typography component="h2" variant="h1">
                      {exercise.length}
                    </Typography>
                    <Typography component="h2" variant="h6" gutterBottom>
                      Total {exercise[0].pose.name} sessions
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper elevation={5} className={fixedHeightPaper}>
                    <Avatar className={classes.avatar}>
                      <FitnessCenterSharpIcon />
                    </Avatar>
                    <Typography component="h2" variant="h1">
                      {exercise.reduce((a, session) => {
                        return a + session.reps;
                      }, 0)}
                    </Typography>
                    <Typography component="h2" variant="h6" gutterBottom>
                      Total {exercise[0].pose.name}s
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                  <Paper elevation={5} className={fixedHeightPaper}>
                    <Avatar className={classes.avatar}>
                      <ShowChartSharpIcon />
                    </Avatar>
                    <Chart exercise={exercise} />
                    <Typography component="h2" variant="h6" gutterBottom>
                      Average Score per Session
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Data;