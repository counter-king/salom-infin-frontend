import axiosConfig from "@/services/axios.config"

const URLS = {
  list: 'my-controls/1',
  acquaint: 'acquaint',
  removeFromControl: 'remove-from-control'
}
/**
 * Список на контроль
 * @returns Promise
 * */
export const fetchControlList = (params = {}) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
/**
 * Получить на контроль по id
 * @return Promise
 * */
export const fetchControlById = (params) => {
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
 * Снять с контроля
 * @return Promise
 * */
export const fetchRemoveFromControl = ({ id, model }) => {
  return axiosConfig.put(`${URLS.list}/${id}/${URLS.removeFromControl}/`, model)
}
