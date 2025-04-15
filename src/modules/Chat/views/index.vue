<script setup>
// core
import { useI18n } from "vue-i18n";
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// components
import { ChatAreWrapper, LeftSidebar, RightSidebar } from "@/modules/Chat/components";
// socket
import { socket } from "@/services/socket";
// contants
import { CHAT_ROUTE_NAMES, CHAT_TYPES, MESSAGE_TYPES, WEBCOCKET_EVENTS } from "../constatns";
// store
import { useChatStore } from "../stores";
import { useAuthStore } from "@/modules/Auth/stores";
// composibles
import useNotificationSound from "../composables/useNotificationSound";
// css
import 'vue3-emoji-picker/css'

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const authStore = useAuthStore();
const { playNotificationSound } = useNotificationSound()
const allowedPages = ['ChatPrivateDetail','ChatGroupDetail']
const { status, data, send } = socket()
// reactives
const isShowChat = computed(() => allowedPages.includes(route.name))
const inputSendMessasgeRef = ref(null)
const refChatArea = ref(null)
const chatHandshakeChatIds = ref([])

let typingTimeouts = {};
// privder
provide("inputSendMessasgeRef", inputSendMessasgeRef) 
provide('refChatArea', refChatArea)
// methods
const sendUserHandshake = ()=> {
  const payload = { command: 'user_handshake' }
  send(JSON.stringify(payload))
}

const handleScrollDownSmooth =()=> {
  refChatArea.value.scrollTo({
    top: refChatArea.value?.scrollHeight,
    behavior: 'smooth'
  })
}

