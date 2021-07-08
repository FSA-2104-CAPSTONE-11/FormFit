import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../store/poseHistory";
import NavbarOffset from "./NavbarOffset";

// style imports
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/**
 * STYLES
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getHistory());
    }
  }, [isLoggedIn]);

  // function to manually alter each date we render
  const alterDate = (createdAt) => {
    const year = Number(createdAt.slice(0, 4));
    const monthIndex = createdAt.slice(5, 7) - 1;
    const day = Number(createdAt.slice(8, 10));
    const event = new Date(year, monthIndex, day);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return event.toLocaleDateString("US-en", options);
  };

  return (
    <div className={classes.root}>
      <NavbarOffset />
      <h1
        style={{
          textAlign: "center",
        }}
      >
        My Pose History
      </h1>
      {isLoggedIn ? (
        <div>
          {poseHistory.map((pose) => {
            return (
              <Accordion key={pose.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className={classes.column}>
                    <Typography className={classes.heading}>
                      {alterDate(pose.createdAt)}
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
                        <strong>Time:</strong>
                        {` ${pose.createdAt.slice(11, 16)} EST`}
                      </li>
                      <li>
                        <strong>Duration:</strong> {pose.length} seconds
                      </li>
                      <li>
                        <strong>Feedback:</strong> {pose.feedback}
                      </li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      ) : (
        <h3>Please log in to view this page!</h3>
      )}
    </div>
  );
};

export default History;
