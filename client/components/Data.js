import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getUser} from "../store/user";
import Chart from "./Chart";
import {SessionsPieChart, RepsPieChart} from "./AllExerciseChart";
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
    padding: theme.spacing(1),
    display: "flex",
    // overflow: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20, 
  },
  paperHeight: {
    height: 100,
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
  pie: {
    MuiPaper: {
      square: true,
    }
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
  },
}));

const Data = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const {poseSessions} = useSelector((state) => state.user);
  const classes = useStyles();
  const piePaper = clsx(classes.paper, classes.piePaperHeight);
  const paper = clsx(classes.paper, classes.paperHeight);
  const pieChart = clsx(classes.pie, classes.chart);
  const pieChartHeader = clsx(classes.pie, classes.chartHeader);

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
          <Grid container spacing={0}>
          <Grid item xs={12} md={12} lg={12}>
              <Paper elevation={5} square={true} className={pieChartHeader}>
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
              <Paper elevation={5} className={pieChart}>
                    <SessionsPieChart exerciseSessions={exerciseSessions} />
                    <RepsPieChart exerciseSessions={exerciseSessions} />
              </Paper>
            </Grid>
          </Grid>
          {exerciseSessions.map((exercise) => {
            return (
              <div key={exerciseSessions.indexOf(exercise)}>
                <Grid container spacing={3}>
                  {/* <Grid container> */}
                  <Grid item xs={6} md={3} lg={3} width="xs">
                    <Paper elevation={5} className={paper}>
                      <ThemeProvider theme={theme}>
                        <Typography component="h3" variant="h4">
                          {exercise.length}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                          {exercise[0].pose.name} sessions
                        </Typography>
                      </ThemeProvider>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3} lg={3} width="xs">
                    <Paper elevation={5} className={paper}>
                      <ThemeProvider theme={theme}>
                        <Typography component="h3" variant="h4">
                          {exercise.reduce((a, session) => {
                            return a + session.reps;
                          }, 0)}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                          {exercise[0].pose.name}s
                        </Typography>
                      </ThemeProvider>
                    </Paper>
                  </Grid>
                  {/* </Grid> */}
                  <Grid item xs={12} md={6} lg={6} width="xs">
                    <Paper elevation={5} className={piePaper}>
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
