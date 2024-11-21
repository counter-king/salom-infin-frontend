<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
// import ReloadPrompt from '@/components/ReloadPrompt.vue'

</script>

<template>
  <RouterView />

  <Toast />

  <notification />

<!--  <reload-prompt />-->
</template>
