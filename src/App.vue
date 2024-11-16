<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
import Empty from "@/components/Empty.vue";
import ReloadPrompt from '@/components/ReloadPrompt.vue'
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseAvatar from "@/components/UI/BaseAvatar.vue";
</script>

<template>
  <RouterView />

  <Toast />

  <Empty />

  <notification />

  <reload-prompt />
</template>
