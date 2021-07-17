import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../store/poseHistory";
import NotLoggedIn from "./NotLoggedIn";
import { format } from "timeago.js";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

// style imports
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Redirect } from "react-router";
import NavbarOffset from './NavbarOffset';

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

const usePageStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      backgroundColor: "primary",
    },
  },
}));

/**
 * COMPONENT
 */
const History = () => {
  const classes = useStyles();
  const pageClasses = usePageStyles();

  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const poseHistory = useSelector((state) => state.history);
  let poseName;
  let feedback;

  const [currentPage, setCurrentPage] = useState(1);
  const [posesPerPage, setPosesPerPage] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getHistory());
    }
  }, [isLoggedIn]);

  // get current posts
  const indexOfLastPose = currentPage * posesPerPage;
  const indexOfFirstPose = indexOfLastPose - posesPerPage;
  let currentPoses;
  if (poseHistory && poseHistory.length) {
    currentPoses = poseHistory.slice(indexOfFirstPose, indexOfLastPose);
  }

  const handleClick = (evt, page) => {
    setCurrentPage(page);
  };

  return (
    <div className={classes.root}>
      {isLoggedIn ? (
        <div>
          <NavbarOffset />
          {currentPoses && currentPoses.length ? (
            currentPoses.map((pose) => {
              if (pose.poseId === 1) {
                poseName = "Squat";
              }
              if (pose.poseId === 2) {
                poseName = "PushUp";
              }
              if (pose.poseId === 3) {
                poseName = "Situp";
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
                        {format(pose.date)}
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
                          <strong>Feedback:</strong> {pose.feedback}
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
          <div className={pageClasses.root}>
            <Pagination
              count={Math.ceil(poseHistory.length / posesPerPage)}
              onChange={(evt, page) => handleClick(evt, page)}
              variant="outlined"
              className={pageClasses.ul}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  style={{
                    backgroundColor: "white",
                  }}
                />
              )}
            />
          </div>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default History;
