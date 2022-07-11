import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import sectionApi from '../api/sectionApi';

const initialState = {
  section: null,
  message: '',
};

export const createSection = createAsyncThunk(
  'sections/create',
  async (data, thunkAPI) => {
    try {
      return await sectionApi.create(data);
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

export const updateSection = createAsyncThunk(
  'sections/update',
  async (data, thunkAPI) => {
    try {
      return await sectionApi.updateById(data);
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

export const deleteSection = createAsyncThunk(
  'sections/delete',
  async (id, thunkAPI) => {
    try {
      return await sectionApi.deleteById(id);
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

const sectionSlice = createSlice({
  initialState,
  name: 'section',
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSection.fulfilled, (state, action) => {
        state.section = action.payload.section;
        state.message = action.payload.message;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.section = action.payload.section;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.section = +action.payload.deletedId;
        state.message = action.payload.message;
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export default sectionSlice.reducer;

export const sectionSelector = (state) => state.sectionReducer;

export const { reset } = sectionSlice.actions;
