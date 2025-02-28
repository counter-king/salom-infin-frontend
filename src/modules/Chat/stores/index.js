// Core
import { defineStore } from "pinia"
// Services
import {
  fetchChatUsersSearch,
  fetchCreatePrivateChat,
  fetchDeleteMessageById,
  fetchEditMessageById,
  fetchGetGroupChatById,
  fetchGetGroupChatList,
  fetchGetMessagesByChatId,
  fetchGetPrivateChatById,
  fetchGetPrivateChatList,
  fetchUsersSearch,
  fetchUsersSearchByMessage
} from "@/modules/Chat/services";
// constants  
import { CHAT_TYPES, collectionStikers, MESSAGE_TYPES } from "../constatns";
import { useAuthStore } from "@/modules/Auth/stores";
import { dispatchNotify } from "@/utils/notify";
import { COLOR_TYPES } from "@/enums";
import { fetchBlobFile } from "@/services/file.service";
import { fetchGetMessageFilesList, fetchGetMessageLinkList } from "../services";

const authStore = useAuthStore();

export const useChatStore = defineStore("chat-stores", {
  state: () => ({
    privateChatLoading: false,
    rightSidebarVisible: true,
    userSearching: false,
    chatUserSearchListLoading: false,
    userSearchListLoading: false,
    groupChatLoading: false,
    usersSearchByMessageListLoading: false,
    groupChatByIdLoading: false,
    privateChatByIdLoading: false,
    messageListByChatIdLoading: false,
    messageListByChatIdAddMoreLoading: false,
    deleteMessageByIdLoading: false,
    messageLinkListLoading: false,
    messageFilesListLoading: false,
    selectedUser: null,
    selectedGroup: null,
    chatUserSearchList: [],
    usersSearchListByMessage: [],
    messageVideoFileList: [],
    messageImageFileList: [],
    messageFileList: [],
    messageAudioFileList: [],
    messageListByChatId: [],
    privateChatList: [],
    userSearchList: [],
    groupChatList: [],
    messageLinkList: [],
    contextMenu: {
      tempMessage: null,
      message: null,
      index: null,
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
        this.chatUserSearchList = response.data?.map((item) => {
          if(item.type === 'private'){
            return {
              first_name: item.chat_title,
              full_name: item.chat_title,
              chat_id: item.id,
              position: item?.position?.name,
              color: item.color,
              avatar: item.avatar,
              last_message: item.last_message,
              last_message_date: item.last_message_date,
              last_message_type: item.last_message_type,
              type: item.type,
              unread_count: item.unread_count
            }
          }
          else {
            return {
              title: item.chat_title,
              image: item.avatar,
              chat_id: item.id,
              last_message: item.last_message,
              last_message_time: item.last_message_date,
              last_message_type: item.last_message_type,
              type: item.type,
              unread_count: item.unread_count
            }
          }
      });
        this.chatUserSearchListLoading = false;
      } else {
        this.chatUserSearchListLoading = false;
      }
    },
    /** */
    async actionUsersSearchList(params){
      this.userSearchListLoading = true;
      const response = await fetchUsersSearch(params);
      if (response) {
        this.userSearchList = response.data.results?.map((item)=>{
          return {
            first_name: item?.first_name,
            full_name: item?.full_name,
            position: item?.position?.name,
            chat_id: item.id,
            id: item.id,
            color: item?.color,
            avatar: item?.avatar,
            type: item.type,
            unread_count: item.unread_count
          }
        });
        this.userSearchListLoading = false;
      } else {
        this.userSearchListLoading = false;
      }
    },
    /** */
    /** */
    async actionUsersSearchByMessageList(params){
      this.usersSearchByMessageListLoading = true;
      const response = await fetchUsersSearchByMessage(params);
      if (response) {
        this.usersSearchListByMessage = response.data.data?.map((item) => ({
          first_name: item?.sender?.first_name,
          full_name: item?.sender?.full_name,
          position: item?.sender?.position?.name,
          chat_id: item.chat_id,
          color: item?.sender?.color,
          avatar: item?.sender?.avatar,
          last_message: item.message_text,
          last_message_date: item.created_date,
          last_message_type: item.message_text?.type,
          type: item.type || CHAT_TYPES.PRIVATE,
          unread_count: item.unread_count
        }));
        this.usersSearchByMessageListLoading = false;
      } else {
        this.usersSearchByMessageListLoading = false;
      }
    },
    /** */
    async actionGetPrivateChatList(params) {
      this.privateChatLoading = true;
      const response = await fetchGetPrivateChatList(params);
      if (response){
        this.privateChatList = response.data.results?.map((item) => ({
          first_name: item?.title,
          full_name: item?.title,
          position: item?.position?.name,
          chat_id: item.id,
          color: item.color,
          avatar: item.avatar,
          last_message: item.last_message?.text,
          last_message_date: item.last_message?.created_date,
          last_message_type: item.last_message?.type,
          type: item.type,
          unread_count: item.unread_count
        }));
        this.privateChatLoading = false;
      } else {
        this.privateChatLoading = false;
      }
    },
    /** */
    async actionCreatePrivateChat(body) {
      const { data } = await fetchCreatePrivateChat(body);
      return {
        first_name: data?.title,
        full_name: data?.title,
        position: data.members?.find((item) => item.user?.id == body.member_id)?.user?.position?.name,
        chat_id: data.id,
        color: data.members?.find((item) => item.user?.id == body.member_id)?.user?.color,
        avatar: data.members?.find((item) => item.user?.id == body.member_id)?.user?.avatar,
        last_message: data?.last_message?.text,
        last_message_date: data?.last_message?.created_date,
        last_message_type: data?.last_message?.type,
        type: data.type,
        unread_count: data.unread_count
      }
    },
    /** */
    async actionGetPrivateChatById(id) {
      this.privateChatByIdLoading = true;
      const { data } = await fetchGetPrivateChatById(id);
      this.privateChatByIdLoading = false;      
      return {
        first_name: data?.title,
        full_name: data?.title,
        position: data.members?.find((item) => item.user?.id !== authStore.currentUser.id)?.user?.position?.name,
        chat_id: data.id,
        color: data.members?.find((item) => item.user?.id !== authStore.currentUser.id)?.user?.color,
        avatar: data.members?.find((item) => item.user?.id !== authStore.currentUser.id)?.user?.avatar,
        members: data.members,
        last_message: data?.last_message?.text,
        last_message_date: data?.last_message?.created_date,
        last_message_type: data?.last_message?.type,
        type: data.type,
        unread_count: data.unread_count
      }
    },
    /** */
    /** */
    async actionGetGroupChatList(body) {
      this.groupChatLoading = true;
      const response = await fetchGetGroupChatList(body);
      if (response){
        this.groupChatList = response.data.results?.map((item) => ({
          last_message: item.last_message,
          title: item.title,
          image: item.images[0]?.image,
          chat_id: item.id,
          members: item?.members || [],
          last_message_time: item.last_message?.created_date,
          last_message_type: item.last_message?.type,
          type: item.type,
          unread_count: item.unread_count
        }));
        this.groupChatLoading = false;
      } else {
        this.groupChatLoading = false;
      }
    },
    /** */
    /** */
    async actionGetGroupChatById(id) {
      this.groupChatByIdLoading = true;
      const { data } = await fetchGetGroupChatById(id);
      this.groupChatByIdLoading = false;
      if(data){
        return {
          title: data?.title,
          image: data.images[0]?.image,
          chat_id: data.id,
          members: data?.members || [],
          last_message: data?.last_message?.message_text,
          last_message_time: data?.last_message?.created_date,
          last_message_type: data?.last_message?.type,
          type: data.type,
          unread_count: data.unread_count
        }
      }
    },
    /** */
    /** */
    async actionGetMessageListByChatId(params, resetList = true) {
      try {
        if(resetList){
          this.messageListByChatIdLoading = true;
        } else {
          this.messageListByChatIdAddMoreLoading = true;
        }
        const { data } = await fetchGetMessagesByChatId(params);
        const messageList =  await Promise.all(data?.results?.reverse()?.map( async (item) => {
          // reactions grouping
          const groupedReactions = {};
          item.reactions?.forEach(reaction => {
            const emoji = reaction.emoji;
            const user = reaction.user;
            if (!groupedReactions[emoji]) {
                groupedReactions[emoji] = [];
            }
            groupedReactions[emoji].push(user);
          });
                  // image fetch blob URL
          if (item.type == MESSAGE_TYPES.IMAGE && item.attachments[0]?.file?.id) {
            const { blobUrl } = await fetchBlobFile(item.attachments[0]?.file?.id);
            item.attachments[0].file.url = blobUrl;
          }

          return {
          attachments: item.attachments[0],
          chat_id: item.chat,
          created_date: item.created_date,
          edited: item.edited,
          message_id: item.id,
          modified_date: item.modified_date,
          replied_to: item.replied_to,
          sender: item.sender,
          text: item.text,
          message_type: item.type || MESSAGE_TYPES.TEXT,
          reactions: groupedReactions,
          uploaded: true,
        }}));

        if(resetList){
          this.messageListByChatId = messageList;
          this.messageListByChatIdLoading = false;
        } else {
          this.messageListByChatIdAddMoreLoading = false;
          this.messageListByChatId = [...messageList, ...this.messageListByChatId]
        }
        // checking has next page
        return data
      } catch(e){
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } 
    },
    /** */
    async actionDeleteMessageById(id) {
      try {
        this.deleteMessageByIdLoading = true;
        await fetchDeleteMessageById(id)
        this.contextMenu.deleteDialog = false;
      } catch(e) {
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } finally{
        this.deleteMessageByIdLoading = false;
      }
    },
    /** */
    async actionEditMessageById(id, body) {
      try { 
        await fetchEditMessageById(id, body)
        this.contextMenu.edit = false;
      } catch(e) {
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } finally {  
      }
    },
    /** */
    async actionGetMessageLinkList(params) {
      this.messageLinkListLoading = true;
      try {
        const { data } = await fetchGetMessageLinkList(params);
        this.messageLinkList = data.results
        this.messageLinkListLoading = false;
      } catch(e) {
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } finally {
        this.messageLinkListLoading = false;
      }
    },
    /** */
    async actionGetMessageVideoFileList(params) {
      try {
        const { data } = await fetchGetMessageFilesList(params);
        this.messageVideoFileList = data
      } catch(e) {
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } finally {
      }
    },
    /** */
    async actionGetMessageImageFileList(params) {
      try {
        const { data } = await fetchGetMessageFilesList(params);
        this.messageImageFileList = data
      } catch(e) {
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } finally {
      }
    },
    /** */
    async actionGetMessageFileList(params) {
      try {
        const { data } = await fetchGetMessageFilesList(params);
        this.messageFileList = data
      } catch(e) {
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } finally {
      }
    },
    /** */
    async actionGetMessageAudioFileList(params) {
      try {
        const { data } = await fetchGetMessageFilesList(params);
        this.messageAudioFileList = data
      } catch(e) {
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } finally {
      }
    },
    /** */
    async actionGetMessageAudioFileList(params) {
      try {
        const { data } = await fetchGetMessageFilesList(params);
        return data
      } catch(e) {
        dispatchNotify(null, e, COLOR_TYPES.ERROR)
      } finally {
      }
    }
  }
})
