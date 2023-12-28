<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useDocFlowStore } from '../../../Registration/stores/docflow.store'
import { useBoxesCommonStore } from '../../stores/common.store'
import { useAssignmentStore } from '../../stores/assignment.store'
// Components
import { AcquaintButton, ActionAnswerMenu } from '@/components/Actions'
import { LayoutWithTabs } from '@/components/DetailLayout'
import { ResolutionDropdown } from '@/components/Resolution'
import { ModalDoneDocument } from '@/components/Modal'
// Utils
import { RESOLUTION_CREATE_TYPES } from '@/enums'
// Composable
const route = useRoute()
const docflowStore = useDocFlowStore()
const boxesCommonStore = useBoxesCommonStore()
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
// Methods
const acquaintDocument = async () => {
  await assignmentStore.actionAcquaintDocument({ id: +route.params.id })
  boxesCommonStore.actionRerenderComponent()
}
const doneDocument = async () => {
  await assignmentStore.actionPerformDocument({ id: +route.params.id, performed: true })
  boxesCommonStore.actionRerenderComponent()
}
const updateDocument = async () => {
  await assignmentStore.actionPerformDocument({ id: +route.params.id, performed: false })
  boxesCommonStore.actionRerenderComponent()
}
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
        :tree-items="docflowStore.tree"
        :resolution="{
          ...boxesCommonStore.resolution,
          register_date: assignmentStore.detailModel.document.register_date,
          register_number: assignmentStore.detailModel.document.register_number
        }"
      >
        <template #header-end>
          <action-answer-menu />

          <!-- Если документ ознакомлен -->
          <template v-if="assignmentStore.isDocumentAcquainted">
            <resolution-dropdown
              :review-id="assignmentStore.detailModel.assignment.reviewer.id"
              :parent-id="assignmentStore.detailModel.assignment.id"
              :resolution-list-id="assignmentStore.detailModel.document.id"
              :resolution-create-type="RESOLUTION_CREATE_TYPES.ASSIGNMENT"
            />
          </template>
        </template>

        <template #preview-actions>
          <!-- Если документ ознакомлен -->
          <template v-if="assignmentStore.isDocumentAcquainted">
            <!-- Если еще не выполнен документ -->
            <template v-if="!assignmentStore.performModel.is_performed">
              <modal-done-document
                v-model:content="assignmentStore.performModel.content"
                v-model:files="assignmentStore.performModel.files"
                :create-button-fn="doneDocument"
              />
            </template>

            <template v-else>
              <modal-done-document
                v-model:content="assignmentStore.performModel.content"
                v-model:files="assignmentStore.performModel.files"
                :is-done-document="assignmentStore.performModel.is_performed"
                :create-button-fn="updateDocument"
              />
            </template>
          </template>

          <template v-else>
            <acquaint-button :acquaint-fn="acquaintDocument" />
          </template>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
