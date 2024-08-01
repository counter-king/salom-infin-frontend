<script setup>
// Core
import { useRouter } from 'vue-router'
// Composable
const router = useRouter()
</script>

<template>
  <base-button
    size="small"
    icon-left="AltArrowLeftIcon"
    outlined
    shadow
    icon-width="16"
    border-color="border-transparent"
    button-class="h-8"
    @click="router.go(-1)"
  >
    <template #label>
      Назад
    </template>
  </base-button>
</template>
