import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import examGroupsApi from '../api/examGroupsApi';
const initialState = {
  exams: [],
  filters: { page: 1 },
  isLoading: false,
};

export const fetchExamGroups = createAsyncThunk(
  'examGroup/fetchExamGroup',
  async (params) => {
    try {
      const response = await examGroupsApi.getSubAndPrimary(params);
      return response;
    } catch (error) {}
  },
);

const examSlice = createSlice({
  initialState,
  name: 'exams',
  reducers: {
    //static data
    addExam: (state, action) => {
      state.exams = [...state.exams, action.payload];
    },
    replaceFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamGroups.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchExamGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams = action.payload.data;
      });
  },
});
//reducer
export default examSlice.reducer;
//selector
export const examSelector = (state) => state.examReducer;
//action
export const { addExam, replaceFilter } = examSlice.actions;
