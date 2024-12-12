<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import { ActionToolbar, ActionBackButton, EriKeysMenu } from '@/components/Actions'
import { EyeIcon } from '@/components/Icons'
import { LinkableCell } from '@/components/Table'
// Stores
import { useCountStore } from '@/stores/count.store'
import { useAgreementsStore } from '../stores/agreements.store'
import { useAgreementsRoutesStore } from '../stores/routes.store'
// Utils
import { dispatchNotify } from '@/utils/notify'
import { formatDateHour } from '@/utils/formatDate'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const countStore = useCountStore()
const agreementsStore = useAgreementsStore()
const agreementsRoutesStore = useAgreementsRoutesStore()
// Reactive
const checkedValues = ref([])
const dialog = ref(false)
const selected = ref({})
const loading = ref(false)
// Methods
const signDocument = async () => {
  if(!checkedValues.value.length) {
    dispatchNotify(null, 'Сначала выберите документ для подписания', 'warn')
    return
  }

  await agreementsStore.signNegotiatorsNotSigned(checkedValues.value)
  await countStore.actionCountList()
  dispatchNotify(null, 'Документ успешно подписан', COLOR_TYPES.SUCCESS)
  await agreementsStore.getNegotiatorsNotSigned({
    doc_type: route.params.item,
    unchecked: 'none'
  })
}
const signDocumentWithModal = async () => {
  try {
    loading.value = true
    await signDocument()
    await countStore.actionCountList()
    dialog.value = false
  }
  finally {
    loading.value = false
  }
}
const back = async () => {
  await router.replace({ name: 'AgreementGroups' })
}
const handleSelection = (value) => {
  checkedValues.value = value.map(item => item.id)
}
const preview = (data) => {
  selected.value = data
  handleSelection([data])
  dialog.value = true
}
const afterHideDialog = () => {
  if(selected.value) {
    checkedValues.value = []
  }
}
const link = (data) => {
  return { name: 'AgreementNotSignedShow', params: { id: data.id } }
}
// Hooks
onMounted(async () => {
  await agreementsStore.getNegotiatorsNotSigned({
    doc_type: route.params.item,
    unchecked: 'none'
  })
})
</script>

<template>
  <action-toolbar title="Неподписанные документы">
    <template #title-before>
      <action-back-button
        self
        @click="back"
      />
    </template>

    <template #filters>
      <eri-keys-menu @emit:sign="signDocument" />
    </template>
  </action-toolbar>

  <base-data-table
    :headers="agreementsStore.headers"
    :value="agreementsStore.notSignedList"
    :total-count="agreementsStore.notSignedCount"
    selectable
    scroll-height="calc(100vh - 295px)"
    @update:selection="handleSelection"
  >
    <template #negotiation.doc_type.name="{ data }">
      <!-- <linkable-cell :to="link(data)"> -->
        <span class="font-medium text-greyscale-900">{{ data.negotiation?.doc_type?.name ?? '-' }}</span>
      <!-- </linkable-cell> -->
    </template>

    <template #negotiation.doc_sub_type.name="{ data }">
      <!-- <linkable-cell :to="link(data)"> -->
        <span class="font-medium text-greyscale-900">{{ data.negotiation.doc_sub_type?.name ?? '-' }}</span>
      <!-- </linkable-cell> -->
    </template>

    <template #created_date="{ data }">
      <!-- <linkable-cell :to="link(data)"> -->
        <span class="font-medium text-greyscale-900">{{ formatDateHour(data.created_date) }}</span>
      <!-- </linkable-cell> -->
    </template>

    <template #actions="{ data }">
      <base-button
        size="small"
        :icon-left="EyeIcon"
        only-icon
        rounded
        text
        v-tooltip.top="{
          value: `<h4 class='text-xs text-white -my-1'>Просмотр файла</h4>`,
          escape: true,
          autoHide: false
        }"
        class="group bg-white text-greyscale-500 hover:text-primary-500"
        @click="preview(data)"
      />
    </template>
  </base-data-table>

  <!-- preview dialog -->
  <base-dialog
    v-model="dialog"
    max-width="max-w-[21cm]"
    @emit:after-hide="afterHideDialog"
  >
    <template #header>
      <div class="flex-1 truncate mr-2">
        <h1 class="text-xl font-semibold truncate">Просмотр документа</h1>
      </div>
    </template>

    <template #content>
      <div class="shadow-block border-[0.094rem] border-greyscale-200 p-6">
        <div v-html="selected.negotiation?.content" />
      </div>
    </template>

    <template #footer>
      <base-button
        label="sign-document"
        rounded
        shadow
        border-color="border-transparent"
        :loading="loading"
        @click="signDocumentWithModal"
      />
    </template>
  </base-dialog>
  <!-- /preview dialog -->
</template>
