import axiosConfig from "@/services/axios.config"

const URLS = {
  count: 'inbox-unread-count'
}
export const fetchDocumentCountList = (params = {}) => {
  return axiosConfig.get(`${URLS.count}/`, params)
}
