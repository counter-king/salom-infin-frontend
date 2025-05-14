<script setup>
// cores
import { useI18n } from 'vue-i18n'
import { ref, onMounted, watch, computed } from 'vue';
import { useDebounce } from '@vueuse/core';
// components
import AddButton from './components/AddButton.vue';
import Empty from '@/components/Empty.vue';
import { DeleteModal, TripModal } from './components/TripPrupose';
import { TrashBinTrashIcon, PenBoldIcon, MagniferIcon } from '@/components/Icons';
import DataTable from './components/DataTable.vue';
// stores
import { useSettingsStore } from '@/modules/HR/modules/BusinessTrip/stores/settings.store'
// services
import { fetchDeleteTagById } from '@/modules/HR/modules/BusinessTrip/services'

// composibles
const { t } = useI18n()
const settingsStore = useSettingsStore()
// reactives
const tripModalVisible = ref(false)
const selectedTripPurpose = ref(null)
const deleteModalVisible = ref(null)
const deleteModalLoading = ref(false)
const search = ref("")
const isFiltered = ref(true)
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
    header: 'document-sub-type',
    width: '30%',
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
  deleteModalVisible.value = true
}
const handleEditTripPurpose = (data) => {
  selectedTripPurpose.value = data
  tripModalVisible.value = true
}

const handleClickDeleteModal = async ()=> {
  deleteModalLoading.value = true
  try {
    await fetchDeleteTagById(selectedTripPurpose.value.id)
    deleteModalVisible.value = false
    settingsStore.actionGetTripPurposeList({ page: 1, page_size: 10 })
    selectedTripPurpose.value = null
  } catch (error) {
    console.log(error)
  } finally {
    deleteModalLoading.value = false
  }
}

const debouncedSearch = useDebounce(search, 500)

watch(debouncedSearch, async (value) => {
  // if value is empty if works
  if (!value) {  
    await settingsStore.actionGetTripPurposeList({ page: 1, page_size: 10 })
  } else {
    await settingsStore.actionGetTripPurposeList({ page: 1, page_size: 10, search: value})
  }

  if(!settingsStore.tripPurposeList.length && value){
    isFiltered.value = true
  } else if (!settingsStore.tripPurposeList.length){
    isFiltered.value = false
  }
})

watch(()=>settingsStore.tripPurposeList, (newValue)=>{
  if(newValue.length){
    isFiltered.value = true
  } else {
    isFiltered.value = false
  }
})

onMounted(async () => {
 await settingsStore.actionGetTripPurposeList({ page: 1, page_size: 10 })
 if(!!settingsStore.tripPurposeList.length){
  isFiltered.value = true
 } else {
  isFiltered.value = false
 } 
})

</script>
<template>
  <div class="flex flex-col pt-4 min-h-[300px]">
    <!-- header -->
    <div class="flex items-center justify-between">
      <!-- title -->
       <p class="text-xl font-semibold text-greyscale-900">{{ t('business-trip-purpose') }}</p>
       <div class="flex items-center gap-2">
          <base-input
            v-model="search"
            :icon-left="MagniferIcon"
            :placeholder="t('search')"
            class="flex p-input-icon-left items-center"
            input-class="!pl-10 !px-3 !py-[14px] text-xs !rounded-[90px] placeholder:text-sm !w-[280px]"
            icon-left-class="!w-4 !h-4"
          />
          <AddButton
            v-if="isFiltered"
            label="add-purpose"
            @click="handleClickAddButton"
          />
       </div>
    </div>
    <!-- table -->
    <div v-show="isFiltered" class="mt-4 mb-4 h-[calc(100vh-380px)]">
      <DataTable 
        :headers="headers"
        :value="settingsStore.tripPurposeList"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="settingsStore.tripPurposeListLoading"
        :action-list="settingsStore.actionGetTripPurposeList"
      >
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
    <div v-show="!isFiltered" class="flex flex-col gap-6 items-center justify-center h-[calc(100vh-380px)]">
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
      v-if="tripModalVisible"
      v-model="tripModalVisible" 
      :label="selectedTripPurpose?.id ? 'edit-trip-purpose' : 'create-trip-purpose'"
      :id="selectedTripPurpose?.id"
    />
    <DeleteModal
      v-if="deleteModalVisible"
      v-model="deleteModalVisible"
      label="delete"
      :loading="deleteModalLoading"
      :max-width="'max-w-[480px]'"
      :content="{
        title: 'really-want-delete'
      }"
      @click:delete="handleClickDeleteModal"
    />
  </div>
</template>

<style scoped>
</style>