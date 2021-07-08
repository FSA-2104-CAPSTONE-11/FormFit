import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import history from "./poseHistory";

export default configureStore({
  reducer: { auth, history },
  middleware: [thunkMiddleware],
  devTools: true,
});
export * from "./auth";
