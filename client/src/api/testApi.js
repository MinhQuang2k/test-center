import axiosClient from './axiosClient';
function arrayToQueryString(key, arr) {
  const res = arr.map((item) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(item);
  });
  return res;
}
function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      if (Array.isArray(obj[p])) {
        const res = arrayToQueryString(p, obj[p]);
        str.push(res.join('&'));
      } else {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
  return '?' + str.join('&');
}

const testApi = {
  getAll(query) {
    const url = `/api/tests${objectToQueryString(query)}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/tests';
    return axiosClient.post(url, data);
  },
  deleteById(id) {
    const url = `/api/tests/${id}`;
    return axiosClient.delete(url);
  },
  getById(id) {
    const url = `/api/tests/${id}`;
    return axiosClient.get(url);
  },
  updateInfoById(data) {
    const url = `/api/tests/${data.id}`;
    return axiosClient.put(url, data);
  },
  updateConfigById(data) {
    const url = `/api/tests/${data.id}/update-config`;
    return axiosClient.put(url, data);
  },
};

export default testApi;
