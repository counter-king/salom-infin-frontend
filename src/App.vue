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
  <base-avatar label="ABC" color="#ff2200" />
  <base-avatar label="222" color="#dd3344" />

  <notification />

  <reload-prompt />
</template>
