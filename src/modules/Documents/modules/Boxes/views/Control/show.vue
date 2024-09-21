<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Store
import { useDocumentCountStore } from '../../../../stores/count.store'
import { useDocFlowStore } from '../../../Registration/stores/docflow.store'
import { useBoxesCommonStore } from '../../stores/common.store'
import { useControlStore } from '../../stores/control.store'
// Components
import { AcquaintButton, ActionAnswerMenu } from '@/components/Actions'
import { LayoutWithTabs } from '@/components/DetailLayout'
import { ModalRemoveFromControl } from '@/components/Modal'
// Utils
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
// Composable
const route = useRoute()
const router = useRouter()
const countStore = useDocumentCountStore()
const docflowStore = useDocFlowStore()
const boxesCommonStore = useBoxesCommonStore()
const controlStore = useControlStore()
// Reactive
const loading = ref(true)
// Hooks
onMounted(async () => {
  loading.value = true
  await controlStore.actionControlById({ id: route.params.id })
  await docflowStore.actionGetTree(controlStore.detailModel.document.id)
  setTimeout(() => {
    loading.value = false
  }, 500)
})
// Methods
const acquaintDocument = async () => {
  await controlStore.actionAcquaintDocument({ id: +route.params.id })
  boxesCommonStore.actionRerenderComponent()
  await countStore.actionDocumentCountList()
}
const doneDocument = async () => {
  await controlStore.actionRemoveFromControl({ id: +route.params.id, type: FORM_TYPE_CREATE })
  boxesCommonStore.actionRerenderComponent()
}
const updateDocument = async () => {
  await controlStore.actionRemoveFromControl({ id: +route.params.id, type: FORM_TYPE_UPDATE })
  boxesCommonStore.actionRerenderComponent()
}

</script>

<template>
  <div class="control-show-view h-full">
    <template v-if="loading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs
        :title="controlStore.detailModel.document?.title"
        :preview-detail="controlStore.detailModel"
        :object-id="controlStore.detailModel.document.id"
        :headers="controlStore.headers"
        :tree-items="docflowStore.tree"
        :files="controlStore.detailModel.document.__files"
        :resolution="{
          ...boxesCommonStore.resolution,
          register_date: controlStore.detailModel.document.register_date,
          register_number: controlStore.detailModel.document.register_number
        }"
        self
        @emit:back-button="() => router.push({ name: 'ControlIndex' })"
      >
        <template #preview-actions>
          <!-- Если документ ознакомлен -->
          <template v-if="controlStore.isDocumentAcquainted">
            <!-- Если еще не выполнен документ -->
            <template v-if="!controlStore.performModel.is_performed">
              <modal-remove-from-control
                v-model:content="controlStore.performModel.content"
                v-model:files="controlStore.performModel.files"
                :create-button-fn="doneDocument"
              />
            </template>

            <template v-else>
              <modal-remove-from-control
                v-model:content="controlStore.performModel.content"
                v-model:files="controlStore.performModel.files"
                :is-control-removed="controlStore.performModel.is_performed"
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
