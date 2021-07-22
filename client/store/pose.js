import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const TOKEN = "token";

/**
 * THUNK CREATOR
 */

/*
in order to correctly access this thunk, we must dispatch from a
component with this format:
dispatch(getPose({ poseName: "squat" }));
*/
export const getPose = createAsyncThunk("/api/history", async (arg) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const {data: pose} = await axios.get(`/api/pose/${arg.poseName}`, {
        headers: {
          authorization: token,
        },
      });
      return pose;
    }
  } catch (error) {
    console.error(error);
  }
});

/**
 * REDUCER
 */

const poseSlice = createSlice({
  name: "pose",
  initialState: {},
  reducers: {
    setPose: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [getPose.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const {setPose} = poseSlice.actions;
export default poseSlice.reducer;
