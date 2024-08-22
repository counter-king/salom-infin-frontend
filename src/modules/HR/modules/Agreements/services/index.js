import axiosConfig from '@/services/axios.config'

const URLS = {
  negotiationTypes: 'negotiation-types',
  negotiationSubTypes: 'negotiation-sub-types',
  negotiation: 'negotiation',
  negotiators: 'negotiators'
}
export const fetchNegotiationTypes = (params = {}) => {
  return axiosConfig.get(`${URLS.negotiationTypes}/`, params)
}
/**
 *
 *
 */
export const fetchNegotiationSubTypes = (params = {}) => {
  return axiosConfig.get(`${URLS.negotiationSubTypes}/`, params)
}
/**
 *
 *
 */
export const fetchNegotiationList = (params) => {
  return axiosConfig.get(`${URLS.negotiation}/`, params)
}
/**
 *
 *
 */
export const fetchNegotiationById = ({ id, params }) => {
  return axiosConfig.get(`${URLS.negotiation}/${id}/`, params)
}
/**
 *
 *
 */
export const fetchNegotiators = (params) => {
  return axiosConfig.get(`${URLS.negotiators}/`, params)
}
/**
 *
 *
 */
export const fetchNegotiationCreate = (body) => {
  return axiosConfig.post(`${URLS.negotiation}/`, body)
}
