<script setup>
// Core
import { ref, useModel, shallowRef, watch, defineAsyncComponent, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
// Stores
import { useDocFlowStore } from '../stores/docflow.store'
import { useRegIncoming } from '../stores/incoming.store'
// Components
import RegisterDocumentMenu from './RegisterDocumentMenu.vue'
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
// Utils
import { clearModel } from '@/utils'
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
const toast = useToast()
const docFlowStore = useDocFlowStore()
const regIncoming = useRegIncoming()
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
})
// Reactive
const documentTypeRef = ref(null)
const documentMenuType = ref('Incoming')
const documentTypeComponent = shallowRef(null)
const buttonLoading = ref(false)
// Watch
watch(documentMenuType, (value) => {
  documentTypeComponent.value = defineAsyncComponent({
    loader: () => import(`./Form/${value}.vue`),
    loadingComponent: BaseSpinner,
    delay: 200
  })
}, { immediate: true })
// Methods
const createDocument = async () => {
  const _documentTypeRef = unref(documentTypeRef)
  const valid = await _documentTypeRef.$v.$validate()

  if(!valid) return
  buttonLoading.value = true

  switch(documentMenuType.value) {
    case 'Incoming':
      await docFlowStore.actionCreateDocument(regIncoming.detailModel)
      break;
    case 'Inner':
      await docFlowStore.actionCreateDocument(Inner.detailModel)
      break;
    case 'Outgoing':
      await docFlowStore.actionCreateDocument(Outgoing.detailModel)
      break;
    case 'IncomingBranches':
      await docFlowStore.actionCreateDocument(IncomingBranches.detailModel)
      break;
    case 'Statement':
      await docFlowStore.actionCreateDocument(Statement.detailModel)
      break;
    default:
  }
  buttonLoading.value = false
}
const clearDocument = () => {
  switch(documentMenuType.value) {
    case 'Incoming':
      clearModel(regIncoming.detailModel, ['grif', 'journal'])
      break;
    case 'Inner':
      clearModel(Inner.detailModel, ['grif', 'journal'])
      break;
    case 'IncomingBranches':
      clearModel(IncomingBranches.detailModel, ['grif', 'journal'])
      break;
    case 'Statement':
      clearModel(Statement.detailModel, ['grif', 'journal'])
      break;
    default:
  }
}
</script>

<template>
  <base-dialog v-model="modelValue">
    <template #header>
      <register-document-menu @emit:up="(value) => documentMenuType = value" />
    </template>

    <template #content>
      <component :is="documentTypeComponent" ref="documentTypeRef" />
    </template>

    <template #footer>
      <base-button
        label="clear"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="clearDocument"
      />

      <base-button
        :loading="buttonLoading"
        label="create"
        rounded
        @click="createDocument"
      />
    </template>
  </base-dialog>
</template>

