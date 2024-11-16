<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
import ReloadPrompt from '@/components/ReloadPrompt.vue'
import BaseButton from "@/components/UI/BaseButton.vue";
</script>

<template>
  <RouterView />

  <Toast />

  <base-button label="Test button" />

  <notification />

  <reload-prompt />
</template>
