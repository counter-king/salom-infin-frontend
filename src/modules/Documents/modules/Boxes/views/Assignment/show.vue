<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useDocFlowStore } from '../../../Registration/stores/docflow.store'
import { useAssignmentStore } from '../../stores/assignment.store'
// Components
import { ActionAnswerMenu } from '@/components/Actions'
import { LayoutWithTabs } from '@/components/DetailLayout'
import { ResolutionDropdown } from '@/components/Resolution'
import { ModalDoneDocument } from '@/components/Modal'
// Composable
const route = useRoute()
const docflowStore = useDocFlowStore()
const assignmentStore = useAssignmentStore()
// Reactive
const loading = ref(true)
// Hooks
onMounted(async () => {
  loading.value = true
  await assignmentStore.actionAssignmentById({ id: route.params.id })
  await docflowStore.actionGetTree(assignmentStore.detailModel.document.id)
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
        :title="assignmentStore.detailModel.document?.title"
        :preview-detail="assignmentStore.detailModel"
        :object-id="assignmentStore.detailModel.document.id"
        :headers="assignmentStore.headers"
      >
        <template #header-end>
          <action-answer-menu />

          <resolution-dropdown
            :review-id="assignmentStore.detailModel.id"
            :parent-id="null"
            :resolution-list-id="assignmentStore.detailModel.document.id"
          />
        </template>

        <template #preview-actions>
          <div class="mt-5">
            <modal-done-document />
          </div>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
