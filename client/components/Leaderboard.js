import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotLoggedIn from "./NotLoggedIn";
import { getLeaderboard } from "../store/leaderboard";

const Leaderboard = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const leaderboard = useSelector((state) => state.leaderboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  console.log("leaderboard", leaderboard);

  return (
    <div>
      {isLoggedIn ? <div>Leaderboard will go here</div> : <NotLoggedIn />}
    </div>
  );
};

export default Leaderboard;
