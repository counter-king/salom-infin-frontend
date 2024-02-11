import axiosConfig from "@/services/axios.config"

const URLS = {
  event: "calendar",
}
/**
 * Получает список мероприятий
 * */
export const fetchEventList = () => {
  return axiosConfig.get(`${URLS.event}/`)
}
/**
 * Создает новое мероприятие
 * */
export const fetchCreateEvent = (body) => {
  return axiosConfig.post(`${URLS.event}/`, body)
}
