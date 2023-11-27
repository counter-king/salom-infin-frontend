<script setup>
// Core
import { ref, useModel, shallowRef, watch, defineAsyncComponent, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
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
const router = useRouter()
const { t } = useI18n()
const docFlowStore = useDocFlowStore()
const incomingStore = useRegIncoming()
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
      let model = {
        ...incomingStore.detailModel,
        reviewers: incomingStore.detailModel.__reviewers.map(item => ({ user: item.id }))
      }
      await docFlowStore.actionCreateDocument(model)
      modelValue.value = false
      break;
    case 'Inner':
      await docFlowStore.actionCreateDocument(regInner.detailModel)
      modelValue.value = false
      break;
    case 'Outgoing':
      await docFlowStore.actionCreateDocument(regOutgoing.detailModel)
      modelValue.value = false
      break;
    case 'Appeal':
      await docFlowStore.actionCreateDocument(regAppeal.detailModel)
      modelValue.value = false
      break;
    case 'IncomingBranches':
      await docFlowStore.actionCreateDocument(regIncomingBranches.detailModel)
      modelValue.value = false
      break;
    case 'OrderInstruction':
      await docFlowStore.actionCreateDocument(regOrderInstruction.detailModel)
      modelValue.value = false
      break;
    case 'Statement':
      await docFlowStore.actionCreateDocument(regStatement.detailModel)
      modelValue.value = false
      break;
    default:
  }
  buttonLoading.value = false
  setTimeout(async () => {
    clearDocument()
    await redirectRoute()
  }, 500)
}
const clearDocument = () => {
  switch(documentMenuType.value) {
    case 'Incoming':
      clearModel(incomingStore.detailModel, ['grif', 'journal'])
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
const redirectRoute = async () => {
  switch(documentMenuType.value) {
    case 'Incoming':
      await router.replace({ name: 'RegistrationIncomingIndex' })
      break;
    case 'Inner':
      await router.replace({ name: 'RegistrationInnerIndex' })
      break;
    case 'Outgoing':
      await router.replace({ name: 'RegistrationOutgoingIndex' })
      break;
    case 'Appeal':
      await router.replace({ name: 'RegistrationAppealIndex' })
      break;
    // case 'IncomingBranches':
    //   await router.replace({ name: 'RegistrationOrderInstructionIndex' })
    //   break;
    case 'OrderInstruction':
      await router.replace({ name: 'RegistrationOrderInstructionIndex' })
      break;
    case 'Statement':
      await router.replace({ name: 'RegistrationStatementIndex' })
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

