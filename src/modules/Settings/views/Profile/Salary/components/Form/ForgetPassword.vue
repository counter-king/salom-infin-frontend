<script setup>
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Composable
const authStore = useAuthStore()
</script>

<template>
  <form class="forget-password-view space-y-6 mb-16">
    <base-input
      :model-value="authStore.currentUser.phone"
      label="Телефон номер"
      mask-rule="+998 ## ### ## ##"
      disabled
    />
  </form>
</template>
