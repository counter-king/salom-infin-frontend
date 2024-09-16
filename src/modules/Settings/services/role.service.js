import axiosConfig from '@/services/axios.config'

const URLS = {
  role: 'role'
}
/**
 *
 * */
export const fetchListRole = (params) => {
  return axiosConfig.get(`${URLS.role}/`, params)
}
/**
 *
 * */
export const fetchCreateRole = (model) => {
  return axiosConfig.post(`${URLS.role}/`, model)
}
/**
 *
 * */
export const fetchUpdateRole = (id, model) => {
  return axiosConfig.put(`${URLS.role}/${id}/`, model)
}
/**
 *
 * */
export const fetchDeleteRole = (id) => {
  return axiosConfig.delete(`${URLS.role}/${id}/`)
}
