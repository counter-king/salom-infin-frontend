import axiosConfig from '@/services/axios.config'

const URLS = {
  roles: 'policies/role/assignments'
}
/**
 *
 * */
export const fetchAssignmentRoleList = (params) => {
  return axiosConfig.get(`${URLS.roles}/`, params)
}
/**
 *
 * */
export const fetchAssignmentRoleById = (id) => {
  return axiosConfig.get(`${URLS.roles}/${id}/`)
}
/**
 *
 * */
export const fetchAssignmentRoleCreate = (model) => {
  return axiosConfig.post(`${URLS.roles}/`, model)
}
/**
 *
 * */
export const fetchAssignmentRoleUpdate = (id, model) => {
  return axiosConfig.put(`${URLS.roles}/${id}/`, model)
}
/**
 *
 * */
export const fetchAssignmentRoleDelete = (id) => {
  return axiosConfig.delete(`${URLS.roles}/${id}/`)
}
