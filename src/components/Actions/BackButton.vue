<script setup>
// Core
import { useRouter } from 'vue-router'
// Components
import AltArrowLeft from '~icons/solar/alt-arrow-left-outline'
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
    :icon-left="AltArrowLeft"
    outlined
    shadow
    icon-width="!w-4"
    border-color="border-transparent"
    button-class="h-8"
    @click="props.self ? void 0 : router.go(-1)"
  >
    <template #label>
      Назад
    </template>
  </base-button>
</template>
