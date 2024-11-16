<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
import Empty from "@/components/Empty.vue";
import ReloadPrompt from '@/components/ReloadPrompt.vue'
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseAvatar from "@/components/UI/BaseAvatar.vue";
import { VerticalCard, VerticalCardItem } from "@/components/Card/Vertical";
</script>

<template>
  <RouterView />

  <Toast />

  <base-button label="adasdasdasd" />
  <base-button label="sss123123123" severity="success" />
  <base-avatar color="#ff2200" label="bbbb" />
  <base-button label="gggg" severity="info" />

  <notification />

  <reload-prompt />
</template>
