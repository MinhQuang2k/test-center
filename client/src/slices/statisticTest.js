import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statisticApi from "../api/statisticApi";
export const PER_PAGE = 10;

export const getTest = createAsyncThunk(
  "getTest/fetched",
  async ({ page, notification, t }, thunkAPI) => {
    try {
      return await statisticApi.getTest({ page, per_page: PER_PAGE });
    } catch (error) {
      notification.error({
        message: `${t("error_fetch_data", {
          ns: "statistic",
        })}`,
      });
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const statisticTestSlice = createSlice({
  name: "statisticTests",
  initialState: {
    tests: [],
    isLoading: false,
    pagination: {
      currentPage: 1,
      totalRows: 0,
      rowPerPage: PER_PAGE,
    },
  },
  reducers: {},
  extraReducers: {
    [getTest.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTest.fulfilled]: (state, action) => {
      const { currentPage, rowPerPage, total } = action.payload?.pagination;
      state.tests = action.payload?.tests;
      state.pagination.rowPerPage = rowPerPage;
      state.pagination.currentPage = currentPage;
      state.pagination.totalRows = total;
      state.isLoading = false;
    },
    [getTest.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const statisticTestSelector = (state) => state.statisticTestReducer;

export default statisticTestSlice.reducer;
