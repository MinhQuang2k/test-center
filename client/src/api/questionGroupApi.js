import axiosClient from "./axiosClient"

const questionGroupApi = {
  getQuestionGroup(query) {
    const { keyword, page, per_page } = query
    const url = `api/question-group?page=${page}&per_page=${per_page}&keyword=${keyword}`
    return axiosClient.get(url)
  },
  create(data) {
    const url = "/api/question-group"
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `api/question-group/${data.id}`
    return axiosClient.patch(url, data)
  },
  remove(id) {
    const url = `/api/question-group/${id}`
    return axiosClient.delete(url)
  },
}

export default questionGroupApi
