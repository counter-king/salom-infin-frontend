<script setup>
// core
import { ref, onMounted, onUnmounted, shallowRef, computed, watch, nextTick } from 'vue'
import { useI18n} from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
// components
import { ActionToolbar } from '@/components/Actions';
import DataTable from '../components/DataTable.vue';
import { Status } from '../components';
import { SearchFilter, SimpleFilter } from '../components/filters';
import { AltArrowDownIcon, AltArrowUpIcon, History2Icon, CloseCircleBoldIcon } from '@/components/Icons';
import Dialog from '../components/Dialog.vue';
// stores
import { useInteractionABSStore } from '../stores';
// enums
import { HEADERS, HEADERS_TITLE, INTERACTION_ABS_COLUMNS, OPERATION_TYPE, OPERATION_TYPE_TITLE, STATUS_ABS, STATUS_ABS_TITLE } from '../enums'
// services
import { getRetryIabsAction } from '../services';

// composibles
const interactionABSStore = useInteractionABSStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
// reactives
const dialogVisible = ref(false)
const filterDropdownRef = ref(null)
const activeFilterComponent = shallowRef(null)
const activeComponentType = ref(null)
const activeApiAction = ref(null)
const iabsActionHistoryById = ref(null)
const statusAbsValue = [{ id: STATUS_ABS.SENT, name: t(STATUS_ABS_TITLE[STATUS_ABS.SENT]) }, { id: STATUS_ABS.FAILED, name: t(STATUS_ABS_TITLE[STATUS_ABS.FAILED]) }, { id: STATUS_ABS.CREATE, name: t(STATUS_ABS_TITLE[STATUS_ABS.CREATE]) }, { id: STATUS_ABS.PROLONG, name: t(STATUS_ABS_TITLE[STATUS_ABS.PROLONG]) }, { id: STATUS_ABS.CANCEL, name: t(STATUS_ABS_TITLE[STATUS_ABS.CANCEL]) }]
const operationTypeValue = [{ id: OPERATION_TYPE.SENT, name: t(OPERATION_TYPE_TITLE[OPERATION_TYPE.SENT]) }, { id: OPERATION_TYPE.FAILED, name: t(OPERATION_TYPE_TITLE[OPERATION_TYPE.FAILED]) }, { id: OPERATION_TYPE.CREATE, name: t(OPERATION_TYPE_TITLE[OPERATION_TYPE.CREATE]) }, { id: OPERATION_TYPE.PROLONG, name: t(OPERATION_TYPE_TITLE[OPERATION_TYPE.PROLONG]) }, { id: OPERATION_TYPE.CANCEL, name: t(OPERATION_TYPE_TITLE[OPERATION_TYPE.CANCEL]) }]

const QUERY_NAMES = {
  [HEADERS.COMPANY]: 'company_id',
  [HEADERS.DEPARTMENT]: 'department_id',
  [HEADERS.DOCUMENT_TYPE]: 'doc_type_id',
  [HEADERS.DOCUMENT_SUB_TYPE]: 'doc_sub_type_id',
  [HEADERS.OPERATION_TYPE]: 'action',
  [HEADERS.STATUS_ABS]: 'statusAbs'
}
// computed
const dataList = computed(() => {
  switch (activeComponentType.value) {
    case HEADERS.DEPARTMENT:
      return interactionABSStore.topDepartmentsList
    case HEADERS.COMPANY:
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
      return []
  }
})

const apiAction =(activeComponentType) => {
  switch (activeComponentType) {
    case HEADERS.DEPARTMENT:
      return interactionABSStore.actionGetTopDepartmentsList
    case HEADERS.COMPANY:
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
}

// filter  dropdown components
const tableFilters = {
  company: SearchFilter, // branch
  department: SearchFilter, // department
  documentType: SimpleFilter, // document type
  documentSubType: SearchFilter, // document sub type
  operationType: SimpleFilter,
  statusAbs: SimpleFilter,
}

// methods
const onHistoryClick = (item) => {
  iabsActionHistoryById.value = item.id
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
  } else{
    filterDropdownRef.value.style.width = `fit-content`
  }
}

const allowSortColumns = [HEADERS.COMPANY, HEADERS.DEPARTMENT, HEADERS.DOCUMENT_TYPE, HEADERS.DOCUMENT_SUB_TYPE, HEADERS.OPERATION_TYPE, HEADERS.STATUS_ABS]

const onSort = (event) => {
  // to avoid event bubbling
  event.originalEvent.stopPropagation()
  if (!allowSortColumns.includes(event.sortField)) return
  activeFilterComponent.value = tableFilters[event.sortField]
  activeComponentType.value = event.sortField
  activeApiAction.value = apiAction(event.sortField)
  toogleFilterDropdown(event)
}

const handleOutsideClick = (event) => {
  if(filterDropdownRef.value && !filterDropdownRef.value.contains(event.target)){
    filterDropdownRef.value.style.display = "none"
    activeComponentType.value = null
  }
}

const getQueryName = (type) => {
  switch(type){
    case HEADERS.EMPLOYEE:
      return 'user'
    case HEADERS.COMPANY:
      return 'company_id'
    case HEADERS.DEPARTMENT:
      return 'department_id'
    case HEADERS.DOCUMENT_TYPE:
      return 'doc_type_id'
    case HEADERS.DOCUMENT_SUB_TYPE:
      return 'doc_sub_type_id'
    case HEADERS.OPERATION_TYPE:
      return 'action'
    case HEADERS.STATUS_ABS:
      return 'statusAbs'
    default:
      return null
  }
}

