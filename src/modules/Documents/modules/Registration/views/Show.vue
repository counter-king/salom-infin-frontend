<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Store
import { useDocFlowStore } from '../stores/docflow.store'
import { useBoxesCommonStore } from '../../Boxes/stores/common.store'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import ChangeDocument from '../components/ChangeDocument.vue'
// Composable
const route = useRoute()
const router = useRouter()
const docflowStore = useDocFlowStore()
const boxesCommonStore = useBoxesCommonStore()
// Reactive
const loading = ref(true)
// Hooks
onMounted(async () => {
  loading.value = true
  await docflowStore.actionGetDocumentById({ id: route.params.id })
  await docflowStore.actionGetTree(docflowStore.detailModel.id)
  await docflowStore.actionSetActiveResolution()
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="incoming-show-view h-full">
    <template v-if="loading">
      <div class="min-h-[calc(100vh-300px)] flex items-center">
        <base-spinner />
      </div>
    </template>

    <template v-else>
      <layout-with-tabs
        :title="docflowStore.detailModel.title"
        :preview-detail="docflowStore.detailModel.__copy_prototype"
        :object-id="docflowStore.detailModel.id"
        :headers="docflowStore.headers"
        :tree-items="docflowStore.tree"
        :files="docflowStore.detailModel.__files"
        :resolution="{
          ...boxesCommonStore.resolution,
          register_date: docflowStore.detailModel.register_date,
          register_number: docflowStore.detailModel.register_number
        }"
        self
        @emit:back-button="() => router.push({ name: 'RegistrationIndex' })"
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
