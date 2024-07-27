<script setup>
// Core
import { ref, useModel, shallowRef, watch, defineAsyncComponent, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Stores
import { useDocFlowStore } from '../stores/docflow.store'
import { useAuthStore } from '@/modules/Auth/stores'
// Components
import RegisterDocumentMenu from './RegisterDocumentMenu.vue'
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
// Utils
import { clearModel } from '@/utils'
// Enums
import { JOURNAL_CODES } from '@/enums'
// Composable
const modelValue = useModel(props, 'modelValue')
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const docFlowStore = useDocFlowStore()
const authStore = useAuthStore()
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
const createDocument = async () => {
  let model = null
  const _documentTypeRef = unref(documentTypeRef)
  const valid = await _documentTypeRef.$v.$validate()

  if(!valid) return
  buttonLoading.value = true

  switch(docFlowStore.documentMenuType.name) {
    case 'Incoming':
      model = {
        ...docFlowStore.createDocumentModel,
        journal: docFlowStore.documentMenuType.__journalId,
        reviewers: docFlowStore.createDocumentModel.__reviewers.map(item => ({ user: item.id })),
        files: docFlowStore.createDocumentModel.__files.length
          ? docFlowStore.createDocumentModel.__files.map(file => ({ file: file.id }))
          : []
      }
      break;
    case 'Inner':
      model = {
        ...docFlowStore.createDocumentModel,
        journal: docFlowStore.documentMenuType.__journalId,
        reviewers: docFlowStore.createDocumentModel.__reviewers.map(item => ({ user: item.id })),
        files: docFlowStore.createDocumentModel.__files.length
          ? docFlowStore.createDocumentModel.__files.map(file => ({ file: file.id }))
          : []
      }
      break;
    case 'Outgoing':
      model = {
        ...docFlowStore.createDocumentModel,
        journal: docFlowStore.documentMenuType.__journalId,
        reviewers: docFlowStore.createDocumentModel.__reviewers.map(item => ({ user: item.id })),
        files: docFlowStore.createDocumentModel.__files.length
          ? docFlowStore.createDocumentModel.__files.map(file => ({ file: file.id }))
          : []
      }
      break;
    case 'Appeal':
      model = {
        ...docFlowStore.createDocumentModel,
        journal: docFlowStore.documentMenuType.__journalId,
        reviewers: docFlowStore.createDocumentModel.__reviewers.map(item => ({ user: item.id })),
        files: docFlowStore.createDocumentModel.__files.length
          ? docFlowStore.createDocumentModel.__files.map(file => ({ file: file.id }))
          : []
      }
      break;
    case 'IncomingBranches':
      model = {
        ...docFlowStore.createDocumentModel,
        journal: docFlowStore.documentMenuType.__journalId,
        reviewers: docFlowStore.createDocumentModel.__reviewers.map(item => ({ user: item.id })),
        files: docFlowStore.createDocumentModel.__files.length
          ? docFlowStore.createDocumentModel.__files.map(file => ({ file: file.id }))
          : []
      }
      break;
    case 'OrderInstruction':
      model = {
        ...docFlowStore.createDocumentModel,
        journal: docFlowStore.documentMenuType.__journalId,
        reviewers: docFlowStore.createDocumentModel.__reviewers.map(item => ({ user: item.id })),
        files: docFlowStore.createDocumentModel.__files.length
          ? docFlowStore.createDocumentModel.__files.map(file => ({ file: file.id }))
          : []
      }
      break;
    case 'Statement':
      model = {
        ...docFlowStore.createDocumentModel,
        journal: docFlowStore.documentMenuType.__journalId,
        reviewers: docFlowStore.createDocumentModel.__reviewers.map(item => ({ user: item.id })),
        files: docFlowStore.createDocumentModel.__files.length
          ? docFlowStore.createDocumentModel.__files.map(file => ({ file: file.id }))
          : []
      }
      break;
    default:
  }

  try {
    await docFlowStore.actionCreateDocument(model)
    clearDocument()
    await redirectRoute()
    modelValue.value = false
  }
  catch (error) {

  }
  finally {
    buttonLoading.value = false
  }
}
const clearDocument = () => {
  const _documentTypeRef = unref(documentTypeRef)
  clearModel(docFlowStore.createDocumentModel, ['grif'])
  _documentTypeRef.$v.$reset()
}
const redirectRoute = async () => {
  await router.replace({
    name: 'RegistrationList',
    params: { code: docFlowStore.documentMenuType.journalId },
    query: { journal_id: docFlowStore.documentMenuType.__journalId }
  })
}
const afterHide = () => {
  docFlowStore.actionLoadFormCreateDocument({
    journalCode: JOURNAL_CODES.INCOMING
  })
}
// Watch
watch(() => docFlowStore.documentMenuType.name, (value) => {
  documentTypeComponent.value = defineAsyncComponent({
    loader: () => import(`./Form/${value}.vue`),
    loadingComponent: BaseSpinner,
    delay: 200
  })
}, { immediate: true })
</script>

<template>
  <base-dialog
    v-model="modelValue"
    header-classes="py-2 pb-3"
    @emit:after-hide="afterHide"
  >
    <template #header>
      <register-document-menu />
    </template>

    <template #content>
      <component
        ref="documentTypeRef"
        :is="documentTypeComponent"
        :form-model="docFlowStore.createDocumentModel"
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

