<script setup>
// Core
import { computed, defineAsyncComponent } from 'vue'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
// Macros
const props = defineProps({
  icon: {
    type: [String, Object]
  },
  defineAsync: {
    type: Boolean
  }
})
// Computed
const defineIcon = computed(() => {
  if(props.defineAsync) {
    return defineAsyncComponent({
      loader: async () => {
        const icons = await import.meta.globEager('../Icons/attendance.store.js')
        return Object.values(icons)[0][props.icon]
      },
      loadingComponent: BaseSpinner,
      delay: 200
    })
  }

  return props.icon
})
</script>

<template>
  <component :is="defineIcon" class="w-5 h-5" />
</template>
