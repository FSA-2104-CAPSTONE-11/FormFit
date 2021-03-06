import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const TOKEN = "token";

/**
 * THUNK CREATOR
 */

export const getHistory = createAsyncThunk("/api/history", async () => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const {data: history} = await axios.get("/api/history", {
        headers: {
          authorization: token,
        },
      });
      return history;
    }
  } catch (error) {
    console.error(error);
  }
});

export const addToHistory = createAsyncThunk(
  "/api/history",
  async (arg, thunkAPI) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const {dispatch} = thunkAPI;
        await axios.post("/api/history", arg, {
          headers: {
            authorization: token,
          },
        });
        dispatch(getHistory());
      }
    } catch (error) {
      console.error(error);
    }
  }
);

/**
 * REDUCER
 */

const historySlice = createSlice({
  name: "history",
  initialState: [],
  reducers: {
    setHistory: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [getHistory.fulfilled]: (state, action) => {
      return action.payload;
    },
    [addToHistory.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const {setHistory} = historySlice.actions;
export default historySlice.reducer;
