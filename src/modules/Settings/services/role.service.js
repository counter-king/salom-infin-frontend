import axiosConfig from '@/services/axios.config'

const URLS = {
  roles: 'roles'
}
/**
 *
 * */
export const fetchListRole = (params) => {
  return axiosConfig.get(`${URLS.roles}/`, params)
}
/**
 *
 * */
export const fetchOneRole = (id) => {
  return axiosConfig.get(`${URLS.roles}/${id}/`)
}
/**
 *
 * */
export const fetchCreateRole = (model) => {
  return axiosConfig.post(`${URLS.roles}/`, model)
}
/**
 *
 * */
export const fetchUpdateRole = (id, model) => {
  return axiosConfig.put(`${URLS.roles}/${id}/`, model)
}
/**
 *
 * */
export const fetchDeleteRole = (id) => {
  return axiosConfig.delete(`${URLS.roles}/${id}/`)
}
