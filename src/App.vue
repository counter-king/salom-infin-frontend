<script setup>
// Core
import Toast from 'primevue/toast'
// Components
import Notification from '@/components/Notification.vue'
import ReloadPrompt from '@/components/ReloadPrompt.vue'
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseAvatar from "@/components/UI/BaseAvatar.vue";
</script>

<template>
  <RouterView />

  <Toast />

  <base-avatar color="#ff2200" label="bbbbb" avatar-classes="w-9 h-9" />
  <base-button label="Test button test 111" />
  <base-button label="Test button test 222" />
  <base-avatar color="#ff2200" label="cccc" avatar-classes="w-9 h-9" />

  <notification />

  <reload-prompt />
</template>
