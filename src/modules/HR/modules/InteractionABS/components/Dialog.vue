<script setup>
// core
import { useModel, onUnmounted } from 'vue'
import { useRouter, useRoute} from 'vue-router'
import { useI18n } from 'vue-i18n'
// components
import DataTableModal from './DataTableModal.vue'
import Status from './Status.vue'
// stores
import { useInteractionABSStore } from '../stores';
// utils
import { formatDateHour } from '@/utils/formatDate'
// composibles
const interactionABSStore = useInteractionABSStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
// props
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
})

// emits
const emit = defineEmits([
  'update:dialogVisible'
])
// composibles
const dialogVisible = useModel(props, 'dialogVisible')

onUnmounted(() => {
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      action_history: undefined
    }
  })
})

</script>
<template>
  <base-dialog
    v-model="dialogVisible"
    max-width="max-w-[1638px]"
    :headerClasses="'px-6 py-6'"
    :contentClasses="'px-6 py-3 !h-[444px]'"
    :footerClasses="'h-[84px]'"
    :label="t('history')"
  >
    <template #content>
      <template v-if="true">
        <DataTableModal
          :headers="interactionABSStore.historyHeaders"
          :value="interactionABSStore.iabsRequestCalls"
          scroll-height="calc(100vh - 360px)"
          class="flex flex-col h-full"
          :loading="interactionABSStore.iabsRequestCallsLoading"
          :total-count="interactionABSStore.iabsRequestCallsTotalCount"
          :action-list="interactionABSStore.actionGetIabsRequestCalls"
          :apiParams="{ action_history: route.query?.action_history, page: 1, page_size: 15 }"
          :pageSize="15"
          >
            <template #order="{ data }">
              <div class="text-greyscale-500">
              {{ data.order }}
              </div>
            </template>
            <template #caller="{ data }">
              <div class="flex items-center gap-3">
                <base-avatar 
                  :image="data.callerImage"
                  :label="data.caller?.full_name"
                  detail-dialog
                  :meta="data.caller"
                  avatar-classes="w-7 h-7"
                />
                <span >{{ data.caller?.full_name }}</span>
              </div>
            </template>
            <template #date="{ data }">
              <div class="text-greyscale-500">
              {{ formatDateHour(data?.requested_date) }}
              </div>
            </template>
            <template #status="{ data }">
              <div class="text-greyscale-500">
                <status :status="data.status" />
              </div>
            </template>
            <template #requestId="{ data }">
              <div class="text-greyscale-500">
                {{ data.request_id }}
              </div>
            </template>
            <template #responseText="{ data }">
              <div class="text-greyscale-500">
                {{ data.response_text }}
              </div>
            </template>
        </DataTableModal>
      </template>
      <template v-else>
        <base-spinner/>
      </template>
    </template>
    <template #footer>
      
    </template>
  </base-dialog>
</template>
  