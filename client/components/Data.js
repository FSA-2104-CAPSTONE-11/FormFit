import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/user";
import Chart from "./Chart";
import { SessionsPieChart, RepsPieChart } from "./AllExerciseChart";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
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
  const { poseSessions } = useSelector((state) => state.user);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        await dispatch(getUser());
        setLoaded(true);
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  // when poseSessions is loaded, filter by exercise and add to exerciseSessions array
  const exerciseSessions = [];
  if (poseSessions) {
    if (
      poseSessions.some(
        (session) => session.pose && session.pose.name === "squat"
      )
    ) {
      const squatSessions = poseSessions.filter(
        (session) => session.pose && session.pose.name === "squat"
      );
      exerciseSessions.push(squatSessions);
    }
    if (
      poseSessions.some(
        (session) => session.pose && session.pose.name === "pushup"
      )
    ) {
      const pushupSessions = poseSessions.filter(
        (session) => session.pose && session.pose.name === "pushup"
      );
      exerciseSessions.push(pushupSessions);
    }
    if (
      poseSessions.some(
        (session) => session.pose && session.pose.name === "situp"
      )
    ) {
      const sitUpSessions = poseSessions.filter(
        (session) => session.pose && session.pose.name === "situp"
      );
      exerciseSessions.push(sitUpSessions);
    }
  }

  if (isLoggedIn && loaded === true && poseSessions && poseSessions.length) {
    return (
      <div>
        <div>
          {exerciseSessions.map((exercise) => {
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
                        {exercise[0].pose.name} Sessions this Week
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Paper elevation={5} className={fixedHeightPaper}>
              <Typography component="h2" variant="h6" gutterBottom>
                All Exercise Sessions
              </Typography>
              <SessionsPieChart exerciseSessions={exerciseSessions} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper elevation={5} className={fixedHeightPaper}>
              <Typography component="h2" variant="h6" gutterBottom>
                All Exercise Reps
              </Typography>
              <RepsPieChart exerciseSessions={exerciseSessions} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  } else if (
    isLoggedIn &&
    loaded === true &&
    (!poseSessions || !poseSessions.length)
  ) {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Paper elevation={5} className={fixedHeightPaper}>
              <Typography component="h2" variant="h6" gutterBottom>
                You have no sessions saved yet!
              </Typography>
              <Button size="small" variant="contained" color="primary">
                <Link href="/detector" color="inherit">
                  Let's get started
                </Link>
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Data;
