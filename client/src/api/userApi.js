import axiosClient from './axiosClient';
import axios from 'axios';

const userApi = {
  register(data) {
    const url = process.env.REACT_APP_API_URL_DEV + '/api/users';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = process.env.REACT_APP_API_URL_DEV + '/api/login';
    return axios.post(url, data);
  },
  logout(data) {
    const url = process.env.REACT_APP_API_URL_DEV + '/api/logout';
    return axios.delete(url, data);
  },
};

export default userApi;
