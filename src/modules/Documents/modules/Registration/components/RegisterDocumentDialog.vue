<script setup>
// Core
import { ref, useModel, shallowRef, watch, defineAsyncComponent, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
const route = useRoute()
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
const documentTypeComponent = shallowRef(null)
const formModel = ref(null)
const buttonLoading = ref(false)
// Methods
const generateModel = () => {
  switch(docFlowStore.documentMenuType) {
    case 'Incoming':
      formModel.value = incomingStore.createFormModel
      break;
    case 'Inner':
      formModel.value = regInner.createFormModel
      break;
    case 'Outgoing':
      formModel.value = regOutgoing.createFormModel
      break;
    case 'Appeal':
      formModel.value = regAppeal.createFormModel
      break;
    case 'IncomingBranches':
      formModel.value = regIncomingBranches.createFormModel
      break;
    case 'OrderInstruction':
      formModel.value = regOrderInstruction.createFormModel
      break;
    case 'Statement':
      formModel.value = regStatement.createFormModel
      break;
    default:
  }
}
const createDocument = async () => {
  const _documentTypeRef = unref(documentTypeRef)
  const valid = await _documentTypeRef.$v.$validate()

  if(!valid) return
  buttonLoading.value = true

  switch(docFlowStore.documentMenuType) {
    case 'Incoming':
      let model = {
        ...incomingStore.createFormModel,
        reviewers: incomingStore.createFormModel.__reviewers.map(item => ({ user: item.id }))
      }
      await docFlowStore.actionCreateDocument(model)
      modelValue.value = false
      break;
    case 'Inner':
      let innerModel = {
        ...regInner.createFormModel,
        reviewers: regInner.createFormModel.__reviewers.map(item => ({ user: item.id }))
      }
      await docFlowStore.actionCreateDocument(innerModel)
      modelValue.value = false
      break;
    case 'Outgoing':
      await docFlowStore.actionCreateDocument(regOutgoing.createFormModel)
      modelValue.value = false
      break;
    case 'Appeal':
      let appealModel = {
        ...regAppeal.createFormModel,
        reviewers: regAppeal.createFormModel.__reviewers.map(item => ({ user: item.id }))
      }
      await docFlowStore.actionCreateDocument(appealModel)
      modelValue.value = false
      break;
    case 'IncomingBranches':
      await docFlowStore.actionCreateDocument(regIncomingBranches.createFormModel)
      modelValue.value = false
      break;
    case 'OrderInstruction':
      let orderInstructionModel = {
        ...regOrderInstruction.createFormModel,
        reviewers: regOrderInstruction.createFormModel.__reviewers.map(item => ({ user: item.id }))
      }
      await docFlowStore.actionCreateDocument(orderInstructionModel)
      modelValue.value = false
      break;
    case 'Statement':
      let statementModel = {
        ...regStatement.createFormModel,
        reviewers: regStatement.createFormModel.__reviewers.map(item => ({ user: item.id }))
      }
      await docFlowStore.actionCreateDocument(statementModel)
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
  switch(docFlowStore.documentMenuType) {
    case 'Incoming':
      clearModel(incomingStore.createFormModel, ['grif', 'journal'])
      break;
    case 'Inner':
      clearModel(regInner.createFormModel, ['grif', 'journal'])
      break;
    case 'Outgoing':
      clearModel(regOutgoing.createFormModel, ['grif', 'journal'])
      break;
    case 'Appeal':
      clearModel(regAppeal.createFormModel, ['grif', 'journal'])
      break;
    case 'IncomingBranches':
      clearModel(regIncomingBranches.createFormModel, ['grif', 'journal'])
      break;
    case 'OrderInstruction':
      clearModel(regOrderInstruction.createFormModel, ['grif', 'journal'])
      break;
    case 'Statement':
      clearModel(regStatement.createFormModel, ['grif', 'journal'])
      break;
    default:
  }
}
const redirectRoute = async () => {
  switch(docFlowStore.documentMenuType) {
    case 'Incoming':
      if(route.name === 'RegistrationIncomingIndex') {
        await incomingStore.actionGetList()
      }
      else {
        await router.replace({ name: 'RegistrationIncomingIndex' })
      }
      break;
    case 'Inner':
      if(route.name === 'RegistrationInnerIndex') {
        await regInner.actionGetList()
      }
      else {
        await router.replace({ name: 'RegistrationInnerIndex' })
      }
      break;
    case 'Outgoing':
      if(route.name === 'RegistrationOutgoingIndex') {
        await regOutgoing.actionGetList()
      }
      else {
        await router.replace({ name: 'RegistrationOutgoingIndex' })
      }
      break;
    case 'Appeal':
      if(route.name === 'RegistrationAppealIndex') {
        await regAppeal.actionGetList()
      }
      else {
        await router.replace({ name: 'RegistrationAppealIndex' })
      }
      break;
    // case 'IncomingBranches':
    //   await router.replace({ name: 'RegistrationOrderInstructionIndex' })
    //   break;
    case 'OrderInstruction':
      if(route.name === 'RegistrationOrderInstructionIndex') {
        await regOrderInstruction.actionGetList()
      }
      else {
        await router.replace({ name: 'RegistrationOrderInstructionIndex' })
      }
      break;
    case 'Statement':
      if(route.name === 'RegistrationStatementIndex') {
        await regStatement.actionGetList()
      }
      else {
        await router.replace({ name: 'RegistrationStatementIndex' })
      }
      break;
    default:
  }
}
const afterHide = () => {
  docFlowStore.actionLoadFormCreateDocument('Incoming')
}
// Watch
watch(() => docFlowStore.documentMenuType, (value) => {
  documentTypeComponent.value = defineAsyncComponent({
    loader: () => import(`./Form/${value}.vue`),
    loadingComponent: BaseSpinner,
    delay: 200
  })
  generateModel()
}, { immediate: true })
</script>

<template>
  <base-dialog
    v-model="modelValue"
    @emit:after-hide="afterHide"
  >
    <template #header>
      <register-document-menu @emit:up="(value) => docFlowStore.actionLoadFormCreateDocument(value)" />
    </template>

    <template #content>
      <component
        ref="documentTypeRef"
        :is="documentTypeComponent"
        :form-model="formModel"
      />
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

