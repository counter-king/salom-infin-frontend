<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useDocFlowStore } from '../../../Registration/stores/docflow.store'
import { useBoxesCommonStore } from '../../stores/common.store'
import { useReviewStore } from '../../stores/review.store'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import { ResolutionDropdown } from '@/components/Resolution'
// Composable
const route = useRoute()
const docflowStore = useDocFlowStore()
const boxesCommonStore = useBoxesCommonStore()
const reviewStore = useReviewStore()
// Reactive
const loading = ref(true)
// Hooks
onMounted(async () => {
  loading.value = true
  await reviewStore.actionReviewById({ id: route.params.id })
  await docflowStore.actionGetTree(reviewStore.detailModel.id)
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="review-show-vuew h-full">
    <template v-if="loading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs
        :title="reviewStore.detailModel.document?.title"
        :preview-detail="reviewStore.detailModel"
        :object-id="reviewStore.detailModel.id"
        :headers="reviewStore.headers"
      >
        <template #header-end>
          <resolution-dropdown
            :review-id="reviewStore.detailModel.id"
            :parent-id="null"
            :resolution-list-id="reviewStore.detailModel.document.id"
          />
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
