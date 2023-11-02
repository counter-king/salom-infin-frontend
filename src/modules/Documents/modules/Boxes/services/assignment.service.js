import axiosConfig from "@/services/axios.config"

const URLS = {
  list: "my-assignment/1",
  acquaint: "acquaint",
  perform: "perform"
}
/**
 * Список поручение
 * @returns Promise
 * */
export const fetchAssignmentList = (params = {}) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
/**
 * Получить поручение по id
 * @return Promise
 * */
export const fetchAssignmentById = (params) => {
  return axiosConfig.get(`${URLS.list}/${params.id}/`)
}
/**
 * Ознакомиться с документом
 * @return Promise
 * */
export const fetchAcquaintDocument = ({ id }) => {
  return axiosConfig.put(`${URLS.list}/${id}/${URLS.acquaint}/`)
}
/**
 * Выполнить документ
 * @return Promise
 * */
export const fetchPerformDocument = ({ id, model }) => {
  return axiosConfig.put(`${URLS.list}/${id}/${URLS.perform}/`, model)
}
