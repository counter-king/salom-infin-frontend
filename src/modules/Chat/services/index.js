import axiosConfig from "@/services/axios.config";

const URLS = {
  chatUsersSearch: "chat/search/",
  users: "chat-user-search/",
  chatPrivate: "chat/private/"
}
/** Returns created personal and group chats list in searching **/
export const fetchChatUsersSearch = (params) => {
  return axiosConfig.get(`${URLS.chatUsersSearch}`, params);
}
/** Returns global users list **/
export const fetchUsersSearch = (params) => {
  return axiosConfig.get(`${URLS.users}`, params);
}
/** Returns private chat list **/
export const fetchGetPrivateChatList = (params) => {
  return axiosConfig.get(`${URLS.chatPrivate}`, params);
}
/** Creates private chat **/
export const fetchCreatePrivateChat = (body) => {
  return axiosConfig.post(`${URLS.chatPrivate}`, body);
}
