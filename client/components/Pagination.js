import React, { useEffect, useState } from "react";

const Pagination = ({ totalPoses, posesPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPoses / posesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div>
        {pageNumbers.map((number) => {
          return (
            <span key={number} style={{ color: "white" }}>
              <a onClick={() => paginate(number)}>{number} </a>
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Pagination;
