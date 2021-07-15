import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotLoggedIn from "./NotLoggedIn";
import { getLeaderboard } from "../store/leaderboard";

// style imports
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// style classes
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

// component
const Leaderboard = () => {
  const classes = useStyles();

  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const leaderboard = useSelector((state) => state.leaderboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  console.log("leaderboard", leaderboard);

  return (
    <div>
      {isLoggedIn ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell align="right">Total Score</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard &&
                leaderboard.map((user, idx) => (
                  <StyledTableRow key={idx}>
                    <StyledTableCell component="th" scope="row">
                      {user[0]}
                    </StyledTableCell>
                    <StyledTableCell align="right">{user[1]}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default Leaderboard;
