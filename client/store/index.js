import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import history from "./poseHistory";
import user from "./user";
import pose from "./pose";

export default configureStore({
  reducer: { auth, history, user, pose },
  middleware: [thunkMiddleware],
  devTools: true,
});
export * from "./auth";
