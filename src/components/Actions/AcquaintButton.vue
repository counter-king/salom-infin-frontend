<script setup>
// Core
import { ref } from 'vue'
// Macros
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  acquaintFn: {
    type: Function,
    default: () => void 0
  }
})
// Reactive
const loading = ref(false)
// Methods
const acquaintDocument = async () => {
  try {
    loading.value = true
    await props.acquaintFn()
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <base-button
    label="acquaint-document"
    :loading="loading"
    rounded
    @click="acquaintDocument"
  >
  </base-button>
</template>

<style scoped>

</style>
