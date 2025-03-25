import axiosConfig from './axios.config'

const URLS = {
  inbox: 'unread-count',
  chat: 'dashboard/unread-chat-counts'
}
/**
 *
 * */
export const fetchDocumentCountList = (params = {}) => {
  return axiosConfig.get(`${URLS.inbox}/`, params)
}

// get unread chat message counts
export const fetchChatUnreadMessageCounts = (params = {}) => {
  return axiosConfig.get(`${URLS.chat}/`, params)
}