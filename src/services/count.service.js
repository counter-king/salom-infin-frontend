import axiosConfig from './axios.config'

const URLS = {
  inbox: 'inbox-unread-count',
  dashboard: 'dashboard/new-counts'
}
/**
 *
 * */
export const fetchDocumentCountList = (params = {}) => {
  return axiosConfig.get(`${URLS.inbox}/`, params)
}
/**
 *
 * */
export const fetchDashboardCountList = (params = {}) => {
  return axiosConfig.get(`${URLS.dashboard}/`, params)
}
