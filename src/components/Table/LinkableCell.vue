<script setup>
// Macros
const { to } = defineProps({
  to: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <router-link
    :to="to"
    class="flex items-center w-full h-full text-sm font-medium text-greyscale-500"
  >
    <slot />
  </router-link>
</template>

<style scoped>

</style>
