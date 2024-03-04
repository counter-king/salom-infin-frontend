<script setup>
// Core
import { ref, onMounted } from 'vue'
// Components
import DocFlowCard from './Card.vue'
// Services
import axiosConfig from '@/services/axios.config'
// Macros
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
// Reactive
const loading = ref(true)
// Methods
const getList = async () => {
  loading.value = true

  try {
    let { data } = await axiosConfig.get(`dashboard/in-progress-counts/`)

    props.list.forEach(item => item.count = data[item.key])
  }
  finally {
    loading.value = false
  }
}
// Hooks
onMounted(async () => {
  await getList()
})
</script>

<template>
  <template v-if="loading">
    <base-spinner absolute />
  </template>

  <template v-else>
    <doc-flow-card :list="props.list" />
  </template>
</template>

<style scoped>

</style>
