// Core
import { onBeforeUnmount, onMounted, watch } from 'vue';
// socket
import { socket } from '@/services/socket';
// contants
import { WEBCOCKET_EVENTS } from '@/modules/Chat/constatns';
// stores
import { useChatStore } from '@/modules/Chat/stores';
import { useAuthStore } from '@/modules/Auth/stores';
// services
import { useDebounceFn } from '@vueuse/core';
// utils
import { getStorageItem } from '@/utils/storage';
// constants
import { ACCESS, EXPIRES } from '@/constants/storage';
import { useThemeStore } from '@/stores/theme.store';

export const useUserOnlineStatus = () => {

const { send, data } = socket()
// composibles
const chatStore = useChatStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const sendUserOnlineEvent = ()=> {
  const payload = { command: 'user_online' }
  send(JSON.stringify(payload))
}

const sendUserOfflineEvent = ()=> {
  const payload = { command: 'user_offline' }
  send(JSON.stringify(payload))
}

const sendUserHandshake = ()=> {
  const payload = { command: 'user_handshake' }
  send(JSON.stringify(payload))
}

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
}, 4000)

// watching socket events using data(data is socket event)
watch(data, (newData) => {
  newData = JSON.parse(newData);
  // console.log(newData)
  if(newData.type == WEBCOCKET_EVENTS.NEW_CHAT_MESSAGE && themeStore?.header?.find(item => item?.name == 'chat').count > 0){
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
})

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
