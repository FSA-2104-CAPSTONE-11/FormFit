import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MUIPagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Pagination = ({ totalPoses, posesPerPage, paginate }) => {
  const classes = useStyles();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPoses / posesPerPage); i++) {
    console.log("are we looping");
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div>
        {pageNumbers.map((number) => {
          return (
            <span key={number} style={{ color: "white" }}>
              <a onClick={() => paginate(number)}>{number}</a>
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Pagination;
