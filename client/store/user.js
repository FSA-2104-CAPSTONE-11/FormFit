import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const TOKEN = "token";

/**
 * THUNK CREATOR
 */

export const getUser = createAsyncThunk("/api/users/:id", async (id) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    console.log(token, id)
    if (token) {
      const {data: user} = await axios.get(`/api/users/${id}`, {
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

export const updateUser = createAsyncThunk("/api/users/:id", async (form) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const {id, newUsername, newEmail} = form;
    let username = newUsername;
    let email = newEmail;
    if (token) {
      const {data: user} = await axios.put(
        `/api/users/${id}`,
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
      return action.payload;
    },
    [updateUser.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
