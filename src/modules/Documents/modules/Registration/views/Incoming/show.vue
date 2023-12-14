<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useDocFlowStore } from '../../stores/docflow.store'
import { useRegIncoming } from '../../stores/incoming.store'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import ChangeDocument from './components/ChangeDocument.vue'
// Composable
const route = useRoute()
const docflowStore = useDocFlowStore()
const incomingStore = useRegIncoming()
// Reactive
const loading = ref(true)
// Hooks
onMounted(async () => {
  loading.value = true
  await incomingStore.actionGetById({ id: route.params.id })
  await docflowStore.actionGetTree(incomingStore.detailModel.id)
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
      <layout-with-tabs
        :title="incomingStore.detailModel.title"
        :preview-detail="incomingStore.detailModel.__copy_prototype"
        :object-id="incomingStore.detailModel.id"
        :headers="incomingStore.headers"
      >
        <template #preview-actions>
          <change-document />
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>

<style scoped>

</style>
