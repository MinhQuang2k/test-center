import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `${process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PRODUCT
    : process.env.REACT_APP_API_URL_DEV
    }`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
