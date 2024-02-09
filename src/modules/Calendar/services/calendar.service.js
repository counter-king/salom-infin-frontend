import axiosConfig from "@/services/axios.config"

const URLS = {
  event: "event",
}
/**
 * Создает новое мероприятие
 * */
export const fetchCreateEvent = (body) => {
  return axiosConfig.post(`${URLS.event}/`, body)
}
