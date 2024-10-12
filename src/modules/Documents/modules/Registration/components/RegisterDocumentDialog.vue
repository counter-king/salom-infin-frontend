<script setup>
// Core
import { ref, useModel, shallowRef, watch, defineAsyncComponent, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Stores
import { useDocFlowStore } from '../stores/docflow.store'
import { useAuthStore } from '@/modules/Auth/stores'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import RegisterDocumentMenu from './RegisterDocumentMenu.vue'
import { CloudUploadIcon } from '@/components/Icons'
// Utils
import { clearModel } from '@/utils'
// Enums
import { JOURNAL_CODES } from '@/enums'
// Composable
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
const modelValue = useModel(props, 'modelValue')

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
    max-width="max-w-[1180px]"
    header-classes="py-2 pb-3"
    @emit:after-hide="afterHide"
  >
    <template #header>
      <register-document-menu />
    </template>

    <template #content>
      <div class="flex gap-6">
        <div class="max-w-[510px] w-full">
          <base-file-upload
            :files="docFlowStore.createDocumentModel.__files"
            first-preview
            label="attach-file"
            container-class="h-[609px]"
            class="sticky top-0"
            @emit:file-upload="(files) => docFlowStore.createDocumentModel.__files = files"
          >
            <template v-if="!docFlowStore.createDocumentModel.__files.length" #empty-content>
              <div class="text-sm font-medium select-none">
                <div class="flex items-center justify-center w-12 h-12 transition-colors bg-primary-100 group-hover:bg-primary-500 rounded-full mb-3 mx-auto">
                  <base-iconify :icon="CloudUploadIcon" class="transition-colors text-primary-500 group-hover:text-white" />
                </div>

                <div class="flex items-center">
                  <i18n-t keypath="upload-text.text" tag="div" class="flex items-center gap-1">
                    <template v-slot:move>
                      <span class="text-primary-500 block">
                        {{ t('upload-text.move') }}
                      </span>
                    </template>
                    <template v-slot:download>
                      <span class="text-primary-500 block">
                        {{ t('upload-text.download') }}
                      </span>
                    </template>
                  </i18n-t>
                </div>

                <span class="block text-center text-greyscale-400 font-regular mt-1">{{ t('upload-text-1') }}</span>
              </div>
            </template>
          </base-file-upload>
        </div>

        <div class="flex-1">
          <component
            ref="documentTypeRef"
            :is="documentTypeComponent"
            :form-model="docFlowStore.createDocumentModel"
          />
        </div>
      </div>
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

