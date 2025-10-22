import axiosConfig from '@/services/axios.config'

const URLS = {
  list: 'policies'
}
/**
 *
 * */
export const fetchListPolicies = (params) => {
  return axiosConfig.get(`${URLS.list}/`, params)
}
/**
 *
 * */
export const fetchByIdPolicies = (id) => {
  return axiosConfig.get(`${URLS.list}/${id}/`)
}
/**
 *
 * */
export const fetchCreatePolicies = (model) => {
  return axiosConfig.post(`${URLS.list}/`, model)
}
/**
 *
 * */
export const fetchUpdatePolicies = (id, model) => {
  return axiosConfig.put(`${URLS.list}/${id}/`, model)
}
/**
 *
 * */
export const fetchDeletePolicies = (id) => {
  return axiosConfig.delete(`${URLS.list}/${id}/`)
}
