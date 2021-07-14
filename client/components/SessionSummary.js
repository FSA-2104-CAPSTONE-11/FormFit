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
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

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
  media2: {
    height: 160,
  },
  paper: {
    marginTop: theme.spacing(16),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

  const { id: poseId, name: poseName } = useSelector((state) => state.pose);
  const {
    results: reps,
    summaryOfScores: summary,
    goodReps: score,
  } = useSelector((state) => state.poseSession);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => !!state.auth.id);
  let count = 0;

  const handleSave = () => {
    dispatch(
      addToHistory({
        reps: reps.length,
        poseId,
        feedback: JSON.stringify(summary),
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
      {isLoggedIn ? (
        <div>
          <div>
            <Card className={cardClasses.root}>
              <CardMedia
                className={cardClasses.media2}
                image="https://thumb9.shutterstock.com/image-photo/stock-vector-vector-illustration-of-squat-vector-icon-or-symbol-250nw-600173141.jpg"
                title="History Image"
              />
              {
                <div>
                  <CardContent>
                    {reps ? (
                      <Typography gutterBottom variant="h5" component="h2">
                        You completed {reps.length} reps! Your score was {score}
                        , as you passed a majority of the specs that many times.
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
                                <strong>{criterion}: </strong>
                                {(summary[criterion] / reps.length) * 100}%
                              </Typography>
                            );
                          }
                        })}
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button onClick={handleSave}>Save Session</Button>
                    <Button onClick={handleDelete}>Delete Session</Button>
                  </CardActions>
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
                            count++;
                            return (
                              <li key={count}>
                                <strong>{angle} </strong>
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
