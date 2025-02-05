// Core
import { defineStore } from "pinia"
// Services
import {
  fetchChatUsersSearch,
  fetchCreatePrivateChat,
  fetchGetGroupChatList,
  fetchGetPrivateChatById,
  fetchGetPrivateChatList,
  fetchUsersSearch
} from "@/modules/Chat/services";

export const useChatStore = defineStore("chat-stores", {
  state: () => ({
    privateChatLoading: false,
    rightSidebarVisible: true,
    userSearching: false,
    chatUserSearchListLoading: false,
    userSearchListLoading: false,
    groupChatLoading: false,
    selectedUser: null,
    selectedGroup: null,
    chatUserSearchList: [],
    privateChatList: [],
    userSearchList: [],
    groupChatList: [],
    contextMenu: {
      tempData: null,
      data: null,
      edit: false,
      replay: false,
      deleteDialog: false
    },
    uploadingFiles: []
  }),
  actions: {
    toggleRightSidebar() {
      this.rightSidebarVisible = !this.rightSidebarVisible;
    },
    /** */
    async actionChatUsersSearchList(params) {
      this.chatUserSearchListLoading = true;
      const response = await fetchChatUsersSearch(params);
      if (response) {
        this.chatUserSearchList = response.data.results;
        this.chatUserSearchListLoading = false;
      } else {
        this.chatUserSearchListLoading = false;
      }
    },
    /** */
    async actionUsersList(params){
      this.userSearchListLoading = true;
      const response = await fetchUsersSearch(params);
      if (response) {
        this.userSearchList = response.data.results;
        this.userSearchListLoading = false;
      } else {
        this.userSearchListLoading = false;
      }
    },
    /** */
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
    },
    /** */
    async actionGetPrivateChatById(id) {
      const response = await fetchGetPrivateChatById(id);
      console.log(response)
    },
    /** */
    /** */
    async actionGetGroupChatList(body) {
      this.groupChatLoading = true;
      const response = await fetchGetGroupChatList(body);
      if (response){
        this.groupChatList = response.data.results;
        this.groupChatLoading = false;
      } else {
        this.groupChatLoading = false;
      }
    }
    /** */
  }
})
