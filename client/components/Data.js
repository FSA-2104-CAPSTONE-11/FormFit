import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../store/user";
import Chart from "./Chart";
import { SessionsPieChart, RepsPieChart } from "./AllExerciseChart";
import SessionsData from "./SessionsData";
import RepsData from "./RepsData";
import {
  makeStyles,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import clsx from "clsx";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
  },
  paperHeight: {
    height: 150,
  },
  piePaperHeight: {
    height: 200,
  },
  noSessions: {
    display: "flex",
    overflow: "auto",
    flexDirection: "row",
    justifyContent: "center",
  },
  chart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 200,
    marginBottom: theme.spacing(3),
    borderRadius: 0,
  },
  chartHeader: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 0,
  },
  exercise: {
    marginBottom: theme.spacing(3),
  },
}));

const Data = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const { poseSessions } = useSelector((state) => state.user);
  const classes = useStyles();
  const paper = clsx(classes.paper, classes.paperHeight);

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
        (session) => session.pose && session.pose.name === "Squat"
      )
    ) {
      const squatSessions = poseSessions.filter(
        (session) => session.pose && session.pose.name === "Squat"
      );
      exerciseSessions.push(squatSessions);
    }
    if (
      poseSessions.some(
        (session) => session.pose && session.pose.name === "Push-Up"
      )
    ) {
      const pushupSessions = poseSessions.filter(
        (session) => session.pose && session.pose.name === "Push-Up"
      );
      exerciseSessions.push(pushupSessions);
    }
    if (
      poseSessions.some(
        (session) => session.pose && session.pose.name === "Sit-Up"
      )
    ) {
      const sitUpSessions = poseSessions.filter(
        (session) => session.pose && session.pose.name === "Sit-Up"
      );
      exerciseSessions.push(sitUpSessions);
    }
  }

  if (isLoggedIn && loaded === true && poseSessions && poseSessions.length) {
    return (
      <div>
        <div>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper elevation={5} className={classes.chartHeader}>
                <ThemeProvider theme={theme}>
                  <Typography component="h2" variant="h6" gutterBottom>
                    All Sessions
                  </Typography>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Typography component="h2" variant="h6" gutterBottom>
                    All Reps
                  </Typography>
                </ThemeProvider>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper elevation={5} className={classes.chart}>
                <SessionsPieChart exerciseSessions={exerciseSessions} />
                <RepsPieChart exerciseSessions={exerciseSessions} />
              </Paper>
            </Grid>
          </Grid>
          {exerciseSessions.map((exercise) => {
            return (
              <div key={exerciseSessions.indexOf(exercise)}>
                <Grid container spacing={1} className={classes.exercise}>
                  <Grid item xs={6} md={3} lg={3} width="xs">
                    <Paper elevation={5} className={paper}>
                      <SessionsData exercise={exercise} />
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3} lg={3} width="xs">
                    <Paper elevation={5} className={paper}>
                      <RepsData exercise={exercise} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} width="xs">
                    <Paper elevation={5} className={paper}>
                      <Chart exercise={exercise} />
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (
    isLoggedIn &&
    loaded === true &&
    (!poseSessions || !poseSessions.length)
  ) {
    return (
      <div>
        <Grid container spacing={3} className={classes.noSessions}>
          <Grid item xs={12} md={12} lg={6} width="xs">
            <Paper elevation={5} className={paper}>
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
