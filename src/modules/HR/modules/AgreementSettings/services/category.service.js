import axiosConfig from '@/services/axios.config'

const URLS = {
  categories: 'negotiation-types'
}
/**
 *
 * */
export const fetchCategory = (params) => {
  return axiosConfig.get(`${URLS.categories}/`, params)
}
/**
 *
 * */
export const fetchCategoryCreate = (model) => {
  return axiosConfig.post(`${URLS.categories}/`, model)
}
/**
 *
 * */
export const fetchCategoryUpdate = (id, model) => {
  return axiosConfig.put(`${URLS.categories}/${id}/`, model)
}
/**
 *
 * */
export const fetchCategoryDelete = (id) => {
  return axiosConfig.delete(`${URLS.categories}/${id}/`)
}
