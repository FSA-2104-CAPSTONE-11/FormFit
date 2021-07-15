import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const TOKEN = "token";

/**
 * THUNK CREATOR
 */

export const getUser = createAsyncThunk("/api/user", async () => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const {data: user} = await axios.get(`/api/user`, {
        headers: {
          authorization: token,
        },
      });
      return user;
    }
  } catch (error) {
    console.error(error);
  }
});

export const updateUser = createAsyncThunk("/api/user", async (form) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const {newUsername, newEmail} = form;
    let username = newUsername;
    let email = newEmail;
    if (token) {
      const {data: user} = await axios.put(
        `/api/user`,
        {username, email},
        {
          headers: {
            authorization: token,
          },
        }
      );
      return user;
    }
  } catch (error) {
    console.error(error);
  }
});

/**
 * REDUCER
 */

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      console.log("extra reducer")
      return action.payload;
    },
    [updateUser.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
