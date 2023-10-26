import axiosConfig from "@/services/axios.config"

const URLS = {
  resolution: "resolution/1",
  resolutionList: "my-resolution/1",
  acquaint: "acquaint"
}
/**
 * Создает резолюцию
 * */
export const fetchCreateResolution = (body) => {
  return axiosConfig.post(`${URLS.resolution}/`, body)
}
/**
 * Получает список созданных резолюции
 * */
export const fetchResolutionList = (params) => {
  return axiosConfig.get(`${URLS.resolutionList}/`, params)
}
/*
* Получить созданную резолюцию по id
* */
export const fetchResolutionById = ({ id, params }) => {
  return axiosConfig.get(`${URLS.resolution}/${id}/`, params)
}
/*
* Изменить созданную резолюцию по id
* */
export const fetchUpdateResolutionById = ({ id, body }) => {
  return axiosConfig.put(`${URLS.resolution}/${id}/`, body)
}
/*
* Удалить созданную резолюцию по id
* */
export const fetchDeleteResolutionById = ({ id, comment }) => {
  return axiosConfig.delete(`${URLS.resolution}/${id}/`, { params: { comment } })
}
