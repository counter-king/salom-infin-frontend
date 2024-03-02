<script setup>
// Macros
const props = defineProps({
  to: {
    type: Object,
    default: () => {}
  },
  isNotRead: {
    type: Boolean
  }
})
</script>

<template>
  <router-link
    :to="props.to"
    class="flex items-center w-full h-full text-sm font-medium"
    :class="props.isNotRead ? 'text-primary-900' : 'text-greyscale-500'"
  >
    <slot />
  </router-link>
</template>

<style scoped>

</style>
