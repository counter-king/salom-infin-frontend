<script setup>
// Core
import { useRouter } from 'vue-router'
// Macros
const props = defineProps({
  self: {
    type: Boolean
  }
})
// Composable
const router = useRouter()
</script>

<template>
  <base-button
    size="small"
    icon-left="solar:alt-arrow-left-outline"
    outlined
    shadow
    icon-width="16"
    border-color="border-transparent"
    button-class="h-8"
    @click="props.self ? void 0 : router.go(-1)"
  >
    <template #label>
      Назад
    </template>
  </base-button>
</template>
