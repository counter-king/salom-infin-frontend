// Core
import { defineStore } from "pinia"
// Services
import {
  fetchChatUsersSearch,
  fetchCreatePrivateChat,
  fetchDeleteMessageById,
  fetchEditGroupChat,
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
import { CHAT_TYPES, MESSAGE_TYPES } from "../constatns";
// stores
import { useAuthStore } from "@/modules/Auth/stores";
import { useThemeStore } from "@/stores/theme.store";
// services
import { fetchBlobFile } from "@/services/file.service";
import { fetchGetMessageFilesList, fetchGetMessageLinkList } from "../services";
import { fetchChatUnreadMessageCounts } from "@/services/count.service";

const authStore = useAuthStore();

export const useChatStore = defineStore("chat-stores", {
  state: () => ({
    privateChatLoading: false,
    privateChatMoreLoading: false,
    rightSidebarVisible: true,
    userSearching: false,
    chatUserSearchListLoading: false,
    userSearchListLoading: false,
    groupChatLoading: false,
    groupChatMoreLoading: false,
    usersSearchByMessageListLoading: false,
    groupChatByIdLoading: false,
    privateChatByIdLoading: false,
    messageListByChatIdLoading: false,
    messageListByChatIdAddMoreLoading: false,
    deleteMessageByIdLoading: false,
    messageLinkListLoading: false,
    messageVideoFileListLoading: false,
    messageVideoFileListMoreLoading: false,
    messageImageFileListLoading: false,
    messageImageFileListMoreLoading: false,
    messageFileListLoading: false,
    messageFileListMoreLoading: false,
    messageAudioFileListLoading: false,
    messageAudioFileListMoreLoading: false,
    messageLinkListMoreLoading: false,
    messageFilesListLoading: false,
    allFiles: [],
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
    typingUsers: {},
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
    async setCounts() {
      const { data } = await fetchChatUnreadMessageCounts()
      const themeStore = useThemeStore()
      const chatMenu = themeStore.header.find(menu=> menu.name === 'chat')
      chatMenu.count = data.count
    },
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
              last_message:{text: item.last_message},
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
        this.usersSearchListByMessage = response.data.data?.map((item) => {
          if(item.chat_type === CHAT_TYPES.PRIVATE){
            return {
            first_name: item?.chat_title,
            full_name: item?.chat_title,
            position: item?.position?.name,
            chat_id: item.chat_id,
            color: item?.color,
            avatar: item?.avatar,
            last_message: item.message_text,
            last_message_date: item.created_date,
            last_message_type: item.message_text?.type,
            type: item.chat_type || CHAT_TYPES.PRIVATE,
            unread_count: item.unread_count
            }
          } else {
            return {
              title: item?.chat_title,
              image: item?.avatar,
              chat_id: item?.chat_id,
              last_message_time: item?.created_date,
              last_message_type: item?.message_type,
              last_message: { text: item?.message_text },
              last_message_id: item?.message_id,
              type: item?.chat_type,
              unread_count: item?.unread_count
            }
          }
      });
        this.usersSearchByMessageListLoading = false;
      } else {
        this.usersSearchByMessageListLoading = false;
      }
    },
    /** */
    async actionGetPrivateChatList(params, resetList = true) {
      if(this.privateChatLoading || this.privateChatMoreLoading) return;
      if(resetList){
        this.privateChatLoading = true;
      }
      else {
        this.privateChatMoreLoading = true;
      }
      try {
        const response = await fetchGetPrivateChatList(params);
        const results = response.data.results?.map((item) => ({
          first_name: item?.title,
          full_name: item?.title,
          position: item?.position?.name,
          chat_id: item.id,
          color: item.color,
          avatar: item.avatar,
          is_user_online: item.is_user_online,
          last_message: item.last_message?.text,
          last_message_date: item.last_message?.created_date,
          last_message_type: item.last_message?.type,
          last_message_id: item.last_message?.id,
          type: item.type,
          unread_count: item.unread_count
        }));

        if(resetList){
          this.privateChatList = results
        } else {
          this.privateChatList = [...this.privateChatList, ...results]
        }
        response.data.results = results
        return response
      } finally {
        this.privateChatLoading = false;
        this.privateChatMoreLoading = false;
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
        is_user_online: data.is_user_online,
        color: data.members?.find((item) => item.user?.id == body.member_id)?.user?.color,
        avatar: data.members?.find((item) => item.user?.id == body.member_id)?.user?.avatar,
        last_message: data?.last_message?.text,
        last_message_date: data?.last_message?.created_date,
        last_message_type: data?.last_message?.type,
        last_message_id: data?.last_message?.id,
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
        user_id: data.members?.find((item) => item.user?.id !== authStore.currentUser.id)?.user?.id,
        is_user_online: data.is_user_online,
        last_message: data?.last_message?.text,
        last_message_date: data?.last_message?.created_date,
        last_message_type: data?.last_message?.type,
        last_message_id: data?.last_message?.id,
        type: data.type,
        unread_count: data.unread_count
      }
    },
    /** */
    /** */
    async actionGetGroupChatList(params, resetList = true) {
      if(resetList){
        this.groupChatLoading = true;
      }
      else {
        this.groupChatMoreLoading = true;
      }
      try {
      const response = await fetchGetGroupChatList(params);
        const results = await Promise.all(response.data.results?.map(async (item) => {
          if(!!item.images.length){
            const image = item.images.find(image => image.is_placed == true)
            if(image?.image?.id){
              const { blobUrl } = await fetchBlobFile(image.image?.id)
              item.image = {}
              item.image.url = blobUrl
            }
          }
          return ({
            last_message: item.last_message,
            title: item.title,
            image: item.image,
            chat_id: item.id,
            members: item?.members || [],
            last_message_time: item.last_message?.created_date,
            last_message_type: item.last_message?.type,
            last_message_id: item.last_message?.id,
            type: item.type,
            unread_count: item.unread_count
          })
        })
      )


        if(resetList){
          this.groupChatList = results
        } else {
          this.groupChatList = [...this.groupChatList, ...results]
        }
        response.data.results = results
        return response
      }
      finally {
        this.groupChatLoading = false;
        this.groupChatMoreLoading = false;
      }
    },
    /** */
    /** */
    async actionGetGroupChatById(id) {
      this.groupChatByIdLoading = true;
      const { data } = await fetchGetGroupChatById(id);
      this.groupChatByIdLoading = false;
      try {
        if(data.images[0]?.image?.id){
        const { blobUrl } = await fetchBlobFile(data.images[0]?.image?.id)
        data.images[0].image.blobUrl = blobUrl
        }
        return {
          title: data?.title,
          image: data?.images[0]?.image,
          chat_id: data.id,
          members: data?.members.map((item)=>({
            first_name: item?.user?.first_name,
            full_name: item?.user?.full_name,
            position: item?.user?.position?.name,
            status: item?.user?.status,
            id: item?.user?.id,
            private_chat_id: item?.private_chat_id,
            chat_id: item?.chat,
            color: item?.user?.color,
            avatar: item?.user?.avatar,
            role: item?.role
          })) || [],
          last_message: data?.last_message?.message_text,
          last_message_time: data?.last_message?.created_date,
          last_message_type: data?.last_message?.type,
          last_message_id: data?.last_message?.id,
          type: data.type,
          unread_count: data.unread_count
        }
      } catch (err) {
        console.log(err)
      }
    },
    /** */
    /** */
    async actionEditGroupChatById(id, body) {
      const { data } = await fetchEditGroupChat(id, body);
      try {
        if(data.images[0]?.image?.id){
        const { blobUrl } = await fetchBlobFile(data.images[0]?.image?.id)
        data.images[0].image.blobUrl = blobUrl
        }
        return {
          title: data?.title,
          image: data?.images[0]?.image,
          chat_id: data.id,
          members: data?.members.map((item)=>({
            first_name: item?.user?.first_name,
            full_name: item?.user?.full_name,
            position: item?.user?.position?.name,
            status: item?.user?.status,
            id: item?.user?.id,
            private_chat_id: item?.private_chat_id,
            chat_id: item?.chat,
            color: item?.user?.color,
            avatar: item?.user?.avatar,
            role: item?.role
          })) || [],
          last_message: data?.last_message?.message_text,
          last_message_time: data?.last_message?.created_date,
          last_message_type: data?.last_message?.type,
          last_message_id: data?.last_message?.id,
          type: data.type,
          unread_count: data.unread_count
        }
      } catch (err) {
        console.log(err)
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
          if (item.type == MESSAGE_TYPES.IMAGE && item?.attachments[0]?.file?.id) {
            const { blobUrl } = await fetchBlobFile(item?.attachments[0]?.file?.id);
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
          is_read: item.is_read || false,
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
        console.log(e)
      }
    },
    /** */
    async actionDeleteMessageById(id) {
      try {
        this.deleteMessageByIdLoading = true;
        await fetchDeleteMessageById(id)
        this.contextMenu.deleteDialog = false;
      } catch(e) {
        console.log(e)
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
        console.log(e)
      } finally {
      }
    },
    /** */
    async actionGetMessageLinkList(params, resetList = true) {
      if(resetList){
        this.messageLinkListLoading = true;
      } else {
        this.messageLinkListMoreLoading = true;
      }
      try {
        const response= await fetchGetMessageLinkList(params);
        if(resetList){
          this.messageLinkList = response?.data?.results
        } else{
          this.messageLinkList = [...this.messageLinkList, ...response?.data?.results]
        }
        this.messageLinkListMoreLoading = false;
        return response
      } catch(e) {
        console.log(e)
      } finally {
          this.messageLinkListLoading = false;
          this.messageLinkListMoreLoading = false;
      }
    },
    /** */
    async actionGetMessageVideoFileList(params, resetList = true) {
      if(resetList){
        this.messageVideoFileListLoading = true;
      } else {
        this.messageVideoFileListMoreLoading = true;
      }
      try {
        const response = await fetchGetMessageFilesList(params);
        response.data.results = response?.data?.results?.map(item=>({
          attachments: item?.attachments[0],
          id: item?.id,
          created_date: item?.created_date,
          text: item?.text,
          uploaded: true,
        }))
        if(resetList){
          this.messageVideoFileList = response?.data?.results
        } else{
          this.messageVideoFileList = [...this.messageVideoFileList, ...response?.data?.results]
        }
        return response
      } catch(e) {
        console.log(e)
      }  finally {
        this.messageVideoFileListLoading = false;
        this.messageVideoFileListMoreLoading = false;
      }
    },
    /** */
    async actionGetMessageImageFileList(params, resetList = true) {
      if(resetList){
        this.messageImageFileListLoading = true;
      } else {
        this.messageImageFileListMoreLoading = true;
      }
      try {
        const response = await fetchGetMessageFilesList(params);
        response.data.results = response?.data?.results?.map(item=>({
          attachments: item?.attachments[0],
          id: item?.id,
          created_date: item?.created_date,
          text: item?.text,
          uploaded: true,
        }))
        if(resetList){
          this.messageImageFileList = response?.data?.results
        } else{
          this.messageImageFileList = [...this.messageImageFileList, ...response?.data?.results]
        }
        return response
      } catch(e) {
        console.log(e)
      } finally {
        this.messageImageFileListLoading = false;
        this.messageImageFileListMoreLoading = false;
      }
    },
    /** */
    async actionGetMessageFileList(params, resetList = true) {
      if(resetList){
        this.messageFileListLoading = true;
      } else {
        this.messageFileListMoreLoading = true;
      }
      try {
        const response= await fetchGetMessageFilesList(params);
        response.data.results = response?.data?.results?.map(item=>({
          attachments: item?.attachments[0],
          id: item?.id,
          created_date: item?.created_date,
          text: item?.text,
          uploaded: true,
        }))
        if(resetList){
          this.messageFileList = response?.data?.results
        } else{
          this.messageFileList = [...this.messageFileList, ...response?.data?.results]
        }
        return response
      } catch(e) {
        console.log(e)
      } finally {
        this.messageFileListLoading = false;
        this.messageFileListMoreLoading = false;
      }
    },
    /** */
    async actionGetMessageAudioFileList(params, resetList= true) {
      if(resetList){
        this.messageAudioFileListLoading = true;
      } else {
        this.messageAudioFileListMoreLoading = true;
      }
      try {
        const response= await fetchGetMessageFilesList(params);
        response.data.results = response?.data?.results?.map(item=>({
          attachments: item?.attachments[0],
          id: item?.id,
          created_date: item?.created_date,
          text: item?.text,
          uploaded: true,
        }))
        if(resetList){
          this.messageAudioFileList = response?.data?.results
        } else{
          this.messageAudioFileList = [...this.messageAudioFileList, ...response?.data?.results]
        }
        return response
      } catch(e) {
        console.log(e)
      } finally {
        this.messageAudioFileListLoading = false;
        this.messageAudioFileListMoreLoading = false;
      }
    },
  }
})
