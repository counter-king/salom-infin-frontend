import axiosConfig from "@/services/axios.config"

const URLS = {
  docflow: "docflow/1",
  resolutionTree: "resolution-tree"
}
/**
 * Получить список документов
 * */
export const fetchGetDocumentList = (params) => {
  return axiosConfig.get(`${URLS.docflow}/`, params)
}
/**
 * Создает новый документ
 * */
export const fetchCreateDocument = (body) => {
  return axiosConfig.post(`${URLS.docflow}/`, body)
}
/**
 * Получить документ по id
 * */
export const fetchGetDocumentById = (id) => {
  return axiosConfig.get(`${URLS.docflow}/${id}/`)
}
/**
 * Изменить документ по id
 * */
export const fetchUpdateDocument = (payload) => {
  return axiosConfig.put(`${URLS.docflow}/${payload.id}/`, payload.body)
}
/**
 * Получить дерево
 * */
export const fetchGetTree = (id) => {
  return axiosConfig.get(`${URLS.docflow}/${id}/${URLS.resolutionTree}/`)
}
