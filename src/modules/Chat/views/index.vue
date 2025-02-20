<script setup>
// core
import { useI18n } from "vue-i18n";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
// components
import { ChatAreWrapper, LeftSidebar, RightSidebar } from "@/modules/Chat/components";
// socket
import { socket } from "@/services/socket";
// contants
import { CHAT_ROUTE_NAMES, CHAT_TYPES, WEBCOCKET_EVENTS } from "../constatns";
// store
import { useChatStore } from "../stores";
// css
import 'vue3-emoji-picker/css'

const { t } = useI18n();
const route = useRoute();
const chatStore = useChatStore();
const allowedPages = ['ChatPrivateDetail','ChatGroupDetail']
const { status, data, send } = socket
// reactives
const isShowChat = computed(() => allowedPages.includes(route.name))
const routeId = computed(() => route.params.id)
// methods
const sendUserHandshake = ()=> {
  const payload = { command: 'user_handshake' }
  send(JSON.stringify(payload))
}

const sendChatHandshake = (id, chat_type)=> {
  const payload = { command: 'chat_handshake', chat_type, chat_id: id }
  send(JSON.stringify(payload))
}

// WebSocket holatini kuzatish
watch(status, (newStatus) => {
  if(newStatus == "OPEN"){
    initializeHandshake()
  }
});

// Kelgan ma'lumotlarni kuzatish
watch(data, (newData) => {
  
  newData = JSON.parse(newData);
  // console.log("ewasd",newData);
  
  if(newData.command == WEBCOCKET_EVENTS.USER_HANDSHAKE) {
    // console.log("user hand",newData);
  }
  else if(newData.command == WEBCOCKET_EVENTS.CHAT_HANDSHAKE) {
    // console.log("chat hand",newData);
  }
  else if(newData.type == WEBCOCKET_EVENTS.NEW_MESSAGE) {    
    if(newData.chat_type == CHAT_TYPES.PRIVATE){     
      chatStore.uploadingFiles = chatStore.uploadingFiles.filter(item=> item?.attachments?.file?.id != newData?.files[0]?.id) 
      chatStore.messageListByChatId.push({
        attachments: { file: newData.files[0] },
        chat_id: newData.chat_id,
        created_date: newData.created_date,
        edited: newData.edited,
        message_id: newData.message_id,
        modified_date: newData.modified_date,
        replied_to: newData.replied_to,
        sender: newData.sender,
        text: newData.text,
        message_type: newData.message_type,
        reactions: [],
        chat_type: newData.chat_type,
        uploaded: true,
      })
      // set last message to privatelist chat
      // chatStore.privateChatList.find(item=> item.chat_id == newData.chat_id).last_message = newData.text
    } else {
      chatStore.messageListByChatId.push({
        attachments: newData.attachments || [],
        chat_id: newData.chat_id,
        created_date: newData.created_date,
        edited: newData.edited,
        message_id: newData.id,
        modified_date: newData.modified_date,
        replied_to: newData.replied_to,
        sender: newData.sender,
        text: newData.text,
        message_type: newData.message_type,
        chat_type: newData.chat_type
      })
      // set last message to grouplist chat
      // chatStore.groupChatList.find(item=> item.chat_id == newData.chat_id).last_message = newData.text
    }
  }
  else if(newData.type == WEBCOCKET_EVENTS.MESSAGE_DELETED) {    
    chatStore.messageListByChatId = chatStore.messageListByChatId.filter(item=> item.message_id != newData?.content?.message_id)
    chatStore.contextMenu.deleteDialog = false
  }
  else if(newData.type == WEBCOCKET_EVENTS.MESSAGE_UPDATE) {
    chatStore.messageListByChatId.find(item=> item.message_id == newData?.content?.message_id).text = newData?.content?.text
    chatStore.messageListByChatId.find(item=> item.message_id == newData?.content?.message_id).message_id = newData?.content?.message_id
  }
  else if(newData.type == WEBCOCKET_EVENTS.NEW_GROUP_CHAT) {
    if(chatStore.groupChatList.some(item=> item.chat_id == newData?.content?.chat_id)){
      chatStore.groupChatList.unshift({
        chat_id: newData?.content?.chat_id,
        title: newData?.content?.title,
        image: newData?.content?.image,
        members: newData?.content?.members,
      })
    }
  }
  else if(newData.type == WEBCOCKET_EVENTS.MESSAGE_REACTION) {
    const message = chatStore.messageListByChatId.find(item=> item.message_id == newData?.message_id)
    if(newData?.action == "created") {
      if (!message.reactions[newData.emoji]) {
        message.reactions[newData.emoji] = [];
      }
      message.reactions[newData.emoji]?.push(newData?.user)
    }
    else if(newData?.action == "deleted"){
      message.reactions[newData.emoji] = message.reactions[newData?.emoji].filter(user=> user.id != newData?.user?.id)
      if(message.reactions[newData.emoji].length == 0) {
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
});

watch(routeId, (newRouteId) => {    
  if(route.name == CHAT_ROUTE_NAMES.PRIVATE) {
    sendChatHandshake(newRouteId, CHAT_TYPES.PRIVATE)
  }
  else if(route.name == CHAT_ROUTE_NAMES.GROUP) {
    sendChatHandshake(newRouteId, CHAT_TYPES.GROUP)
  }
})


function initializeHandshake(){
  sendUserHandshake()
    if(route.name == CHAT_ROUTE_NAMES.PRIVATE) {
      sendChatHandshake(route.params.id, CHAT_TYPES.PRIVATE)
    }
    else if(route.name == CHAT_ROUTE_NAMES.GROUP) {
      sendChatHandshake(route.params.id, CHAT_TYPES.GROUP)
    }
}
onMounted(() => {
  initializeHandshake()
})

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
