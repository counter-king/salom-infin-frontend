// Core
import { defineStore } from "pinia"
// Services
import {
  fetchChatUsersSearch,
  fetchCreatePrivateChat,
  fetchGetPrivateChatList,
  fetchUsersSearch
} from "@/modules/Chat/services";

export const useChatStore = defineStore("chat-stores", {
  state: () => ({
    privateChatLoading: false,
    rightSidebarVisible: true,
    userSearching: false,
    userSearchLoading: false,
    chatList: [],
    privateChatList: [],
    userList: [],
    privateChatActive: true,
    groupChatActive: false
  }),
  actions: {
    toggleRightSidebar() {
      this.rightSidebarVisible = !this.rightSidebarVisible;
    },
    /** **/
    async actionChatUsersSearchList(params) {
      this.userSearchLoading = true;
      const response = await fetchChatUsersSearch(params);
      if (response) {
        this.chatList = response.data.results;
        this.userSearchLoading = false;
      } else {
        this.userSearchLoading = false;
      }
    },
    /** **/
    async actionUsersList(params){
      this.userSearchLoading = true;
      const response = await fetchUsersSearch(params);
      if (response) {
        this.userList = response.data.results;
        this.userSearchLoading = false;
      } else {
        this.userSearchLoading = false;
      }
    },
    /** **/
    async actionGetPrivateChatList(params) {
      this.privateChatLoading = true;
      const response = await fetchGetPrivateChatList(params);
      if (response){
        this.privateChatList = response.data.results;
        this.privateChatLoading = false;
      } else {
        this.privateChatLoading = false;
      }
    },
    /** **/
    async actionCreatePrivateChat(body) {
      const response = await fetchCreatePrivateChat(body);
      console.log(response)
    }
  }
})
