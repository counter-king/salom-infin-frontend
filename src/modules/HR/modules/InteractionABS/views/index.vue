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
import { AltArrowDownIcon, AltArrowUpIcon, History2Icon, MagniferIcon, CloseCircleBoldIcon} from '@/components/Icons';
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
  statusAbs: SimpleFilter,
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
  if(['documentName', 'documentType', 'operationType', 'statusAbs'].includes(activeComponentType.value)){
    filterDropdownRef.value.style.width = `${headerRect.width}px`
  }else{
    filterDropdownRef.value.style.width = `fit-content`
  }
}

const allowSortColumns = ['branch', 'department', 'documentName', 'documentType', 'operationType', 'statusAbs']

const onSort = (event) => {
  console.log(event)
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

const onChangeFilter = (item) => {
  console.log(item)
  console.log(activeComponentType.value)
  const header = interactionABSStore.headers.find(header => header.field === activeComponentType.value)
  header.header = item.name
  header.filter = true
}

const onCancelFilter = (type) => {
  console.log(type)
  const header = interactionABSStore.headers.find(header => header.header == type)
  // header.filter = false
  // header.header = type
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
    <action-toolbar title="interaction-with-abs">
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
        <!-- header -->
         <template #headerIconbranch="{ data }">
          <div class="flex items-center gap-3">
            <base-iconify 
              v-if="data.filter"
              :icon="CloseCircleBoldIcon"
              @click="onCancelFilter('branch')"
            />
            <div class="flex flex-col items-center relative">
              <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
              <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
            </div>
          </div>
          </template>
          <template #headerIcondepartment="{ data }">
            <div class="flex items-center gap-3">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter('department')"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIcondocumentName="{ data }">
            <div class="flex items-center gap-3">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter('document-name')"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIcondocumentType="{ data }">
            <div class="flex items-center gap-3">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter('document-type')"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIconoperationType="{ data }">
            <div class="flex items-center gap-3">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter('operation-type')"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIconstatusAbs="{ data }">
            <div class="flex items-center gap-3">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter('status-abs')"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
        <!-- body -->
          <template #order="{ data }">
            <div class="text-greyscale-500">
             {{ data.order }}
            </div>
          </template>
          <template #employee="{ data }">
            <div class="flex items-center gap-3">
              <base-avatar  
                :label="data.employee"
                :image="null"
                :color="data.employee"
                avatarClasses="w-7 h-7"
              >
                <span class="text-xs font-semibold text-white">{{ data.employee[0] }}</span>
              </base-avatar>
              <p class="text-sm font-medium text-greyscale-900">{{ data.employee }}</p>
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
        <component 
          :parentRef="filterDropdownRef" 
          :is="activeFilterComponent"
          :type="activeComponentType"
          :apiList="[{id: 1, name: '333'}, {id: 2, name: '444'},{ id:3, name: '333'}, {id: 4, name: '444'},{id: 5, name: '333'}, {id: 6, name: '444'},{id: 7, name: '333'}, {id: 8, name: '444'},{id: 9, name: '333'}, {id: 10, name: '444'}]"
          @onChange="onChangeFilter"
          />
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