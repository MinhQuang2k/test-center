import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statisticApi from "../api/statisticApi";
export const PER_PAGE = 10;

export const getTestCampaign = createAsyncThunk(
  "getTestCampaign/fetched",
  async ({ page, notification, t }, thunkAPI) => {
    try {
      return await statisticApi.getTestCampaign({
        page,
        per_page: PER_PAGE,
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

const statisticTestCampaignSlice = createSlice({
  name: "statisticTestCampaign",
  initialState: {
    testCampaigns: [],
    isLoading: false,
    pagination: {
      currentPage: 1,
      totalRows: 0,
      rowPerPage: PER_PAGE,
    },
  },
  reducers: {},
  extraReducers: {
    [getTestCampaign.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTestCampaign.fulfilled]: (state, action) => {
      const { currentPage, rowPerPage, total } = action.payload?.pagination;
      state.testCampaigns = action.payload?.test_campaigns;
      state.pagination.rowPerPage = rowPerPage;
      state.pagination.currentPage = currentPage;
      state.pagination.totalRows = total;
      state.isLoading = false;
    },
    [getTestCampaign.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const statisticTestCampaignSelector = (state) =>
  state.statisticTestCampaignReducer;

export default statisticTestCampaignSlice.reducer;
