import axiosConfig from "./axios.config"

const URLS = {
  list: "correspondents"
}
/**
 * Список корреспондентов
 * @returns Promise
 * */
export const fetchCorrespondentList = (params) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
/**
 * Создание корреспондента
 * */
export const fetchCorrespondentCreate = async (body) => {
  return await axiosConfig.post(`${URLS.list}/`, body)
}
/**
 * Получить корреспондент по id
 * */
export const fetchCorrespondentById = (params) => {
  return axiosConfig.get(`${URLS.list}/${params.id}`)
}
