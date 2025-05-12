<script setup>
// core
import { ref } from 'vue'
import { useI18n} from 'vue-i18n'
// components
import DataTable from './components/DataTable.vue';
import { MenuDotsBoldIcon } from '@/components/Icons';
import ViewModal from './components/History/ViewModal.vue';
// composibles
const { t } = useI18n()
// reactives
const historyModalVisible = ref(false)

const headers = [
  {
    field: 'targets',
    header: 'targets',
    width: '60%',
    active: true
  },
  {
    field: 'documentType',
    header: 'document-type',
    width: '20%',
    active: true

  },
  {
    field: 'actions',
    header: 'actions',
    width: '10%',
    active: true
  }
]
const value = [{
  order: 1,
  targets: 'targets',
  documentType: 'document-type',
  actions: 'actions'
},
{
  order: 2,
  targets: 'targets',
  documentType: 'document-type',
  actions: 'actions'
}
]


// methods
const handleClickDetail = () => {
  historyModalVisible.value = true
}
</script>

<template>
   <div class="flex flex-col pt-4 min-h-[520px]">
    <!-- header -->
    <div class="flex items-center justify-between">
      <!-- title -->
       <p class="text-xl font-semibold text-greyscale-900">{{ t('history') }}</p>
    </div>
    <!-- table -->
    <div class="mt-4 h-[calc(100vh-200px)]">
      <DataTable
        :headers="headers"
        :value="value"
        scroll-height="calc(100vh - 495px)"
      >
        <template #actions="{ data }">
          <div class="flex gap-2">
            <div 
              @click="handleClickDetail(data)" 
              class="p-[6px] bg-greyscale-50 rounded-[8px] cursor-pointer hover:bg-greyscale-70"
              >
              <base-iconify :icon="MenuDotsBoldIcon" class="!w-5 !h-5 text-greyscale-500" />
            </div>
          </div>
        </template>
      </DataTable>
    </div> 
    <!-- modal -->
    <ViewModal 
      v-model="historyModalVisible"
      label="value"
      :max-width="'max-w-[544px]'"
    />
  </div>
</template>

<style scoped>
</style>