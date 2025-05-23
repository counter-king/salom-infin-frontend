<script setup>
// core
import { ref, onMounted, onUnmounted, shallowRef, computed, watch } from 'vue'
import { useI18n} from 'vue-i18n'
import { useRouter } from 'vue-router'
// components
import { ActionToolbar } from '@/components/Actions';
import DataTable from '../components/DataTable.vue';
import { Status } from '../components';
import { SearchFilter, SimpleFilter } from '../components/filters';
import { AltArrowDownIcon, AltArrowUpIcon, History2Icon, MagniferIcon, CloseCircleBoldIcon } from '@/components/Icons';
import Dialog from '../components/Dialog.vue';
// stores
import { useInteractionABSStore } from '../stores';
// enums
import { HEADERS, HEADERS_TITLE, OPERATION_TYPE, OPERATION_TYPE_TITLE, STATUS_ABS, STATUS_ABS_TITLE } from '../enums'
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

const statusAbsValue = [{ id: STATUS_ABS.SUCCESS, name: t(STATUS_ABS_TITLE[STATUS_ABS.SUCCESS]) }, { id: STATUS_ABS.ERROR, name: t(STATUS_ABS_TITLE[STATUS_ABS.ERROR])}]
const operationTypeValue = [{ id: OPERATION_TYPE.CREATE, name: t(OPERATION_TYPE_TITLE[OPERATION_TYPE.CREATE]) }, { id: OPERATION_TYPE.CANCEL, name: t(OPERATION_TYPE_TITLE[OPERATION_TYPE.CANCEL]) }, { id: OPERATION_TYPE.EXTEND, name: t(OPERATION_TYPE_TITLE[OPERATION_TYPE.EXTEND]) }]
// computed
const dataList = computed(() => {
  switch (activeComponentType.value) {
    case HEADERS.DEPARTMENT:
      return interactionABSStore.topDepartmentsList
    case HEADERS.BRANCH:
      return interactionABSStore.companyList
    case HEADERS.DOCUMENT_TYPE:
      return interactionABSStore.documentTypeList
    case HEADERS.DOCUMENT_SUB_TYPE:
      return interactionABSStore.documentSubTypeList
    case HEADERS.OPERATION_TYPE:
      return operationTypeValue
    case HEADERS.STATUS_ABS:
      return statusAbsValue
    default:
      return [{ id: 1, name: 'test' }]
  }
})

const apiAction = computed(() => {
  switch (activeComponentType.value) {
    case HEADERS.DEPARTMENT:
      return interactionABSStore.actionGetTopDepartmentsList
    case HEADERS.BRANCH:
      return interactionABSStore.actionGetCompanyList
    case HEADERS.DOCUMENT_TYPE:
      return interactionABSStore.actionGetDocumentTypeList
    case HEADERS.DOCUMENT_SUB_TYPE:
      return interactionABSStore.actionGetDocumentSubTypeList
    case HEADERS.OPERATION_TYPE:
      return null
    case HEADERS.STATUS_ABS:
      return null
    default:
      return null
  }
})

const tableFilters = {
  department: SearchFilter,
  branch: SearchFilter,
  documentType: SimpleFilter, // document type
  documentSubType: SearchFilter, // document sub type
  operationType: SimpleFilter,
  statusAbs: SimpleFilter,
}

// methods
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
  if([HEADERS.DOCUMENT_TYPE, HEADERS.OPERATION_TYPE, HEADERS.STATUS_ABS].includes(activeComponentType.value)){
    filterDropdownRef.value.style.width = `${headerRect.width}px`
  }else{
    filterDropdownRef.value.style.width = `fit-content`
  }
}

const allowSortColumns = [HEADERS.BRANCH, HEADERS.DEPARTMENT, HEADERS.DOCUMENT_TYPE, HEADERS.DOCUMENT_SUB_TYPE, HEADERS.OPERATION_TYPE, HEADERS.STATUS_ABS]

const onSort = (event) => {
  console.log(event)
  // to avoid event bubbling
  event.originalEvent.stopPropagation()
  if (!allowSortColumns.includes(event.sortField)) return
  activeFilterComponent.value = tableFilters[event.sortField]
  activeComponentType.value = null
  activeComponentType.value = event.sortField
  toogleFilterDropdown(event)
}

const handleOutsideClick = (event) => {
  if(filterDropdownRef.value && !filterDropdownRef.value.contains(event.target)){
    filterDropdownRef.value.style.display = "none"
    activeComponentType.value = null
  }
}

const onChangeFilter = (item) => {
  const header = interactionABSStore.headers.find(header => header.field === activeComponentType.value)
  header.header = item.name
  header.filter = true
}

const onCancelFilter = (type) => {
  const header = interactionABSStore.headers.find(header => header.field == type)
  header.filter = false
  header.header = HEADERS_TITLE[header.field]
}
onMounted(async() => {
  // clear queries params
  router.replace({ query: {} });

  await interactionABSStore.actionGetCompanyList({page: 1, page_size: 20})
  await interactionABSStore.actionGetTopDepartmentsList({ page: 1, page_size: 20})
  await interactionABSStore.actionGetDocumentTypeList({ page: 1, page_size: 20})
  await interactionABSStore.actionGetDocumentSubTypeList({ page: 1, page_size: 20})
  document.addEventListener('click', handleOutsideClick)

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
          <div class="flex items-center gap-1">
            <base-iconify 
              v-if="data.filter"
              :icon="CloseCircleBoldIcon"
              @click="onCancelFilter(HEADERS.BRANCH)"
              class="!w-5 !h-5 text-greyscale-500"
            />
            <div class="flex flex-col items-center relative">
              <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
              <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
            </div>
          </div>
          </template>
          <template #headerIcondepartment="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.DEPARTMENT)"
                class="!w-5 !h-5 text-greyscale-500"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIcondocumentType="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.DOCUMENT_TYPE)"
                class="!w-5 !h-5 text-greyscale-500"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIcondocumentSubType="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.DOCUMENT_SUB_TYPE)"
                class="!w-5 !h-5 text-greyscale-500"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIconoperationType="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.OPERATION_TYPE)"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIconstatusAbs="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.STATUS_ABS)"
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
          :apiAction="apiAction"
          :apiList="dataList"
          :apiParams="{ page: 1, page_size: 20 }"
          @onChange="onChangeFilter"
          :key="activeComponentType"
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

::v-deep(.p-column-title){
  max-width: 72% !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}
</style>