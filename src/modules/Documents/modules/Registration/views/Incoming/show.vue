<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useRegIncoming } from '../../stores/incoming.store'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
// Utils
import { combineKeys } from '@/utils'
// Composable
const route = useRoute()
const incomingStore = useRegIncoming()
// Reactive
const loading = ref(true)
const previewDetail = ref([])
// Hooks
onMounted(async () => {
  loading.value = true
  await incomingStore.actionGetById({ id: route.params.id })
  previewDetail.value = combineKeys(incomingStore.headers, incomingStore.detailModel)
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="incoming-show-view h-full">
    <template v-if="loading">
      <base-spinner />
    </template>

    <template v-else>
      <pre>{{ previewDetail }}</pre>
<!--      <layout-with-tabs />-->
    </template>
  </div>
</template>

<style scoped>

</style>
