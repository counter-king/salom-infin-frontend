// Core
import { onBeforeUnmount, onMounted, ref, unref, watch } from 'vue';
import { useRoute } from 'vue-router';
// socket
import { socket } from '@/services/socket';
// contants
import { WEBCOCKET_EVENTS } from '@/modules/Chat/constatns';
// stores
import { useChatStore } from '@/modules/Chat/stores';
import { useAuthStore } from '@/modules/Auth/stores';
// services
import { useDebounceFn } from '@vueuse/core';
// Utils
import { getStorageItem } from '@/utils/storage'
import { ACCESS, EXPIRES } from '@/constants/storage'

export const useUserOnlineStatus = () => {
// composibles
const chatStore = useChatStore()
const authStore = useAuthStore()
const route = useRoute()


const send = ref(null)
const data = ref(null)

const sendUserOnlineEvent = ()=> {
  if(!send.value) return
  const payload = { command: 'user_online' }
  send.value(JSON.stringify(payload))
}

const sendUserOfflineEvent = ()=> {
  if(!send.value) return
  const payload = { command: 'user_offline' }
  send.value(JSON.stringify(payload))
}

const sendUserHandshake = ()=> {
  if(!send.value) return
  const payload = { command: 'user_handshake' }
  send.value(JSON.stringify(payload))
}

watch(
  () => route.name,
  (newRoute) => {
    if (newRoute !== "ProfileIndex") {
      const { send: sendSocket, data: dataSocket, open, status } = socket()
      if(status.value == "CLOSED"){
        open()
        sendUserHandshake()
      }
      send.value = sendSocket
      data.value = dataSocket
    } else {
      socket().close()
      data.value = null
    }
  },
  { immediate: true }
);




const handleBrowerserTabChanges =()=>{
  // if tab is active, else inactive
  if(document.visibilityState == "visible"){
    sendUserOnlineEvent()
  } else{
    sendUserOfflineEvent()
  }
}


const getUnreadCount = useDebounceFn(()=> {
  chatStore.setCounts()
}, 1000)

// watching socket events using data(data is socket event)
watch(data, (newData) => {
    newData = unref(newData)   
    if(!newData) return
    newData = JSON.parse(newData);
    if(newData.type == WEBCOCKET_EVENTS.NEW_CHAT_MESSAGE){
      // if current user message sender, do not increment chat count
    if(newData.content.sender.id != authStore.currentUser?.id){
        getUnreadCount()
    }
  }
  if(newData.type == WEBCOCKET_EVENTS.MESSAGE_READ){
    // when current user, read mesage, decrement chat count
    if(newData.user.id == authStore.currentUser?.id){
        getUnreadCount()
    }
  }
  if(newData.type == WEBCOCKET_EVENTS.CHAT_DELETED || newData.type == WEBCOCKET_EVENTS.MESSAGE_DELETED){
    getUnreadCount()
  }
},{ deep: true, immediate: true})

onMounted(() => {
  sendUserOnlineEvent()
  sendUserHandshake()
  if(getStorageItem(ACCESS) && getStorageItem(EXPIRES) && new Date(getStorageItem(EXPIRES)) > new Date()) {
    chatStore.setCounts()
  }
  window.addEventListener("visibilitychange", handleBrowerserTabChanges)
})

onBeforeUnmount(() => {
  window.removeEventListener("visibilitychange", handleBrowerserTabChanges)
})

}