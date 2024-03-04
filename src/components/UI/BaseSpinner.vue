<script setup>
// Core
import { computed } from "vue"
import ProgressSpinner from "primevue/progressspinner"
// Macros
const props = defineProps({
  rootClasses: {
    type: String
  },
  absolute: {
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
  return [
    'flex items-center justify-center w-full h-full',
    {
      'absolute': props.absolute
    },
    {
      'fixed top-0 bg-white': props.screen
    }
  ]
})
</script>

<template>
  <div class="app-spinner" :class="classes">
    <ProgressSpinner
      :pt="{
        root: {
          class: ['w-[40px] h-[40px]', props.rootClasses]
        },
        spinner: '',
        circle: 'stroke-[4px]'
      }"
    />
  </div>
</template>

<style scoped>

</style>
