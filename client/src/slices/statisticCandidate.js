import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statisticApi from "../api/statisticApi";
export const PER_PAGE = 10;

export const getCandidates = createAsyncThunk(
  "getCandidates/fetched",
  async ({ notification, t, page, ...optionsSelected }, thunkAPI) => {
    try {
      return await statisticApi.getCandidates({
        page,
        per_page: PER_PAGE,
        ...optionsSelected,
      });
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

const statisticCandidateSlice = createSlice({
  name: "statisticCandidate",
  initialState: {
    candidates: [],
    isLoading: false,
    pagination: {
      currentPage: 1,
      totalRows: 0,
      rowPerPage: PER_PAGE,
    },
  },
  extraReducers: {
    [getCandidates.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCandidates.fulfilled]: (state, action) => {
      const { currentPage, rowPerPage, total } = action.payload?.pagination;
      state.candidates = action.payload?.candidates;
      state.pagination.rowPerPage = rowPerPage;
      state.pagination.currentPage = currentPage;
      state.pagination.totalRows = total;
      state.isLoading = false;
    },
    [getCandidates.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const statisticCandidateSelector = (state) =>
  state.statisticCandidateReducer;

export default statisticCandidateSlice.reducer;
