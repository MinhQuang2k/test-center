import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./examGroup";
import multiLanguageReducer from "./multiLanguage";
import testReducer from "./test";
import sectionReducer from "./section";
import userReducer from "./userSlice";
import questionGroupReducer from "./questionGroup";
import statisticTestReducer from "./statisticTest";
import statisticTestCampaignReducer from "./statisticTestCampaign";
import statisticCandidateReducer from "./statisticCandidate";
import statisticTestResultReducer from "./statisticTestResult";
import statisticTestCampaignResultReducer from "./statisticTestCampaignResult";

const rootReducer = {
  examReducer,
  multiLanguageReducer,
  testReducer,
  sectionReducer,
  user: userReducer,
  questionGroupReducer,
  statisticTestReducer,
  statisticTestCampaignReducer,
  statisticCandidateReducer,
  statisticTestResultReducer,
  statisticTestCampaignResultReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
