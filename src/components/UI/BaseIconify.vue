<script setup>
// Core
import { Icon } from '@iconify/vue'
// Macros
const props = defineProps({
  icon: {
    type: String,
    default: 'solar:home-2-outline'
  }
})
</script>

<template>
  <Icon :icon="props.icon" class="w-6 h-6" />
</template>
