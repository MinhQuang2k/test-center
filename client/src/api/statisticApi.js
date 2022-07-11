import axiosClient from "./axiosClient";
import { objectToQueryString } from "../utils/statistic";
const statisticApi = {
  getTest(query) {
    const url = `api/statistic/tests${objectToQueryString(query)}`;
    return axiosClient.get(url);
  },
  getTestCampaign(query) {
    const url = `api/statistic/campaigns${objectToQueryString(query)}`;
    return axiosClient.get(url);
  },
  getCandidates(query) {
    const url = `api/statistic/answer-sheets${objectToQueryString(query)}`;
    return axiosClient.get(url);
  },
  getTestResult(id, query) {
    const url = `api/statistic/tests/${id}${objectToQueryString(query)}`;
    return axiosClient.get(url);
  },
  getTestCampaignResult(id, query) {
    const url = `api/statistic/campaigns/${id}${objectToQueryString(query)}`;
    return axiosClient.get(url);
  },
  deleteCandidateResult(id) {
    const url = `api/candidates/${id}`;
    return axiosClient.delete(url);
  },
};

export default statisticApi;
