<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
import ReloadPrompt from '@/components/ReloadPrompt.vue'
import Empty from "@/components/Empty.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseAvatar from "@/components/UI/BaseAvatar.vue";
import { VerticalCard, VerticalCardItem } from "@/components/Card/Vertical";
</script>

<template>
  <RouterView />

  <base-input placeholder="asdasd" />

  <Toast />

  <notification />

  <reload-prompt />
</template>
