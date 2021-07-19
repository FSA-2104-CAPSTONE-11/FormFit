import React from "react";
import {
  makeStyles,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: 10,
  },
}));

const RepsData = (props) => {
  const classes = useStyles();
  const exercise = props.exercise;
  let avatarColor;
  if (exercise[0].pose.name === "squat") {
    avatarColor = "#0D95FD";
  }
  if (exercise[0].pose.name === "pushup") {
    avatarColor = "#9d4edd";
  }
  if (exercise[0].pose.name === "situp") {
    avatarColor = "#26A96C";
  }

  return (
    <ThemeProvider theme={theme}>
      <Avatar className={classes.avatar} style={{backgroundColor: avatarColor}}>
        <Typography component="h3" variant="h4">
          {exercise.reduce((a, session) => {
            return a + session.reps;
          }, 0)}
        </Typography>
      </Avatar>
      <Typography variant="subtitle2" gutterBottom>
        {exercise[0].pose.name}s
      </Typography>
    </ThemeProvider>
  );
};

export default RepsData;
