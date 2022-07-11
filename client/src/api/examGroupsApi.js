import axiosClient from './axiosClient';

const examGroupsApi = {
  getSubAndPrimary(params) {
    const url = '/api/exam-group';
    return axiosClient.get(url, { params });
  },
  create(params) {
    const url = '/api/exam-group';
    return axiosClient.post(url, params);
  },
  update(id, params) {
    const url = `/api/exam-group/${id}`;
    return axiosClient.patch(url, params);
  },
  remove(id) {
    const url = `/api/exam-group/${id}`;
    return axiosClient.delete(url);
  },
};

export default examGroupsApi;
