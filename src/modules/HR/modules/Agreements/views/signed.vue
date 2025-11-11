<script setup>
// Core
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QrCodeVue from 'qrcode.vue'
// Components
import { ActionToolbar, ActionBackButton } from '@/components/Actions'
import { EyeIcon } from '@/components/Icons'
import { StatusChip } from '@/components/Chips'
// Stores
import { useAgreementsStore } from '../stores/agreements.store'
// Utils
import { formatUserFullName } from '@/utils'
import { formatDateHour } from '@/utils/formatDate'
// Enums
import { STATUS_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const agreementsStore = useAgreementsStore()
// Reactive
const dialog = ref(false)
const selected = ref({})
// Methods
const back = async () => {
  await router.replace({ name: 'AgreementGroups' })
}
const preview = (data) => {
  selected.value = data
  dialog.value = true
}
// Hooks
onMounted(async () => {
  await agreementsStore.getNegotiatorsSigned({
    doc_type: route.params.item,
    signed: true
  })
})
</script>

<template>
  <action-toolbar title="Подписанные документы">
    <template #title-before>
      <action-back-button
        self
        @click="back"
      />
    </template>

    <template #filters>
      <span></span>
    </template>
  </action-toolbar>

  <base-data-table
    :headers="agreementsStore.signedHeaders"
    :value="agreementsStore.signedList"
    :total-count="agreementsStore.signedCount"
    scroll-height="calc(100vh - 295px)"
  >
    <template #negotiation.doc_type.name="{ data }">
      <span class="font-medium text-greyscale-900">{{ data.negotiation?.doc_type?.name ?? '-' }}</span>
    </template>

    <template #negotiation.doc_sub_type.name="{ data }">
      <span class="font-medium text-greyscale-900">{{ data.negotiation.doc_sub_type?.name ?? '-' }}</span>
    </template>

    <template #sign="{ data }">
      <status-chip :status="{ id: STATUS_TYPES.DONE }">
        Подписан
      </status-chip>
    </template>

    <template #action_date="{ data }">
      {{ formatDateHour(data.action_date) }}
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
  >
    <template #header>
      <div class="flex-1 truncate mr-2">
        <h1 class="text-xl font-semibold truncate">Просмотр документа</h1>
      </div>
    </template>

    <template #content>
      <div class="shadow-block border-[0.094rem] border-greyscale-200 p-6">
        <div v-html="selected.negotiation?.content" />

        <div class="mt-5">
          <base-row class="items-center">
            <base-col col-class="w-1/2">
            <span class="text-sm font-semibold block">
              {{ selected.user?.position?.name ?? '-' }}
            </span>
            </base-col>

            <base-col col-class="w-1/4">
              <qr-code-vue
                :value="'Central Bank'"
                :size="50"
                level="L"
                render-as="svg"
              />
            </base-col>

            <base-col col-class="w-1/4">
            <span class="text-sm font-semibold block">
              {{ formatUserFullName(selected.user) }}
            </span>
            </base-col>
          </base-row>
        </div>
      </div>
    </template>
  </base-dialog>
  <!-- /preview dialog -->
</template>
