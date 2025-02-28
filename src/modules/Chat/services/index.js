import axiosConfig from "@/services/axios.config";

const URLS = {
  chatUsersSearch: "chat/search/",
  users: "chat-user-search/",
  chatPrivate: "chat/private/",
  chatGroup: "chat/group/",
  chatMessageSearch: "chat/message/search/",
  chatMessages: "chat/messages/",
  chatMessageLink: "chat/message/links/",
  chatMessageFiles: "chat/message/files/"
}
/** Returns created personal and group chats list in searching **/
export const fetchChatUsersSearch = (params) => {
  return axiosConfig.get(`${URLS.chatUsersSearch}`, params);
}
/** Returns global users list **/
export const fetchUsersSearch = (params) => {
  return axiosConfig.get(`${URLS.users}`, params);
}
/** Returns users by messages list **/
export const fetchUsersSearchByMessage = (params) => {
  return axiosConfig.get(`${URLS.chatMessageSearch}`, params);
}
/** Returns private chat list **/
export const fetchGetPrivateChatList = (params) => {
  return axiosConfig.get(`${URLS.chatPrivate}`, { page: 1, page_size: 100, ...params });
}
/** Creates private chat **/
export const fetchCreatePrivateChat = (body) => {
  return axiosConfig.post(`${URLS.chatPrivate}`, body);
}
/** get private chat by id **/
export const fetchGetPrivateChatById = (id) => {
  return axiosConfig.get(`${URLS.chatPrivate}${id}/`);
}

// delete private chat by id
export const fetchDeletePrivateChatById = (id) => {
  return axiosConfig.delete(`${URLS.chatPrivate}${id}/`);
}
// create group chat
export const fetchCreateGroupChat = (body) => {
  return axiosConfig.post(`${URLS.chatGroup}`, body);
}
// get group chat list
export const fetchGetGroupChatList = (params) => {
  return axiosConfig.get(`${URLS.chatGroup}`,  { page: 1, page_size: 100, ...params });
}
// get group chat by id
export const fetchGetGroupChatById = (id) => {
  return axiosConfig.get(`${URLS.chatGroup}${id}/`);
}
// edit group chat by id
export const fetchEditGroupChat = (id, body) => {
  return axiosConfig.put(`${URLS.chatGroup}${id}/`, body);
}
// delete group chat by id
export const fetchDeleteGroupChatById = (id) => {
  return axiosConfig.delete(`${URLS.chatGroup}${id}/`);
}

// get messages by chat id
export const fetchGetMessagesByChatId = (params) => {
  return axiosConfig.get(`${URLS.chatMessages}`, { page: 1, page_size: 10, ...params});
}
// edit message by id
export const fetchEditMessageById = (id, body) => {
  return axiosConfig.put(`${URLS.chatMessages}${id}/`, body);
}
// delete message by id
export const fetchDeleteMessageById = (id) => {
  return axiosConfig.delete(`${URLS.chatMessages}${id}/`);
}

// get message link list
export const fetchGetMessageLinkList = (params) => {
  return axiosConfig.get(`${URLS.chatMessageLink}`, params);
}
// get message files list
export const fetchGetMessageFilesList = (params) => {
  return axiosConfig.get(`${URLS.chatMessageFiles}`, params);
}