<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useRegOutgoing } from '../../stores/outgoing.store'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import ChangeDocument from "./components/ChangeDocument.vue"
// Composable
const route = useRoute()
const outgoingStore = useRegOutgoing()
// Reactive
const loading = ref(true)
const previewDetail = ref([])
// Hooks
onMounted(async () => {
  loading.value = true
  await outgoingStore.actionGetById({ id: route.params.id })
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
        :title="outgoingStore.detailModel.register_number"
        :preview-detail="outgoingStore.detailModel.__copy_prototype"
        :object-id="outgoingStore.detailModel.id"
        :headers="outgoingStore.headers"
      >
        <template #preview-actions>
          <div class="mt-5">
            <change-document />
          </div>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>

<style scoped>

</style>