// websocketdan, kelgan ma'lumotlarni kuzatish
watch(data, (newData) => {
  if(!newData) return
  newData = JSON.parse(newData);
  // console.log("user hand",newData);
  const isPrivate = (newData?.chat_type || newData?.content?.chat_type) == CHAT_TYPES.PRIVATE
  const chat_id = isPrivate ? chatStore.selectedUser?.chat_id : chatStore.selectedGroup?.chat_id
  if(newData.command == WEBCOCKET_EVENTS.USER_HANDSHAKE) {
    // console.log("user hand",newData);
  }
  else if(newData.command == WEBCOCKET_EVENTS.CHAT_HANDSHAKE) {
    // console.log("chat hand",newData);
    if(!chatHandshakeChatIds.value.includes(newData.chat_id)) {
      chatHandshakeChatIds.value.push(newData.chat_id)
    }
  }

  else if(newData.type == WEBCOCKET_EVENTS.NEW_MESSAGE) {  
    const chatList = isPrivate ? chatStore.privateChatList : chatStore.groupChatList 
    // if chat not found, add it
    if(!chatList.some(item=> item.chat_id == newData.chat_id) && newData.chat_type == (isPrivate ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP)){
          chatList.unshift({
          first_name: newData.sender?.first_name,
          full_name: newData.sender?.full_name,
          position: newData.sender?.position?.name,
          chat_id: newData.chat_id,
          chat_uid: newData?.chat_uid,
          color: newData.sender?.color,
          avatar: newData.sender?.avatar,
          last_message: newData.text,
          last_message_date: newData.created_date,
          last_message_type: newData.message_type,
          last_message_id: newData?.message_id,
          type: newData.chat_type,
          unread_count: newData.unread_count  
        })
      }

       // Yuborilgan fayllarni olib tashlash
      chatStore.uploadingFiles = chatStore.uploadingFiles.filter(
        item => item?.attachments?.file?.id !== newData?.files[0]?.id
      );

      const isSrollStayDown = refChatArea.value?.scrollHeight - refChatArea.value?.clientHeight <= Math.floor(refChatArea.value?.scrollTop) + 100;
      // add a new message to messageList
      if(chat_id == newData.chat_id){
          chatStore.messageListByChatId.push({
          attachments: { file: newData?.files[0] },
          chat_id: newData.chat_id,
          created_date: newData.created_date,
          edited: newData.edited,
          message_id: newData.message_id,
          modified_date: newData.modified_date,
          replied_to: newData.replied_to,
          is_read: newData.is_read || false,
          sender: newData.sender,
          text: newData.text,
          message_type: newData.message_type,
          chat_type: newData.chat_type,
          uploaded: true,
          reactions: [],
        });
      }
      
      // get chat files count, when current user send a file message
      if(newData.message_type != MESSAGE_TYPES.TEXT && chat_id == (chatStore.selectedUser?.chat_id || chatStore.selectedGroup?.chat_id)) {
        chatStore.actionGetChatFilesCount(chat_id)
      }

       // Oxirgi xabarni yangilash
      const chat = chatList.find(item => item.chat_id == newData.chat_id);
      if (chat && isPrivate) {
        chat.last_message = newData.text;
        chat.last_message_id = newData?.message_id
        // unread_countni 1 ga oshirish
        if(newData.sender?.id != authStore.currentUser?.id) {
          chat.unread_count += 1; 
        }
      }
      if (chat && !isPrivate) {
        chat.last_message = { sender: newData.sender, text: newData.text}
        chat.last_message_id = newData?.message_id
        // unread_countni 1 ga oshirish
        if(newData.sender?.id != authStore.currentUser?.id) {
          chat.unread_count += 1; 
        }
      }

      // if user current then make scroll push untill bottom 
      if(authStore.currentUser?.id == newData.sender?.id){
        setTimeout(handleScrollDownSmooth,1);
      }
      // if user not current, but if scroll stand at bottom, then make scroll push untill bottom
      else if(isSrollStayDown){ setTimeout(handleScrollDownSmooth, 1)}
  }
  else if(newData.type == WEBCOCKET_EVENTS.MESSAGE_DELETED) {  
    chatStore.messageListByChatId = chatStore.messageListByChatId.filter(item=> item.message_id != newData?.content?.message_id)
    chatStore.contextMenu.deleteDialog = false

    const chatList = newData?.content?.chat_type == CHAT_TYPES.PRIVATE ? chatStore.privateChatList : chatStore.groupChatList
    const chat = chatList.find(item=> item.chat_id == newData?.content?.chat_id)
    if(chat) {
      // decrement unread count of chat
      if(chat?.unread_count > 0) {
        chat.unread_count -= 1
      }
      // update last message of chat
      if(chat && newData?.content?.chat_type == CHAT_TYPES.PRIVATE) {
          if(newData?.content?.message_id == chat.last_message_id){
            chat.last_message = newData?.content?.last_message_text
          }
      }
      else if(chat && newData?.content?.chat_type == CHAT_TYPES.GROUP) {
        if(newData?.content?.message_id == chat.last_message_id){
            chat.last_message.text = newData?.content?.last_message_text
            chat.last_message.sender.first_name = newData?.content?.last_message_sender?.split(" ")[1]
        }
      }
    }
    // get chat files count, when current user send a file message
    if(newData.content.message_type != MESSAGE_TYPES.TEXT && chat.chat_id == (chatStore.selectedUser?.chat_id || chatStore.selectedGroup?.chat_id)) {
      chatStore.actionGetChatFilesCount(chat.chat_id)
    }
  }
  else if(newData.type == WEBCOCKET_EVENTS.MESSAGE_UPDATE) {
    // if a message is related to current messageListByChatId, update it 
    let message = chatStore.messageListByChatId.find(item=> item.message_id == newData?.content?.message_id)
    if(message) {
      message.text = newData?.content?.text
      message.edited = true
    }
    // update last message of chat
    const chatList = newData?.content?.chat_type == CHAT_TYPES.PRIVATE ? chatStore.privateChatList : chatStore.groupChatList
    const chat = chatList.find(item=> item.chat_id == newData?.content?.chat_id)
    if(chat && newData?.content?.chat_type == CHAT_TYPES.PRIVATE) {
        if(newData?.content?.message_id == chat.last_message_id){
          chat.last_message = newData?.content?.text
        }
    }
    else if(chat && newData?.content?.chat_type == CHAT_TYPES.GROUP) {
      if(newData?.content?.message_id == chat.last_message_id){
          chat.last_message.text = newData?.content?.text
      }
    }
  }
  else if(newData.type == WEBCOCKET_EVENTS.NEW_GROUP_CHAT) {
    if(!chatStore.groupChatList.find(item=> item.chat_id == newData?.content?.chat_id)){
      chatStore.groupChatList.unshift({
        chat_id: newData?.content?.chat_id,
        chat_uid: newData?.content?.uid,
        title: newData?.content?.title,
        image: newData?.content?.image,
        members: newData?.content?.members,
      })
    }
  }
  else if(newData.type == WEBCOCKET_EVENTS.MESSAGE_REACTION) {
    const message = chatStore.messageListByChatId.find(item=> item.message_id == newData?.message_id)
    if (!message) return
    if(newData?.action == "created") {
      const reactions = { ...message.reactions }
      if (!reactions[newData.emoji]) {
        reactions[newData.emoji] = []
      }

      reactions[newData.emoji].push(newData.user)

      message.reactions = reactions
    }
    else if(newData?.action == "deleted"){
      message.reactions[newData.emoji] = message.reactions[newData?.emoji].filter(user=> user.id != newData?.user?.id)
      if(message.reactions[newData.emoji]?.length == 0) {
        delete message.reactions[newData.emoji]
      }
    }
    else if(newData?.action == "updated") {
        // Eski emojini o‘chirib, yangisini qo‘shish
        Object.keys(message.reactions).forEach(emoji => {
          message.reactions[emoji] = message.reactions[emoji].filter(user => {
            if (user.id === newData?.user?.id) {
              // Foydalanuvchi eski emojida bo‘lsa, uni o‘chiramiz
              return false;
            }
            return true;
          });
          // Agar eski emoji bo‘sh bo‘lib qolsa, uni o‘chiramiz
          if (message.reactions[emoji].length === 0) {
            delete message.reactions[emoji];
          }
        });
        // Yangi emojini qo‘shish
        if (!message.reactions[newData?.emoji]) {
          message.reactions[newData?.emoji] = [];
        }
        message.reactions[newData?.emoji].push(newData?.user);
    }
  }
  else if(newData.type == WEBCOCKET_EVENTS.TYPING) {
    chatStore.typingUsers[newData?.user?.id] = newData
    // Clear any existing timeout for this user
    if (typingTimeouts[newData?.user?.id]) {
      clearTimeout(typingTimeouts[newData?.user?.id]);
    }
    // Set a new timeout for this user
    typingTimeouts[newData?.user?.id] = setTimeout(() => {
      delete chatStore.typingUsers[newData?.user?.id];
    }, 1000);
  }
  else if(newData.type == WEBCOCKET_EVENTS.MESSAGE_READ) {
    
    const message = chatStore.messageListByChatId.find(item=> item.message_id == newData?.message_id)
    if(message?.sender?.id != newData?.user?.id){
      if(message && !message.is_read){
        message.is_read = true
        // when messags are readed, then decrease count of unread message count from chat list
        const chatPrivate = chatStore.privateChatList.find(item=> item.chat_id == message?.chat_id) 
        const chatGroup = chatStore.groupChatList.find(item=> item.chat_id == message?.chat_id) 
        if(chatPrivate?.unread_count > 0){
          chatPrivate.unread_count -= 1
        }
        if(chatGroup?.unread_count > 0){
          chatGroup.unread_count -= 1
        }
      }
    }

  }
  else if(newData.type == WEBCOCKET_EVENTS.CHAT_DELETED) {
    const isPrivate = newData.content.chat_type == CHAT_TYPES.PRIVATE
    if(isPrivate) {
      chatStore.privateChatList = chatStore.privateChatList.filter(item => item.chat_id != newData?.content.chat_id)
    } else  {
      chatStore.groupChatList = chatStore.groupChatList.filter(item => item.chat_id != newData?.content.chat_id)
    }
    // if current chat is active, then redirect to chat index
    if(chat_id == newData?.content.chat_id){
      router.push({ name: CHAT_ROUTE_NAMES.CHAT_INDEX, query : { tab: newData?.content.chat_type == CHAT_TYPES.GROUP ? 'group' : undefined } })
    }
  }
  else if(newData.type == WEBCOCKET_EVENTS.USER_STATUS){
    const chat = chatStore.privateChatList.find(item=> item.chat_id == newData?.content?.chat_id)
    if(chat){
      chat.is_user_online = newData?.content.status == "online" ? true : false
      if(!!chatStore.selectedUser && chatStore.selectedUser.user_id == newData?.content.user_id){
        chatStore.selectedUser.is_user_online = chat.is_user_online
      }
    }
  }
  // mew_message and new_chat_message are different events, but when mew_message comes, new_chat_message also comes
  else if(newData.type == WEBCOCKET_EVENTS.NEW_CHAT_MESSAGE && chat_id != newData?.content?.chat_id) {

    if(newData.content.chat_type == CHAT_TYPES.PRIVATE){
      const privateChat = chatStore.privateChatList.find(item=> item.chat_id == newData?.content.chat_id)
      if(privateChat){
        privateChat.last_message = newData?.content?.text
        const isTheSameLastMessageId = privateChat.last_message_id == newData?.content?.message_id
        privateChat.last_message_id = newData?.content?.message_id
        // to avoid showing unread message from sender
        if(newData?.content?.sender?.id != authStore?.currentUser?.id && !chatHandshakeChatIds.value.includes(newData?.content?.chat_id)){
          // play sound if sound is enabled
          if(!privateChat.on_mute){
            playNotificationSound()
          }
          // when user don't chat handshake with other user, that work, becouse new_message event doesn't work that case
          // adding unread count
          if(!privateChat.unread_count && !isTheSameLastMessageId){
            privateChat.unread_count = 1
          } else {
            privateChat.unread_count += 1
          }
        }
      } else {
        chatStore.privateChatList.unshift({
          first_name: newData?.content?.sender?.first_name,
          full_name: newData?.content?.sender?.full_name,
          chat_id: newData?.content?.chat_id,
          chat_uid: newData?.content?.uid,
          color: newData?.content?.sender?.color,
          is_user_online: true,
          last_message: newData?.content?.text,
          last_message_id: newData?.content?.message_id,
          type: newData?.content?.chat_type,
          unread_count: 1
        })
        // fist time user send message, play sound
        playNotificationSound()
      }
    }
    else if(newData.content.chat_type == CHAT_TYPES.GROUP){
      const groupChat = chatStore.groupChatList.find(item=> item.chat_id == newData?.content.chat_id)
      
      if(groupChat){
        groupChat.last_message = { sender: newData.content.sender, text: newData.content.text}
        groupChat.last_message_id = newData?.content?.message_id
        // to avoid showing unread message from sender
        if(newData?.content?.sender?.id != authStore?.currentUser?.id && !chatHandshakeChatIds.value.includes(newData?.content?.chat_id)){ // play sound if sound is enabled
          // play sound if sound is enabled
          if(!groupChat.on_mute){
            playNotificationSound()
          }
          // adding unread count
          if(!groupChat.unread_count){
            groupChat.unread_count = 1
          }
          else{
            groupChat.unread_count += 1
          }
        }
      }
    }
  }
});

onMounted(() => {
  sendUserHandshake()
})

// Clean up on component unmount
onBeforeUnmount(() => {
  Object.values(typingTimeouts).forEach(timeout => clearTimeout(timeout));
  chatHandshakeChatIds.value = []
});

</script>
<template>
  <div class="chat-home flex flex-col w-full py-6 px-10" style="height: calc(100vh - 80px)">
    <span class="text-2xl font-semibold">{{ t('chat-messenger') }}</span>

    <div class="flex justify-between h-full mt-5 rounded-2xl shadow-lg bg-white overflow-hidden">
      <left-sidebar />
      <template v-if="isShowChat">
        <chat-are-wrapper />
        <right-sidebar />
      </template>
      <template v-else>
        <div class="flex flex-col justify-center items-center w-full h-full bg-greyscale-50">
          <img src="@/assets/img/chat-default-1.png" alt="no chat" class="w-[142px]">
          <span class="block text-lg font-semibold mt-4 text-greyscale-900">{{ t('select-chat') }}</span>
          <span class="block text-sm font-semibold mt-2 text-greyscale-500">{{ t('select-chat-user') }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
</style>
