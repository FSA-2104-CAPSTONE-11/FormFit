import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../store/poseHistory";
import NotLoggedIn from "./NotLoggedIn";
import { format } from "timeago.js";

// style imports
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Redirect } from "react-router";

/**
 * STYLES
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  column: {
    flexBasis: "50%",
  },
}));

/**
 * COMPONENT
 */
const History = () => {
  const classes = useStyles();

  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const poseHistory = useSelector((state) => state.history);
  let poseName;
  let feedback;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getHistory());
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.root}>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        My Pose History
      </h1>
      {isLoggedIn ? (
        <div>
          {poseHistory && poseHistory.length ? (
            poseHistory.map((pose) => {
              if (pose.poseId === 1) {
                poseName = "Squat";
              }
              if (pose.poseId === 2) {
                poseName = "PushUp";
              }
              if (pose.poseId === 3) {
                poseName = "Situp";
              }
              if (pose.reps <= 1 && pose.score === 0) {
                feedback = "You can do better than that!";
              }
              if (pose.reps < 3 && pose.score < pose.reps) {
                feedback = "You did some reps, but not perfect! Try again!";
              }
              if (pose.reps > 0 && pose.reps === pose.score) {
                feedback = "WOW! Perfect! Keep it up!";
              } else {
                feedback = "Nice amount of reps! Now work on that form!";
              }
              return (
                <Accordion key={pose.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div className={classes.column}>
                      <Typography className={classes.heading}>
                        {format(pose.createdAt)}
                      </Typography>
                    </div>
                    <div className={classes.column}>
                      <Typography className={classes.heading}>
                        Score: {pose.score}
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.body} component={"span"}>
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                          <strong>Exercise:</strong> {poseName}
                        </li>
                        <li>
                          <strong>Reps: </strong>
                          {pose.reps}
                        </li>
                        <li>
                          <strong>Feedback:</strong> {feedback}
                        </li>
                      </ul>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <div />
          )}
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default History;
