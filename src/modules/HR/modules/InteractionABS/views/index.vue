<script setup>
// core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// components
import { ActionToolbar } from '@/components/Actions';
import DataTable from '../components/DataTable.vue';
import { Status } from '../components';
import { History2Icon } from '@/components/Icons';
import Dialog from '../components/Dialog.vue';
// stores
import { useInteractionABSStore } from '../stores';
// composibles
const interactionABSStore = useInteractionABSStore()
const { t } = useI18n()
// reactives
const dialogVisible = ref(false)
// methods

const onHistoryClick = () => {
  dialogVisible.value = true
}

const onCloseDialog = () => {
  dialogVisible.value = false
}

</script>

<template>
  <div class="">
    <action-toolbar title="interaction-with-abs1">
      <template #filters>
      </template>
    </action-toolbar>
    <div class="flex flex-col h-full">
      <DataTable
        :headers="interactionABSStore.headers"
        :value="interactionABSStore.list"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="interactionABSStore.listLoading"
        :total-count="interactionABSStore.totalCount"
        :action-list="interactionABSStore.actionGetInteractionABSList"
        :pageSize="15"
        >
          <template #order="{ data }">
            <div class="text-greyscale-500">
             {{ data.order }}
            </div>
          </template>
          <template #employee="{ data }">
            <div class="flex gap-3 items-center">
             <base-avatar :user="data.employee" />
             <span>{{ data.employee.full_name }}</span>
            </div>
          </template>
          <template #status="{ data }">
            <status :status="data.status" />
          </template>
          <template #history="{ data }">
            <base-iconify :icon="History2Icon" class="w-6 h-6 text-greyscale-400" @click="onHistoryClick"/>
          </template>
          <template #actions="{ data }">
            <div 
              class="px-3 py-2 select-none bg-primary-500 rounded-[90px] text-xs text-white w-fit "
              :class="{ '!bg-greyscale-200 !pointer-events-none': false }"
              >
              {{ t('send-again') }}
            </div>
          </template>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:dialogVisible="dialogVisible"
  />
</template>