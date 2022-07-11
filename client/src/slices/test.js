import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import testApi from '../api/testApi';
import { fetchExamGroups } from './examGroup';
import { notification } from 'antd';
const initialState = {
  tests: [],
  isLoading: false,
  isError: false,
  test: null,
  pagination: {
    page: 1,
    totalRows: 0,
    rowPerPage: 15,
  },
  message: '',
};

export const getAllTest = createAsyncThunk(
  'tests/getAll',
  async (query, thunkAPI) => {
    try {
      const examGroupState = thunkAPI.getState().examReducer.exams;
      if (!examGroupState.length) {
        thunkAPI.dispatch(fetchExamGroups());
      }
      return await testApi.getAll(query);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getTest = createAsyncThunk(
  'tests/getOne',
  async (id, thunkAPI) => {
    try {
      const examGroupState = thunkAPI.getState().examReducer.exams;
      if (!examGroupState.length) {
        thunkAPI.dispatch(fetchExamGroups());
      }
      return await testApi.getById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createTest = createAsyncThunk(
  'tests/create',
  async (data, thunkAPI) => {
    try {
      return await testApi.create(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteTest = createAsyncThunk(
  'tests/delete',
  async (id, thunkAPI) => {
    try {
      return await testApi.deleteById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      notification['error']({
        message,
        duration: 2,
      });
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateInfo = createAsyncThunk(
  'tests/updateInfo',
  async (data, thunkAPI) => {
    try {
      return await testApi.updateInfoById(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateConfig = createAsyncThunk(
  'tests/updateConfig',
  async (data, thunkAPI) => {
    try {
      return await testApi.updateConfigById(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const testSlide = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.message = '';
    },
    resetTest: (state) => {
      state.test = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getAllTest.fulfilled, (state, action) => {
        state.tests = action.payload.tests;
        state.pagination = action.payload.pagination;
        state.isLoading = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(getAllTest.rejected, (state, action) => {
        state.tests = [];
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.test = action.payload.data;
        state.isLoading = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(getTest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.test = { ...action.payload.test };
        state.isLoading = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(createTest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.tests = state.tests.filter(
          ({ id }) => id !== +action.payload.deletedId,
        );
      })
      .addCase(deleteTest.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.test = { ...state.test, ...action.payload.test };
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateConfig.fulfilled, (state, action) => {
        state.test = { ...state.test, ...action.payload.test };
      })
      .addCase(updateConfig.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default testSlide.reducer;

export const testSelector = (state) => state.testReducer;

export const { reset, resetTest } = testSlide.actions;
