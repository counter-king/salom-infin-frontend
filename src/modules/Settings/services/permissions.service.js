import axiosConfig from '@/services/axios.config'

const URLS = {
  projectPermissions: 'project-permissions'
}
/**
 *
 * */
export const fetchListPermission = (params) => {
  return axiosConfig.get(`${URLS.projectPermissions}/`, params)
}
/**
 *
 * */
export const fetchCreatePermission = (model) => {
  return axiosConfig.post(`${URLS.projectPermissions}/`, model)
}
/**
 *
 * */
export const fetchUpdatePermission = (id, model) => {
  return axiosConfig.put(`${URLS.projectPermissions}/${id}/`, model)
}
/**
 *
 * */
export const fetchDeletePermission = (id) => {
  return axiosConfig.delete(`${URLS.projectPermissions}/${id}/`)
}
