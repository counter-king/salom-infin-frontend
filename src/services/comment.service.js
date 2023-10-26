import axiosConfig from "./axios.config"

const URLS = {
  list: "comments"
}
/**
 * Получить список комментариев
 * @returns Promise
 * */
export const fetchCommentsList = (params) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
/**
 * Добавить комментарий
 * @returns Promise
 * */
 export const fetchSendComment = (body) => {
  return axiosConfig.post(`${URLS.list}/`, body)
}
/**
 * Ответить комментарий
 * @returns Promise
 * */
 export const fetchReplyComment = (body) => {
  return axiosConfig.post(`${URLS.list}/`, body)
}
/**
 * Изменить комментарий
 * @returns Promise
 * */
 export const fetchUpdateComment = ({ id, data }) => {
  return axiosConfig.put(`${URLS.list}/${id}/`, data)
}
/**
 * Удалить комментарий
 * @returns Promise
 * */
export const fetchDeleteComment = (id) => {
  return axiosConfig.delete(`${URLS.list}/${id}/`)
}
