import axiosConfig from '@/services/axios.config'

const URLS = {
  negotiation: 'negotiation-types'
}
export const fetchNegotiationTypes = (params = {}) => {
  return axiosConfig.get(`${URLS.negotiation}/`, params)
}
