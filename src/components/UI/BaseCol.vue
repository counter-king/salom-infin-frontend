<script setup>
// Macros
const props = defineProps({
  colClass: {
    type: String
  }
})
</script>

<template>
  <div class="p-2" :class="props.colClass">
    <slot />
  </div>
</template>
