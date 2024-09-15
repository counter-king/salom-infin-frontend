import axiosConfig from "./axios.config"

const URLS = {
  list: 'all-urls'
}
/**
 * Получить список апи пути
 * @returns Promise
 * */
export const fetchAllUrls = (params) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
