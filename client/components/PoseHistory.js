import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../store/poseHistory";

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
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

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

  return (
    <div className={classes.root}>
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
                  <Typography className={classes.heading}>
                    Date: {pose.createdAt}
                  </Typography>
                  <Typography className={classes.heading}>
                    Score: {pose.score}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Duration: {pose.length} seconds Feedback: {pose.feedback}
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
