<script setup>
// Core
import {ref, onMounted, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
// Store
import { useDocumentCountStore } from '../../../../stores/count.store'
import { useDocFlowStore } from '../../../Registration/stores/docflow.store'
import { useBoxesCommonStore } from '../../stores/common.store'
import { useReviewStore } from '../../stores/review.store'
// Components
import { ActionAnswerMenu, EriKeysMenu, AcquaintButton } from '@/components/Actions'
import { LayoutWithTabs } from '@/components/DetailLayout'
import { ResolutionDropdown } from '@/components/Resolution'
import { ModalForwardDocument, ModalDoneDocument, ModalCancelSign } from '@/components/Modal'
// Enums
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, STATUS_TYPES} from '@/enums'
import {CheckCircleIcon} from "@/components/Icons";
import {ROUTE_SD_CREATE} from "@/modules/Documents/modules/SendDocuments/constants";
// Composable
const route = useRoute()
const router = useRouter()
const countStore = useDocumentCountStore()
const docflowStore = useDocFlowStore()
const boxesCommonStore = useBoxesCommonStore()
const reviewStore = useReviewStore()
// Reactive
const loading = ref(true)
// Computed
const createOrderVisible = computed(() => {
  return [COMPOSE_DOCUMENT_TYPES.NOTICE, COMPOSE_DOCUMENT_TYPES.APPLICATION].includes(String(reviewStore.detailModel?.document?.document_type?.id))
})
// Hooks
onMounted(async () => {
  loading.value = true
  await reviewStore.actionReviewById({ id: route.params.id })
  await docflowStore.actionGetTree(reviewStore.detailModel.document.id)
  setTimeout(() => {
    loading.value = false
  }, 500)
})
// Methods
const signDocument = async () => {
  await reviewStore.actionSignOrCancel({
    is_verified: true,
    pkcs7: null
  })
  boxesCommonStore.actionRerenderComponent()
}
const cancelSign = async (text) => {
  await reviewStore.actionSignOrCancel({
    is_verified: false,
    pkcs7: null,
    comment: text
  })
  boxesCommonStore.actionRerenderComponent()
}
const acquaintDocument = async () => {
  await reviewStore.actionAcquaintDocument({ id: route.params.id })
  await countStore.actionDocumentCountList()
}
const handleDocumentStatus = async () => {
  // Изменить исполнение
  if(reviewStore.detailModel?.status.id === STATUS_TYPES.DONE) {
    console.log('change')
    await reviewStore.actionPerformDocument({ id: route.params.id, performed: false })
  }
  else { // Выполнить документ
    console.log('done')
    await reviewStore.actionPerformDocument({ id: route.params.id, performed: true })
  }
}
</script>

<template>
  <div class="review-show-view h-full">
    <template v-if="loading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs
        :title="reviewStore.detailModel.document?.title"
        :preview-detail="reviewStore.detailModel"
        :object-id="reviewStore.detailModel.document.id"
        :headers="reviewStore.headers"
        :tree-items="docflowStore.tree"
        :files="reviewStore.detailModel.document.__files"
        :resolution="{
          ...boxesCommonStore.resolution,
          register_date: reviewStore.detailModel.document.register_date,
          register_number: reviewStore.detailModel.document.register_number
        }"
        self
        @emit:back-button="() => router.push({ name: 'ReviewIndex' })"
      >
        <template #header-end>
          <!-- Create order button -->
          <base-button
            v-if="createOrderVisible"
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
								compose_id: reviewStore.detailModel?.document?.compose.id
							}
						})"
          />
          <!-- /Create order button -->

          <!-- Если документ ознакомлен -->
          <template v-if="reviewStore.isDocumentAcquainted">
            <action-answer-menu />
          </template>

          <!-- Если документ еще не ознакомлен -->
          <template v-if="!reviewStore.isDocumentAcquainted">
            <modal-forward-document />
          </template>

          <!-- Если документ ознакомлен -->
          <template v-if="reviewStore.isDocumentAcquainted">
            <resolution-dropdown
              :review-id="reviewStore.detailModel.id"
              :parent-id="null"
              :resolution-list-id="reviewStore.detailModel.document.id"
              :is-resolution-signed="reviewStore.isReviewSigned"
              :register-date="new Date(reviewStore.detailModel.document.register_date)"
            />

            <!-- Если есть созданные резолюция -->
            <template v-if="boxesCommonStore.getCreatedResolutionsList">
              <!-- Если резолюция не подписан -->
              <template v-if="!reviewStore.isReviewSigned">
                <eri-keys-menu @emit:sign="signDocument" />
              </template>

              <!-- Если резолюция подписан -->
              <template v-if="reviewStore.isReviewSigned">
                <modal-cancel-sign :create-button-fn="cancelSign" />
              </template>
            </template>
          </template>
        </template>

        <template #preview-actions>
          <!-- Если документ ознакомлен -->
          <template v-if="reviewStore.isDocumentAcquainted">
            <modal-done-document
              v-model:content="reviewStore.performModel"
              v-model:files="reviewStore.performModel.files"
              :has-resolution="boxesCommonStore.getCreatedResolutionsList"
              :is-document-signed="reviewStore.isReviewSigned"
              :is-done-document="reviewStore.detailModel.status.id === STATUS_TYPES.DONE"
              :create-button-fn="handleDocumentStatus"
            />
          </template>

          <template v-else>
            <acquaint-button :acquaint-fn="acquaintDocument" />
          </template>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
