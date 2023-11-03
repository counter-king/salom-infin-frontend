<script setup>
// Core
import { ref, useModel, shallowRef, watch, defineAsyncComponent, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
// Stores
import { useDocFlowStore } from '../stores/docflow.store'
import { useRegIncoming } from '../stores/incoming.store'
import { useRegInner } from '../stores/inner.store'
import { useRegOutgoing } from '../stores/outgoing.store'
import { useRegAppeal } from '../stores/appeal.store'
import { useRegIncomingBranches } from '../stores/incomingBranches.store'
import { useRegOrderInstruction } from '../stores/orderInstruction.store'
import { useRegStatement } from '../stores/statement.store'
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
const regInner = useRegInner()
const regOutgoing = useRegOutgoing()
const regAppeal = useRegAppeal()
const regIncomingBranches = useRegIncomingBranches()
const regOrderInstruction = useRegOrderInstruction()
const regStatement = useRegStatement()
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
      await docFlowStore.actionCreateDocument(regInner.detailModel)
      break;
    case 'Outgoing':
      await docFlowStore.actionCreateDocument(regOutgoing.detailModel)
      break;
    case 'Appeal':
      await docFlowStore.actionCreateDocument(regAppeal.detailModel)
      break;
    case 'IncomingBranches':
      await docFlowStore.actionCreateDocument(regIncomingBranches.detailModel)
      break;
    case 'OrderInstruction':
      await docFlowStore.actionCreateDocument(regOrderInstruction.detailModel)
      break;
    case 'Statement':
      await docFlowStore.actionCreateDocument(regStatement.detailModel)
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
      clearModel(regInner.detailModel, ['grif', 'journal'])
      break;
    case 'Outgoing':
      clearModel(regOutgoing.detailModel, ['grif', 'journal'])
      break;
    case 'Appeal':
      clearModel(regAppeal.detailModel, ['grif', 'journal'])
      break;
    case 'IncomingBranches':
      clearModel(regIncomingBranches.detailModel, ['grif', 'journal'])
      break;
    case 'OrderInstruction':
      clearModel(regOrderInstruction.detailModel, ['grif', 'journal'])
      break;
    case 'Statement':
      clearModel(regStatement.detailModel, ['grif', 'journal'])
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

