import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../store/poseHistory";
import NotLoggedIn from "./NotLoggedIn";
import { addToHistory } from "../store/poseHistory";
import { Link as ReactLink } from "react-router-dom";
import history from "../history";
import { deletePose } from "../store/poseSession";

// style imports
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";
import NavbarOffset from "./NavbarOffset";
import headerImage from "../../public/muscleHeader.png";

/**
 * STYLES
 */

// card style
const useCardStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  paper: {
    marginTop: theme.spacing(16),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    color: "black",
    display: "block",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: "80%",
  },
}));

// accordion style
const useAccordionStyles = makeStyles((theme) => ({
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
const SessionSummary = () => {
  const accordionClasses = useAccordionStyles();
  const cardClasses = useCardStyles();
  let [details, setDetails] = useState([]);

  const {
    id: poseId,
    name: poseName,
    criteria: shortDescription,
  } = useSelector((state) => state.pose);

  const {
    results: reps,
    summaryOfScores: summary,
    goodReps: score,
  } = useSelector((state) => state.poseSession);

  useEffect(() => {
    if (shortDescription) {
      for (const [key, value] of Object.entries(shortDescription)) {
        details.push(Object.values(value)[2]);
      }
    }
  }, [shortDescription]);

  const dispatch = useDispatch();

  const getFeedback = (repNumber, scoreNumber) => {
    if (scoreNumber === 0) {
      return "You can do better than that!";
    }
    if (repNumber > 0 && repNumber === scoreNumber) {
      return "WOW! Perfect! Keep it up!";
    }
    if (scoreNumber < 2) {
      if (5 < repNumber) {
        return "You did some reps, but not very well! Try again!";
      } else {
        return "Great progress, work on upping your reps and improving your form!";
      }
    }
    if (scoreNumber >= 2 && scoreNumber <= 5) {
      if (5 < repNumber) {
        return "Now we're moving, keep up the progress!";
      } else {
        return "That's a good score, but not many reps!";
      }
    }
    if (scoreNumber > 5) {
      return "Nice work!";
    }
  };

  const isLoggedIn = useSelector((state) => !!state.auth.id);
  let count = 0;
  let newCount = 0;

  const handleSave = () => {
    dispatch(
      addToHistory({
        reps: reps.length,
        poseId,
        feedback: getFeedback(reps.length, score),
        score,
      })
    );
    dispatch(deletePose());
    history.push("/history");
  };

  const handleDelete = () => {
    dispatch(deletePose());
    history.push("/detector");
  };

  return (
    <div>
      <NavbarOffset />
      {isLoggedIn ? (
        <div>
          <div>
            <Card className={cardClasses.root}>
              <CardMedia title="Session Summary Image">
                <img src={headerImage} style={{ width: "100%" }} />
              </CardMedia>
              {
                <div>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        {reps ? (
                          <Typography gutterBottom variant="h5" component="h2">
                            You completed {reps.length} reps! Your score was{" "}
                            {score}. Click on individual reps below to see
                            specific feedback.
                          </Typography>
                        ) : (
                          <Typography gutterBottom variant="h5" component="h2">
                            You completed 0 reps!
                          </Typography>
                        )}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <strong>Exercise: </strong>
                          {poseName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <strong>Requirement Breakdown:</strong>{" "}
                        </Typography>
                        <div>
                          {summary &&
                            Object.keys(summary).map((criterion) => {
                              count++;
                              if (criterion !== "reps") {
                                return (
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                    key={count}
                                  >
                                    <strong>{details[count - 1]}: </strong>
                                    {Math.floor(
                                      (summary[criterion] / reps.length) * 100
                                    )}
                                    %
                                  </Typography>
                                );
                              }
                            })}
                        </div>
                      </Grid>
                        <Grid item xs={12} sm={3}>
                          <Button
                            variant="contained"
                            className={cardClasses.button}
                            style={{
                              backgroundColor: "#FFC2B4",
                            }}
                            onClick={handleSave}
                            width="40%"
                          >
                            Save Session
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "red",
                            }}
                            className={cardClasses.button}
                            onClick={handleDelete}
                            width="40%"
                          >
                            Discard Session
                          </Button>
                        </Grid>
                    </Grid>
                  </CardContent>
                </div>
              }
            </Card>
          </div>
          <div className={accordionClasses.root}>
            {reps &&
              reps.map((rep) => {
                let perfect = true;
                Object.keys(rep).forEach((angle) => {
                  if (angle !== true) perfect = false;
                });
                return (
                  <Accordion key={reps.indexOf(rep)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className={accordionClasses.column}>
                        <Typography className={accordionClasses.heading}>
                          Rep {reps.indexOf(rep) + 1}
                        </Typography>
                      </div>
                      <div className={accordionClasses.column}>
                        {perfect ? (
                          <Typography className={accordionClasses.heading}>
                            Perfect!
                          </Typography>
                        ) : (
                          <Typography className={accordionClasses.heading}>
                            Click to see your feedback!
                          </Typography>
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        className={accordionClasses.body}
                        component={"span"}
                      >
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                          {Object.keys(rep).map((angle) => {
                            newCount++;
                            return (
                              <li key={newCount}>
                                <strong>
                                  {details[newCount % details.length]}:{" "}
                                </strong>
                                {`${rep[angle]}`}
                              </li>
                            );
                          })}
                        </ul>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default SessionSummary;
