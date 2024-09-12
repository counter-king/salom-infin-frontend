import axiosConfig from '@/services/axios.config'

const URLS = {
  types: 'negotiation-sub-types'
}
/**
 *
 * */
export const fetchTypes = (params) => {
  return axiosConfig.get(`${URLS.types}/`, params)
}
/**
 *
 * */
export const fetchTypesCreate = (model) => {
  return axiosConfig.post(`${URLS.types}/`, model)
}
/**
 *
 * */
export const fetchTypesUpdate = (id, model) => {
  return axiosConfig.put(`${URLS.types}/${id}/`, model)
}
/**
 *
 * */
export const fetchTypesDelete = (id) => {
  return axiosConfig.delete(`${URLS.types}/${id}/`)
}
