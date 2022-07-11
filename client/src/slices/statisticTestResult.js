import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statisticApi from "../api/statisticApi";
export const PER_PAGE = 10;

export const getTestResult = createAsyncThunk(
  "getTestResult/fetched",
  async ({ id, keyword, order_by, page, notification, t }, thunkAPI) => {
    try {
      return await statisticApi.getTestResult(id, {
        keyword,
        order_by,
        page,
        per_page: PER_PAGE,
      });
    } catch (error) {
      notification.error({
        message: `${t("error_fetch_data", {
          ns: "test",
        })}`,
      });
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const deleteCandidateResult = createAsyncThunk(
  "deleteCandidateResult/Delete",
  async ({ id, notification, t }, thunkAPI) => {
    try {
      await statisticApi.deleteCandidateResult(id);
      notification.success({
        message: `${t("successfully_deleted_the_answer_sheet", {
          ns: "test",
        })}`,
      });
      return id;
    } catch (error) {
      notification.error({
        message: `${t("error_deleted_the_answer_sheet", {
          ns: "test",
        })}`,
      });
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const statisticTestResultSlice = createSlice({
  name: "statisticTestResult",
  initialState: {
    testResults: [],
    tests: {},
    isLoading: false,
    pagination: {
      currentPage: 1,
      totalRows: 0,
      rowPerPage: PER_PAGE,
    },
  },
  reducers: {},
  extraReducers: {
    [getTestResult.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTestResult.fulfilled]: (state, action) => {
      const { currentPage, rowPerPage, total } = action.payload?.pagination;
      state.testResults = action.payload?.test_results;
      state.tests = action.payload?.tests;
      state.pagination.rowPerPage = rowPerPage;
      state.pagination.currentPage = currentPage;
      state.pagination.totalRows = total;
      state.isLoading = false;
    },
    [getTestResult.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteCandidateResult.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteCandidateResult.fulfilled]: (state, action) => {
      state.testResults = state.testResults.filter(
        (tr) => tr.id !== action.payload
      );
      state.isLoading = false;
    },
    [deleteCandidateResult.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const statisticTestResultSelector = (state) =>
  state.statisticTestResultReducer;

export default statisticTestResultSlice.reducer;
