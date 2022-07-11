import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statisticApi from "../api/statisticApi";
export const PER_PAGE = 2;

export const getTestCampaignResult = createAsyncThunk(
  "getTestCampaignResult/fetched",
  async (
    { notification, t, id, order_by, page, ...optionsSelected },
    thunkAPI
  ) => {
    try {
      return await statisticApi.getTestCampaignResult(id, {
        order_by,
        page,
        ...optionsSelected,
        per_page: PER_PAGE,
      });
    } catch (error) {
      notification.error({
        message: `${t("error_fetch_data", {
          ns: "testCampaign",
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
          ns: "testCampaign",
        })}`,
      });
      return id;
    } catch (error) {
      notification.error({
        message: `${t("error_deleted_the_answer_sheet", {
          ns: "testCampaign",
        })}`,
      });
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const statisticTestCampaignResultSlice = createSlice({
  name: "statisticTestCampaignResult",
  initialState: {
    test_campaign_result: [],
    question_statistic: {},
    result_statistic: {},
    examination: {},
    isLoading: false,
    pagination: {
      currentPage: 1,
      totalRows: 0,
      rowPerPage: PER_PAGE,
    },
  },
  reducers: {},
  extraReducers: {
    [getTestCampaignResult.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTestCampaignResult.fulfilled]: (state, action) => {
      const { currentPage, rowPerPage, total } = action.payload?.pagination;
      state.test_campaign_result = action.payload?.test_campaign_result;
      state.question_statistic = action.payload?.question_statistic;
      state.result_statistic = action.payload?.result_statistic;
      state.examination = action.payload?.examination;
      state.pagination.rowPerPage = rowPerPage;
      state.pagination.currentPage = currentPage;
      state.pagination.totalRows = total;
      state.isLoading = false;
    },
    [getTestCampaignResult.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteCandidateResult.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteCandidateResult.fulfilled]: (state, action) => {
      state.test_campaign_result = state.test_campaign_result.filter(
        (tr) => tr.id !== action.payload
      );
      state.isLoading = false;
    },
    [deleteCandidateResult.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const statisticTestCampaignResultSelector = (state) =>
  state.statisticTestCampaignResultReducer;

export default statisticTestCampaignResultSlice.reducer;
