<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
import ReloadPrompt from '@/components/ReloadPrompt.vue'
</script>

<template>
  <RouterView />

  <Toast />

  <base-button label="asdasdad" />
  <base-button label="22222222" />

  <notification />

  <reload-prompt />
</template>
