import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import auth from "./auth";
import history from "./poseHistory";
import user from "./user";
import pose from "./pose";
import poseSession from "./poseSession";
import leaderboard from "./leaderboard";

export default configureStore({
  reducer: {auth, history, user, pose, poseSession, leaderboard},
  middleware: [thunkMiddleware],
  devTools: true,
});
export * from "./auth";
