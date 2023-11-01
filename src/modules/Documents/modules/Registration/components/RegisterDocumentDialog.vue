<script setup>
// Core
import { ref, useModel, shallowRef, watch, defineAsyncComponent } from 'vue'
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
const documentMenuType = ref('Incoming')
const documentTypeComponent = shallowRef(null)
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
  switch(documentMenuType.value) {
    case 'Incoming':
      await docFlowStore.actionCreateDocument(regIncoming.detailModel)
      break;
    case 'Inner':
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
      <component :is="documentTypeComponent" />
    </template>

    <template #footer>
      <base-button
        label="clear"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
      />

      <base-button
        label="create"
        rounded
        @click="createDocument"
      />
    </template>
  </base-dialog>
</template>
