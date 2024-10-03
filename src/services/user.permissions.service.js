import axiosConfig from './axios.config'

const URLS = {
  list: 'my-permissions'
}
/**
 * Список пользовательских прав доступа
 * @returns Promise
 * */
export const fetchUserPermissions = (params) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
