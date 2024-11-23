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

  <base-button label="111" />
  <base-button label="222" />
  <base-button label="333" />
  <base-button label="444" />

  <notification />

  <reload-prompt />
</template>
