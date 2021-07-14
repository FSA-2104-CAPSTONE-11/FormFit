import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TOKEN = "token";

/**
 * THUNK CREATOR
 */

export const createPose = createAsyncThunk("/summary", (arg) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return arg;
  }
});

export const deletePose = createAsyncThunk("/summary", () => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return {};
  }
});

/**
 * REDUCER
 */

const poseSessionSlice = createSlice({
  name: "poseSession",
  initialState: {},
  reducers: {
    setPoseSession: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [createPose.fulfilled]: (state, action) => {
      return action.payload;
    },
    [deletePose.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPoseSession } = poseSessionSlice.actions;
export default poseSessionSlice.reducer;