const onChangeFilter = (item) => {
  filterDropdownRef.value.style.display = 'none'
  const header = interactionABSStore.headers.find(header => header.field === activeComponentType.value)
  // set query according to filter type
  router.replace({
    query: {
      ...route.query,
      [getQueryName(activeComponentType.value)]: item.id
    }
  })
  header.header = item.name
  header.filter = true
}

const onCancelFilter = (type) => {
  const header = interactionABSStore.headers.find(header => header.field == type)
  header.filter = false
  header.header = HEADERS_TITLE[header.field]
  // clearying query parametr
  router.replace({
    query: {
      ...route.query,
      [getQueryName(type)]: undefined
    }
  })
}

const onSendAgain = async(item) => {
  await getRetryIabsAction(item.id)
  interactionABSStore.actionGetIabsActionList({ page: 1, page_size: 20 })
}

watch(()=>route.query, ()=>{
  interactionABSStore.actionGetIabsActionList({ page: 1, page_size: 20, ...router.currentRoute.value.query, status: route.query.statusAbs || undefined, start_date: route.query.created_start_date || undefined, end_date: route.query.created_end_date || undefined })
}, { deep: true })


onMounted(async() => {
  // URLdan query parametrlarini olib tashlash
  await nextTick(() => {
    router.replace({
      query: {}
    })
  })

  await interactionABSStore.actionGetCompanyList({ page: 1, page_size: 20 })
  await interactionABSStore.actionGetTopDepartmentsList({ page: 1, page_size: 20})
  await interactionABSStore.actionGetDocumentTypeList({ page: 1, page_size: 20})
  await interactionABSStore.actionGetDocumentSubTypeList({ page: 1, page_size: 20})
  document.addEventListener('click', handleOutsideClick)

  interactionABSStore.actionGetIabsActionList({ page: 1, page_size: 20, ...router.currentRoute.value.query, status: route.query.statusAbs || undefined, start_date: route.query.created_start_date || undefined, end_date: route.query.created_end_date || undefined })
})

// onMounted(()=>{
//   // if query parametrlari bor bo'lsa headersni filter qilib, qiymatlarni table filter berish
//   Object.keys(router.currentRoute.value.query).forEach((key)=>{
//     const header = interactionABSStore.headers.find(header => QUERY_NAMES[header.field] == key)
//     if(header){
//       header.filter = true
//       header.header = HEADERS_TITLE[header.field]
//     }
//   })
// })

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

</script>

<template>
  <div class="">
    <action-toolbar 
      :action-buttons="['export', 'calendar']" 
      title="interaction-with-abs"
      :column-menu-items="interactionABSStore.headers"
      :storage-columns-name="INTERACTION_ABS_COLUMNS"
      @emit:reset-headers="interactionABSStore.resetHeaders"
      >
    </action-toolbar>
    <div class="flex flex-col h-full">
      <DataTable
        :headers="interactionABSStore.headers"
        :value="interactionABSStore.iabsActionList"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="interactionABSStore.iabsActionListLoading"
        :total-count="interactionABSStore.iabsActionListTotalCount"
        :storage-columns-name="INTERACTION_ABS_COLUMNS"
        :pageSize="15"
        @emit:onSort="onSort"
        @emit:set-store-headers="(val) => interactionABSStore.headers = val"
        >
        <!-- header -->
         <template #headerIconcompany="{ data }">
          <div class="flex items-center gap-1">
            <base-iconify 
              v-if="data.filter"
              :icon="CloseCircleBoldIcon"
              @click="onCancelFilter(HEADERS.COMPANY)"
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
                :label="data.user?.full_name"
                :image="null"
                :color="data.user?.full_name"
                avatarClasses="w-7 h-7"
              >
                <span class="text-xs font-semibold text-white">{{ data.user?.full_name[0] }}</span>
              </base-avatar>
              <p class="text-sm font-medium text-greyscale-900">{{ data.user?.full_name }}</p>
            </div>
          </template>
          <template #position="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data.user?.position?.name }}</p>
          </template>
          <template #company="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.company?.name }}</p>
          </template>
          <template #department="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.department?.name }}</p>
          </template>
          <template #documentType="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.documentType?.name }}</p>
          </template>
          <template #documentSubType="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.documentSubType?.name }}</p>
          </template>
          <template #operationType="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ t(data.operationType) }}</p>
          </template>
          <template #statusAbs="{ data }"> 
            <status :status="data.statusAbs" />
          </template>
          <template #history="{ data }">
            <base-iconify :icon="History2Icon" class="w-6 h-6 text-greyscale-400" @click="onHistoryClick(data)"/>
          </template>
          <template #actions="{ data }">
            <div 
              @click="onSendAgain(data)"
              class="px-3 py-2 select-none bg-primary-500 rounded-[90px] text-xs text-white w-fit "
              :class="{ '!bg-greyscale-200 !pointer-events-none': data.statusAbs != STATUS_ABS.FAILED }"
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
          :type="QUERY_NAMES[activeComponentType]"
          :apiAction="activeApiAction"
          :apiList="dataList"
          :apiParams="{ page: 1, page_size: 20 }"
          @onChange="onChangeFilter"
          :key="activeComponentType"
          />
      </div>
    </div>
  </div>
  <Dialog
    v-if="dialogVisible"
    :id="iabsActionHistoryById"
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