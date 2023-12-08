<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useRegInner } from '../../stores/inner.store'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import ChangeDocument from "./components/ChangeDocument.vue"
// Composable
const route = useRoute()
const innerStore = useRegInner()
// Reactive
const loading = ref(true)
const previewDetail = ref([])
// Hooks
onMounted(async () => {
  loading.value = true
  await innerStore.actionGetById({ id: route.params.id })
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
        :title="innerStore.detailModel.title"
        :preview-detail="innerStore.detailModel.__copy_prototype"
        :object-id="innerStore.detailModel.id"
        :headers="innerStore.headers"
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
