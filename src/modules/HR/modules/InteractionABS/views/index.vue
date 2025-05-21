<script setup>
// core
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { useI18n} from 'vue-i18n'
import { useRouter } from 'vue-router'
// components
import { ActionToolbar } from '@/components/Actions';
import DataTable from '../components/DataTable.vue';
import { Status } from '../components';
import { SearchFilter, SimpleFilter } from '../components/filters';
import { AltArrowDownIcon, AltArrowUpIcon, History2Icon, MagniferIcon} from '@/components/Icons';
import Dialog from '../components/Dialog.vue';
// stores
import { useInteractionABSStore } from '../stores';
// composibles
const interactionABSStore = useInteractionABSStore()
const { t } = useI18n()
const router = useRouter()
// reactives
const dialogVisible = ref(false)
const filterDropdownRef = ref(null)
const headerRef = ref(null)
const activeFilterComponent = shallowRef(null)
const activeComponentType = ref(null)
// methods

const tableFilters = {
  department: SearchFilter,
  branch: SearchFilter,
  documentName: SimpleFilter,
  documentType: SimpleFilter,
  operationType: SimpleFilter,
  status: SimpleFilter,
}

const onHistoryClick = () => {
  dialogVisible.value = true
}

const onCloseDialog = () => {
  dialogVisible.value = false
}

const toogleFilterDropdown = (event) => {
  const headerRect = event.originalEvent.currentTarget.getBoundingClientRect()

  // Filter menyusi pozitsiyasini o'rnatish
  filterDropdownRef.value.style.display = filterDropdownRef.value.style.display === "block" ? "none" : "block"
  filterDropdownRef.value.style.top = `${headerRect.bottom}px`
  filterDropdownRef.value.style.left = `${headerRect.left}px`
  if(['documentName', 'documentType', 'operationType', 'status'].includes(activeComponentType.value)){
    console.log("headerRect", headerRect)
    filterDropdownRef.value.style.width = `${headerRect.width}px`
  }else{
    filterDropdownRef.value.style.width = `fit-content`
  }
}

const allowSortColumns = ['branch', 'department', 'documentName', 'documentType', 'operationType', 'status']

const onSort = (event) => {
  // to avoid event bubbling
  event.originalEvent.stopPropagation()
  if (!allowSortColumns.includes(event.sortField)) return
  activeFilterComponent.value = tableFilters[event.sortField]
  activeComponentType.value = event.sortField
  toogleFilterDropdown(event)
}

const handleOutsideClick = (event) => {
  if(filterDropdownRef.value && !filterDropdownRef.value.contains(event.target)){
    filterDropdownRef.value.style.display = "none"
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  // clear queries params
  // router.replace({ query: router.currentRoute.value.query });

})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

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
        @emit:onSort="onSort"
        >
          <template #order="{ data }">
            <div class="text-greyscale-500">
             {{ data.order }}
            </div>
          </template>
          <template #headerIconbranch="{ data }">
            <div class="flex flex-col items-center relative">
              <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute bottom-[-5px]"/>
              <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute top-[-5px]"/>
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
      <!-- Filter dropdown -->
      <div 
        ref="filterDropdownRef"
        class="hidden fixed z-10 bg-[#2B2D33] rounded-xl p-1"
      >
        <component :parentRef="filterDropdownRef" :is="activeFilterComponent" :type="activeComponentType" :apiList="[{id: 1, name: '333'}, {id: 2, name: '444'},{id:3, name: '333'}, {id: 4, name: '444'},{id: 5, name: '333'}, {id: 6, name: '444'},{id: 7, name: '333'}, {id: 8, name: '444'},{id: 9, name: '333'}, {id: 10, name: '444'}]"/>
      </div>
    </div>
  </div>
  <Dialog
    v-model:dialogVisible="dialogVisible"
  />
</template>
<style scoped>
::v-deep(.p-inputtext:enabled:focus){
  box-shadow: none !important;
}
</style>