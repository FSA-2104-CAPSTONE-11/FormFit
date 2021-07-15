import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

/**
 * THUNK CREATOR
 */

export const getLeaderboard = createAsyncThunk("/api/leaderboard", async () => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: leaderboard } = await axios.get("/api/leaderboard", {
        headers: {
          authorization: token,
        },
      });
      return leaderboard;
    }
  } catch (error) {
    console.error(error);
  }
});

/**
 * REDUCER
 */

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: [],
  reducers: {
    setLeaderboard: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [getLeaderboard.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
