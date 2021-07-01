import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import history from '../history';

const TOKEN = 'token'

/**
 * THUNK CREATORS
 */

export const me = createAsyncThunk('auth/me', async (arg, thunkAPI) => {
  const { dispatch } = thunkAPI;
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
});


//removed email, add back when needed.
export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (arg, thunkAPI) => {
    const { username, password, formName: method } = arg;
    const { dispatch } = thunkAPI;
    try {
      const res =
        method === 'signup'
          ? await axios.post(`/auth/${method}`, { username, password})
          : await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return { error: authError };
    }
  }
);

export const handleLogout = createAsyncThunk(
  'auth/handleLogout',
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await dispatch(logout());
    history.push('/');
  }
);

const logout = createAsyncThunk('auth/logout', () => {
  window.localStorage.removeItem(TOKEN);
  return {};
});

/**
 * REDUCER
 */

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [me.fulfilled]: (state, action) => {
      return action.payload;
    },
    [authenticate.fulfilled]: (state, action) => {
      return action.payload;
    },
    [logout.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
