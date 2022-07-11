import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionGroupApi from "../api/questionGroupApi";
export const PER_PAGE = 10;

export const getQuestionGroups = createAsyncThunk(
  "questionGroups/fetched",
  async ({ page, keyword, per_page, notification, t }, thunkAPI) => {
    try {
      return await questionGroupApi.getQuestionGroup({
        page,
        keyword,
        per_page,
      });
    } catch (error) {
      notification.error({
        message: `${t("error_fetch_data", {
          ns: "category",
        })}`,
      });
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const addQuestionGroup = createAsyncThunk(
  "questionGroups/Added",
  async ({ questionGp, notification, t }, thunkAPI) => {
    try {
      await questionGroupApi.create(questionGp);
      notification.success({
        message: `${t("created_question_group_successfully", {
          ns: "category",
        })}`,
      });
      thunkAPI.dispatch(
        getQuestionGroups({ page: 1, keyword: "", per_page: PER_PAGE })
      );
      return;
    } catch (error) {
      if (error?.response.status === 403) {
        notification.error({
          message: `${t("question_group_name_has_already_been_taken", {
            ns: "category",
          })}`,
        });
      } else {
        notification.error({
          message: `${t("error_created_question_group", {
            ns: "category",
          })}`,
        });
      }

      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const deleteQuestionGroup = createAsyncThunk(
  "questionGroups/Deleted",
  async ({ id, notification, t }, thunkAPI) => {
    try {
      await questionGroupApi.remove(id);
      notification.success({
        message: `${t("deleted_question_group_successfully", {
          ns: "category",
        })}`,
      });
      const {
        questionGp,
        pagination: { currentPage, rowPerPage },
      } = thunkAPI.getState().questionGroupReducer;

      let page = currentPage;
      if (questionGp.length <= 1 && currentPage > 1) {
        page -= 1;
      }

      thunkAPI.dispatch(
        getQuestionGroups({
          page,
          keyword: "",
          per_page: rowPerPage,
        })
      );
      return;
    } catch (error) {
      notification.error({
        message: `${t("error_deleted_question_group", {
          ns: "category",
        })}`,
      });
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const updateQuestionGroup = createAsyncThunk(
  "questionGroups/Update",
  async ({ questionGp, notification, t }, thunkAPI) => {
    try {
      const response = await questionGroupApi.update(questionGp);
      notification.success({
        message: `${t("updated_question_group_successfully", {
          ns: "category",
        })}`,
      });

      return { ...questionGp, ...response };
    } catch (error) {
      if (error?.response.status === 403) {
        notification.error({
          message: `${t("question_group_name_has_already_been_taken", {
            ns: "category",
          })}`,
        });
      } else {
        notification.error({
          message: `${t("error_updated_question_group", {
            ns: "category",
          })}`,
        });
      }
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const questionGroupsSlice = createSlice({
  name: "questionGroups",
  initialState: {
    questionGp: [],
    isLoading: false,
    pagination: {
      currentPage: 1,
      totalRows: 0,
      rowPerPage: PER_PAGE,
    },
  },
  reducers: {},
  extraReducers: {
    [getQuestionGroups.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getQuestionGroups.fulfilled]: (state, action) => {
      const { currentPage, rowPerPage, total } = action.payload?.pagination;
      state.questionGp = action.payload?.data;
      state.pagination.rowPerPage = rowPerPage;
      state.pagination.currentPage = currentPage;
      state.pagination.totalRows = total;
      state.isLoading = false;
    },
    [getQuestionGroups.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addQuestionGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteQuestionGroup.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateQuestionGroup.fulfilled]: (state, action) => {
      state.questionGp = state.questionGp.map((qG) =>
        qG.id === action.payload.id ? action.payload : qG
      );
      state.isLoading = false;
    },
    [updateQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const questionGroupsSelector = (state) => state.questionGroupReducer;

export default questionGroupsSlice.reducer;
