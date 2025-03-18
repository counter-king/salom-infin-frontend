 // Core
 import { onBeforeUnmount, onMounted, watch } from 'vue';
 // socket
 import { socket } from '@/services/socket';
 // contants
 import { WEBCOCKET_EVENTS } from '@/modules/Chat/constatns';
 // stores
 import { useChatStore } from '@/modules/Chat/stores';

 
export const useUserOnlineStatus = () => {
const { send, data } = socket
const chatStore = useChatStore()

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

watch(data, (newData) => {
  newData = JSON.parse(newData);
//   if(newData.type == WEBCOCKET_EVENTS.NEW_CHAT_MESSAGE){
//     chatStore.setCounts()
//   }
})

onMounted(() => {
  sendUserOnlineEvent()
  sendUserHandshake()
  window.addEventListener("visibilitychange", handleBrowerserTabChanges)
})

onBeforeUnmount(() => {
  window.removeEventListener("visibilitychange", handleBrowerserTabChanges)
})

}