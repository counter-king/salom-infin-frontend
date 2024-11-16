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

  <vertical-card-item title="asdasd" description="bbbb">
  </vertical-card-item>

  <vertical-card>
    <template #default>
      asdasdas
    </template>
  </vertical-card>

  <notification />

  <reload-prompt />
</template>
