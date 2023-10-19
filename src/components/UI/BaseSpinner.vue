<script setup>
// Core
import { computed } from "vue"
import ProgressSpinner from "primevue/progressspinner"
// Macros
const props = defineProps({
  content: {
    type: Boolean,
    default: false
  },
  screen: {
    type: Boolean,
    default: false
  },
})
// Computed
const classes = computed(() => {
  return {
    'w-full h-full flex items-center justify-center': props.content,
    'fixed top-0 bg-white w-full h-full flex items-center justify-center': props.screen
  }
})
</script>

<template>
  <div class="app-spinner" :class="classes">
    <ProgressSpinner
      :pt="{
        root: {
          class: ['w-[40px] h-[40px]']
        },
        spinner: '',
        circle: 'stroke-[4px]'
      }"
    />
  </div>
</template>

<style scoped>

</style>
