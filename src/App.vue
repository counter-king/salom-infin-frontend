<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
import { onBeforeUnmount, onMounted, watch } from 'vue';
// socket
import { socket } from '@/services/socket';

const { send, data } = socket

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
  console.log("main",newData);
})

onMounted(() => {
  sendUserOnlineEvent()
  sendUserHandshake()
  window.addEventListener("visibilitychange", handleBrowerserTabChanges)
})

onBeforeUnmount(() => {
  window.removeEventListener("visibilitychange", handleBrowerserTabChanges)
})

</script>
<template>
  <RouterView />

  <Toast />

  <notification />

<!--  <reload-prompt />-->
</template>
