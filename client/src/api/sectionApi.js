import axiosClient from './axiosClient';

const sectionApi = {
  create(data) {
    const url = '/api/sections';
    return axiosClient.post(url, data);
  },
  deleteById(id) {
    const url = `/api/sections/${id}`;
    return axiosClient.delete(url);
  },
  updateById(data) {
    const url = `/api/sections/${data.id}`;
    return axiosClient.put(url, data);
  },
};

export default sectionApi;
