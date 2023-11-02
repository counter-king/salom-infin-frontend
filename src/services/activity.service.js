import axiosConfig from "./axios.config"

const URLS = {
  list: "activity-logs"
}
/**
 * Получить список логов
 * @returns Promise
 * */
export const fetchActivityList = (params) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
