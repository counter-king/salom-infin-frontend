import axiosConfig from './axios.config'

const URLS = {
  inbox: 'unread-count'
}
/**
 *
 * */
export const fetchDocumentCountList = (params = {}) => {
  return axiosConfig.get(`${URLS.inbox}/`, params)
}
