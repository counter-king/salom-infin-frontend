<script setup>
// Core
import {ref, onMounted, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
// Store
import { useCountStore } from '@/stores/count.store'
import { useDocFlowStore } from '../../../Registration/stores/docflow.store'
import { useBoxesCommonStore } from '../../stores/common.store'
import { useAssignmentStore } from '../../stores/assignment.store'
// Components
import {AcquaintButton, ActionAnswerMenu, CreateMenu} from '@/components/Actions'
import { LayoutWithTabs } from '@/components/DetailLayout'
import { ResolutionDropdown } from '@/components/Resolution'
import { ModalDoneDocument } from '@/components/Modal'
import { CheckCircleIcon } from "@/components/Icons"
// Enums
import {ROUTE_SD_CREATE} from "../../../SendDocuments/constants"
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES} from "../../../../../../enums"
// Utils
import { RESOLUTION_CREATE_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const countStore = useCountStore()
const docflowStore = useDocFlowStore()
const boxesCommonStore = useBoxesCommonStore()
const assignmentStore = useAssignmentStore()
// Reactive
const loading = ref(true)
// Computed
const createMenuVisible = computed(() => {
  return [COMPOSE_DOCUMENT_TYPES.NOTICE, COMPOSE_DOCUMENT_TYPES.APPLICATION].includes(String(assignmentStore.detailModel?.document?.document_type?.id)) && !assignmentStore.detailModel?.is_performed
})
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
  await countStore.actionCountList()
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
        :files="assignmentStore.detailModel.document.__files"
        :resolution="{
          ...boxesCommonStore.resolution,
          register_date: assignmentStore.detailModel.document.register_date,
          register_number: assignmentStore.detailModel.document.register_number
        }"
        self
        @emit:back-button="() => router.push({ name: 'AssignmentIndex' })"
      >
        <template #header-end>
          <!-- Если документ ознакомлен -->
          <template v-if="assignmentStore.isDocumentAcquainted">
            <action-answer-menu />
          </template>

          <!-- Если документ ознакомлен -->
          <template v-if="assignmentStore.isDocumentAcquainted">
            <resolution-dropdown
              :review-id="assignmentStore.detailModel.assignment.reviewer.id"
              :parent-id="assignmentStore.detailModel.assignment.id"
              :resolution-list-id="assignmentStore.detailModel.document.id"
              :resolution-create-type="RESOLUTION_CREATE_TYPES.ASSIGNMENT"
              :register-date="new Date(assignmentStore.detailModel.document.register_date)"
            />

<!--	          <base-button
		          v-if="createMenuVisible"
		          label="create-order"
		          :icon-left="CheckCircleIcon"
		          rounded
		          type="button"
		          @click="router.push({
			        name: ROUTE_SD_CREATE,
			        params: {
								document_type: COMPOSE_DOCUMENT_TYPES.ORDER,
								document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER
							},
							query: {
								compose_id: assignmentStore.detailModel?.document?.compose.id
							}
						})"
	          />-->

            <create-menu
              v-if="createMenuVisible"
              :compose-id="assignmentStore.detailModel?.document?.compose.id"
              :document="assignmentStore.detailModel?.document"
            />
          </template>
        </template>

        <template #preview-actions>
          <!-- Если документ ознакомлен -->
          <template v-if="assignmentStore.isDocumentAcquainted">
            <!-- Если еще не выполнен документ -->
            <template v-if="!assignmentStore.performModel.is_performed">
              <modal-done-document
                v-model:content="assignmentStore.performModel"
                v-model:files="assignmentStore.performModel.files"
                has-resolution
                is-document-signed
                :create-button-fn="doneDocument"
              />
            </template>

            <template v-else>
              <modal-done-document
                v-model:content="assignmentStore.performModel"
                v-model:files="assignmentStore.performModel.files"
                :is-done-document="assignmentStore.performModel.is_performed"
                has-resolution
                is-document-signed
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
