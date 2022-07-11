import axiosClient from './axiosClient';

const subExamGroupsApi = {
  getSubAndPrimary(params) {
    const url = '/api/sub-exam-group';
    return axiosClient.get(url, { params });
  },
  create(params) {
    const url = '/api/sub-exam-group';
    return axiosClient.post(url, params);
  },
  update(id, params) {
    const url = `/api/sub-exam-group/${id}`;
    return axiosClient.patch(url, params);
  },
  move(id, params) {
    const url = `/api/sub-exam-group/${id}/move`;
    return axiosClient.patch(url, params);
  },
  remove(id) {
    const url = `/api/sub-exam-group/${id}`;
    return axiosClient.delete(url);
  },
};

export default subExamGroupsApi;
