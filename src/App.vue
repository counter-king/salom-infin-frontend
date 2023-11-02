<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
</script>

<template>
  <RouterView />

  <Toast />

  <notification />
</template>
