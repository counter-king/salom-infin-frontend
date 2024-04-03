import axiosConfig from "@/services/axios.config"

const URLS = {
  event: "calendar",
}
/**
 * Получает список мероприятий
 * */
export const fetchEventList = (params) => {
  return axiosConfig.get(`${URLS.event}/`, params)
}
/**
 * Создает новое мероприятие
 * */
export const fetchCreateEvent = (body) => {
  return axiosConfig.post(`${URLS.event}/`, body)
}
/**
 * Изменить мероприятие
 * */
export const fetchUpdateEvent = (id, body) => {
  return axiosConfig.put(`${URLS.event}/${id}/`, body)
}
