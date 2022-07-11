import { createSlice } from '@reduxjs/toolkit';
export const LANGUAGE_VI = 'vi';
export const LANGUAGE_EN = 'en';

const MultiLanguage = createSlice({
  name: 'multiLanguage',
  initialState: {
    language: localStorage['i18nextLng'] || LANGUAGE_VI,
  },
  reducers: {
    changeLocales: (state, action) => {
      state.language = action.payload;
    },
  },
});

// Reducer
const multiLanguageReducer = MultiLanguage.reducer;

// Selector
export const multiLanguageSelector = (state) => state.multiLanguageReducer;

// Actions
export const { changeLocales } = MultiLanguage.actions;

// Export reducer
export default multiLanguageReducer;
