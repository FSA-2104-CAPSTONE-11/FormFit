import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";


export default configureStore({
  reducer: { auth },
  middleware: [thunkMiddleware],
  devTools: true,
});
export * from "./auth";
