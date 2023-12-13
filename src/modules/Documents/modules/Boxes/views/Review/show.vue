<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useDocFlowStore } from '../../../Registration/stores/docflow.store'
import { useBoxesCommonStore } from '../../stores/common.store'
import { useReviewStore } from '../../stores/review.store'
// Components
import { ActionAnswerMenu, EriKeysMenu, AcquaintButton } from '@/components/Actions'
import { LayoutWithTabs } from '@/components/DetailLayout'
import { ResolutionDropdown } from '@/components/Resolution'
import { ModalForwardDocument, ModalDoneDocument, ModalCancelSign } from '@/components/Modal'
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
}
const cancelSign = async (text) => {
  await reviewStore.actionSignOrCancel({
    is_verified: false,
    pkcs7: null,
    comment: text
  })
}
const acquaintDocument = async () => {
  await reviewStore.actionAcquaintDocument({ id: route.params.id })
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
        :resolution="{
          ...boxesCommonStore.resolution,
          register_date: reviewStore.detailModel.document.register_date,
          register_number: reviewStore.detailModel.document.register_number
        }"
      >
        <template #header-end>
          <action-answer-menu />

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
            <modal-done-document />
          </template>

          <template v-else>
            <acquaint-button :acquaint-fn="acquaintDocument" />
          </template>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
