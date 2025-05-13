<script setup>
// cores
import { useI18n } from 'vue-i18n'
import { ref, onMounted} from 'vue';
// components
import AddButton from './components/AddButton.vue';
import Empty from '@/components/Empty.vue';
import { TripModal } from './components/TripPrupose';
import { TrashBinTrashIcon, PenBoldIcon } from '@/components/Icons';
import DataTable from './components/DataTable.vue';
// stores
import { useSettingsStore } from '@/modules/HR/modules/BusinessTrip/stores/settings.store'
// composibles
const { t } = useI18n()
const settingsStore = useSettingsStore()
// reactives
const tripModalVisible = ref(false)
const selectedTripPurpose = ref(null)
// methods


const headers = [
  {
    field: 'name',
    header: 'targets',
    width: '60%',
    active: true
  },
  {
    field: 'document_sub_type',
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

const handleClickAddButton = () => {
  selectedTripPurpose.value = null
  tripModalVisible.value = true
}

const handleDeleteTripPurpose = (data) => {
  selectedTripPurpose.value = data
}
const handleEditTripPurpose = (data) => {
  selectedTripPurpose.value = data
}

onMounted(async () => {
 await settingsStore.actionGetTripPurposeList({page: 1, page_size: 20})
})

</script>
<template>
  <div class="flex flex-col pt-4 min-h-[300px]">
    <!-- header -->
    <div class="flex items-center justify-between">
      <!-- title -->
       <p class="text-xl font-semibold text-greyscale-900">{{ t('business-trip-purpose') }}</p>
       <AddButton
        label="add-purpose"
        @click="handleClickAddButton"
       />
    </div>
    <!-- table -->
    <div v-if="true" class="mt-4 mb-4 h-[calc(100vh-380px)]">
      <DataTable 
        :headers="headers"
        :value="settingsStore.tripPurposeList"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="settingsStore.tripPurposeListLoading"
      >
      <template #document_sub_type="{ data }">
        <span>{{ data.name }}</span>
      </template>
      <template #actions="{ data }">
        <div class="flex gap-2">
          <div
            @click="handleEditTripPurpose(data)"
            class="p-[6px] bg-greyscale-50 rounded-[8px] cursor-pointer hover:bg-greyscale-70">
            <base-iconify :icon="PenBoldIcon" class="!w-5 !h-5 text-greyscale-500"/>
          </div>
          <div
            @click="handleDeleteTripPurpose(data)" 
            class="p-[6px] bg-greyscale-50 rounded-[8px] cursor-pointer hover:bg-greyscale-70">
            <base-iconify :icon="TrashBinTrashIcon" class="!w-5 !h-5 text-critic-500"/>
          </div>
        </div>
      </template>
      </DataTable>
    </div>
    <div v-else class="flex flex-col gap-6 items-center justify-center flex-1">
      <Empty
          title="current-no-trip-purpose"
          wrapper-class="shadow-none"
          label-classes="text-sm text-greyscale-400"
      />
      <AddButton
        @click="handleClickAddButton"
        label="add-purpose"
       />
    </div>    
    <!-- modal -->
    <TripModal 
      v-model="tripModalVisible" 
      label="create-trip-purpose"
      :id="activeSelectedTripPurpose?.id"
    />
  </div>
</template>

<style scoped>
</style>