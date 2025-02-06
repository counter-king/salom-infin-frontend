import axiosConfig from "@/services/axios.config";

const URLS = {
  chatUsersSearch: "chat/search/",
  users: "chat-user-search/",
  chatPrivate: "chat/private/",
  chatGroup: "chat/group/"
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
/** get private chat by id **/
export const fetchGetPrivateChatById = (id) => {
  return axiosConfig.get(`${URLS.chatPrivate}${id}/`);
}
// create group chat
export const fetchCreateGroupChat = (body) => {
  return axiosConfig.post(`${URLS.chatGroup}`, body);
}
// get group chat list
export const fetchGetGroupChatList = (params) => {
  return axiosConfig.get(`${URLS.chatGroup}`, params);
}
// get group chat by id
export const fetchGetGroupChatById = (id) => {
  return axiosConfig.get(`${URLS.chatGroup}${id}/`);
}
// delete group chat by id
export const fetchDeleteGroupChatById = (id) => {
  return axiosConfig.delete(`${URLS.chatGroup}${id}/`);
}