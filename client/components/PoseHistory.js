import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from "../store/poseHistory";

const History = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const poseHistory = useSelector((state) => state.history);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getHistory());
    }
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {poseHistory.map((pose) => {
            return (
              <div key={pose.id}>
                <h1>Score: {pose.score}</h1>
                <h2>Feedback: {pose.feedback}</h2>
                <h3>Duration: {pose.length} seconds</h3>
                <h4>Date: {pose.createdAt}</h4>
              </div>
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
