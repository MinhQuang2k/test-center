import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const register = createAsyncThunk('user/register', async (payload) => {
  try {
    const data = await userApi.register(payload);
    return data.msg;
  } catch (error) {
    throw error.response.data.msg;
  }
});

export const login = createAsyncThunk('user/login', async (payload) => {
  try {
    const data = await userApi.login(payload);
    const user = jwt_decode(data.data.accessToken);
    localStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
    localStorage.setItem('user', JSON.stringify(user));
    return data.data;
  } catch (error) {
    throw error.response.data.msg;
  }
});

export const logout = createAsyncThunk('user/logout', async (payload) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  document.cookie = 'accessToken' + '=' + '';
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userLocalStorage: JSON.parse(localStorage.getItem('user')) || {},
    accessTokenLocalStorage:
      JSON.parse(localStorage.getItem('accessToken')) || {},
    currentUser: null,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.accessTokenLocalStorage = action.payload.accessToken;
      state.userLocalStorage = jwt_decode(action.payload.accessToken);
    },
    [logout.fulfilled]: (state, action) => {
      state.userLocalStorage = {};
      state.accessTokenLocalStorage = {};
    },
  },
});

const { reducer } = userSlice;
export const testSelector = (state) => state.testReducer;
export default reducer;
