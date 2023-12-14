import axiosConfig from "@/services/axios.config"

const URLS = {
  list: "for-review/1",
  resolution: "resolution/1",
  performers: 'performers',
  changeReviewer: "change-reviewer",
  verifyOrCancel: "verify-or-cancel",
  acquaint: "acquaint"
}
/**
 * Список на рассмотрение
 * @returns Promise
 * */
export const fetchReviewList = (params = {}) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
/**
 * Получить на рассмотрение по id
 * @return Promise
 * */
export const fetchReviewById = (params) => {
  return axiosConfig.get(`${URLS.list}/${params.id}/`)
}
/**
 * Перенаправить документ
 * @return Promise
 * */
export const fetchChangeReviewer = ({ id, body }) => {
  return axiosConfig.put(`${URLS.list}/${id}/${URLS.changeReviewer}/`, body)
}
/**
 * Подписать или удалить подпись
 * @return Promise
 * */
export const fetchSignOrCancel = (body) => {
  return axiosConfig.put(`${URLS.resolution}/${URLS.verifyOrCancel}/`, body)
}
/**
 * Ознакомиться с документом
 * @return Promise
 * */
export const fetchAcquaintDocument = ({ id }) => {
  return axiosConfig.put(`${URLS.list}/${id}/${URLS.acquaint}/`)
}
/**
 * Получить список исполнителей
 * @return Promise
 * */
export const fetchPerformList = ({ id }) => {
  return axiosConfig.get(`${URLS.resolution}/${id}/${URLS.performers}/`)
}
