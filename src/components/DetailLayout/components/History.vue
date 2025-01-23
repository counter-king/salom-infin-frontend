<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import { CardTable } from '@/components/Table'
import { FileChip } from '@/components/Chips'
// Service
import axiosConfig from '@/services/axios.config'
// Utils
import { formatDateHour } from '@/utils/formatDate'
import { CONTENT_TYPES } from '@/enums'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  objectId: {
    type: Number
  },
  contentType: {
    type: Number,
    default: CONTENT_TYPES.DOC_FLOW
  }
})
// Reactive
const header = ref([
  {
    field: 'action',
  }
])
const list = ref([])
// Methods
const loadList = async () => {
  let { data } = await axiosConfig.get(`activity-logs/`, {
    object_id: props.objectId,
    content_type: props.contentType
  })

  list.value = data.results
}
// Hooks
onMounted(async () => {
  await loadList()
})
</script>

<template>
  <div class="layout-history-view">
    <card-table
      :headers="header"
      :value="list"
      :shadow="false"
      scroll-height="calc(100vh - 297px)"
      table-class="border-spacing-y-2"
      wrapper-class="h-[calc(100vh-297px)] p-6 pt-4"
      body-cell-class="bg-greyscale-50 px-0"
      paginator-root-class="bg-greyscale-50 !rounded-none border-t"
      theadClass="hidden"
    >
      <template #action="{ data }">
        <div class="flex gap-4 py-3 relative px-4">
          <div
            class="absolute w-[2px] left-0 top-6 bottom-6"
            :style="{ background: data.description.color }"
          />
          <div>
            <base-avatar
              :action-chip-type="data"
              :label="data?.created_by.first_name"
              :color="data?.created_by.color"
              :image="data?.created_by?.avatar?.url"
              shape="circle"
              avatar-classes="w-8 h-8"
            />
          </div>

          <div class="flex-1">
            <div class="flex items-center justify-between text-sm text-primary-900">
              <h1 class="text-semibold">{{ data?.created_by.full_name }}</h1>
              <h1 class="font-medium">IP: {{ data.ip_addr }}</h1>
            </div>

            <div class="flex items-center gap-1 text-sm fomt-medium text-greyscale-500">
              <h1 class="font-semibold text-primary-500">{{ data?.description.description }}</h1>
              <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full mx-1"></div>
              <h1>{{ formatDateHour(data.created_date) }}</h1>
            </div>

            <div class="border-t-[1px] my-2"></div>

            <div class="flex text-xs text-greyscale-500">
              <div class="w-1/3">
                <h1 class="mb-1">{{ t('original-meaning') }}</h1>

                <p class="text-xs font-semibold text-primary-900">{{ data.old_value ? data.old_value : t('empty') }}</p>

                <!-- Если значение файл -->
<!--                <div class="flex gap-1">-->
<!--                  <file-chip name="Ariza.docx" />-->
<!--                  <file-chip name="Bildirishnoma.pdf" />-->
<!--                </div>-->
              </div>

              <div class="flex-1">
                <h1 class="mb-1">{{ t('new-meaning') }}</h1>

                <p class="text-xs font-semibold text-primary-900">{{ data.new_value ? data.new_value : t('empty') }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </card-table>
  </div>
</template>

<style scoped>

</style>
