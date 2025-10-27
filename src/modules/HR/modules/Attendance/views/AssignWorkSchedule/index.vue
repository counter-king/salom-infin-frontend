<script setup>
// Core
import { computed, ref, shallowRef } from "vue"
import { useI18n } from "vue-i18n"
import { useVuelidate } from "@vuelidate/core"
import { helpers, required } from "@vuelidate/validators"
import { useRoute, useRouter } from "vue-router"
// Const
import { HR_ASSIGN_WORK_SCHEDULE_COLUMNS } from "@/modules/HR/constants"
import { COLOR_TYPES } from "@/enums"
// Utils
import { formatTime } from "@/utils/formatDate"
import { dispatchNotify } from "@/utils/notify"
// Store
import { useAssignWorkScheduleStore } from "@/modules/HR/modules/Attendance/stores/assignWorkSchedule.store"
// Components
import { ActionToolbar } from "@/components/Actions"
import { SelectSingle } from "@/components/Select"
import { AlarmOutlineIcon, AltArrowDownIcon, AltArrowUpIcon, CloseCircleBoldIcon } from "@/components/Icons"
import BaseDataTableV2 from "@/components/UI/BaseDataTableV2.vue"
import { HEADERS, HEADERS_TITLE } from "@/modules/HR/modules/InteractionABS/enums"
import { SearchFilter, SimpleFilter } from "@/modules/HR/modules/InteractionABS/components/filters"
import { useInteractionABSStore } from "@/modules/HR/modules/InteractionABS/stores"

// Composable
const { t } =  useI18n()
const store = useAssignWorkScheduleStore()
const interactionABSStore = useInteractionABSStore()
const route = useRoute()
const router = useRouter()

// Const
const QUERY_NAMES = {
  [HEADERS.COMPANY]: 'company_id',
  [HEADERS.DEPARTMENT]: 'department_id'
}
const allowSortColumns = [HEADERS.COMPANY, HEADERS.DEPARTMENT]
const tableFilters = {
  company: SearchFilter, // branch
  department: SearchFilter, // department
  documentType: SimpleFilter, // document type
  documentSubType: SearchFilter, // document sub type
  operationType: SimpleFilter, // operation type
  statusAbs: SimpleFilter, // status abs
  type: SimpleFilter, // type,
  employee: SearchFilter, // employee
}

// Reactive
const selectedItems = ref(null)
const dialog = ref(false)
const model = ref({
  selectedSchedule: null
})
const filterDropdownRef = ref(null)
const activeFilterComponent = shallowRef(null)
const activeComponentType = ref(null)
const activeApiAction = ref(null)

const apiAction = (activeComponentType) => {
  switch (activeComponentType) {
    case HEADERS.DEPARTMENT:
      return interactionABSStore.actionGetTopDepartmentsList
    case HEADERS.COMPANY:
      return interactionABSStore.actionGetCompanyList
    default:
      return null
  }
}

const rules = {
  selectedSchedule: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}

// Computed
const dataList = computed(() => {
  switch (activeComponentType.value) {
    case HEADERS.DEPARTMENT:
      return interactionABSStore.topDepartmentsList
    case HEADERS.COMPANY:
      return interactionABSStore.companyList
    default:
      return []
  }
})

const $v = useVuelidate(rules, model)

// Methods
const onSort = (event) => {
// to avoid event bubbling
  event.originalEvent.stopPropagation()
  if (!allowSortColumns.includes(event.sortField)) return
  activeFilterComponent.value = tableFilters[event.sortField]
  activeComponentType.value = event.sortField
  activeApiAction.value = apiAction(event.sortField)
  activeApiAction.value()
  toggleFilterDropdown(event)
}

const onAssignClick = () => {
  dialog.value = true
}

const save = async () => {
  const valid = await $v.value.$validate()
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }

  const body = {
    schedule: model.value.selectedSchedule.id,
    employee_ids: selectedItems.value.map(item => item.employee.id),
    notes: model.value.selectedSchedule.name
  }

  await store.actionAssignWorkSchedule(body)
  dialog.value = false
  selectedItems.value = null
  dispatchNotify(null, t('success'), COLOR_TYPES.SUCCESS)
  await store.actionGetAssignWorkScheduleList(route.query)
}

const getQueryName = (type) => {
  switch (type) {
    case HEADERS.EMPLOYEE:
      return 'user'
    case HEADERS.COMPANY:
      return 'company_id'
    case HEADERS.DEPARTMENT:
      return 'department'
    case HEADERS.DOCUMENT_TYPE:
      return 'doc_type_id'
    case HEADERS.DOCUMENT_SUB_TYPE:
      return 'doc_sub_type_id'
    case HEADERS.OPERATION_TYPE:
      return 'action'
    case HEADERS.STATUS_ABS:
      return 'statusAbs'
    case HEADERS.TYPE:
      return 'type'
    default:
      return null
  }
}

const onChangeFilter = async (item) => {
  filterDropdownRef.value.style.display = 'none'
  const header = store.headers.find(header => header.field === activeComponentType.value)
  // set query according to filter type
  await router.replace({
    query: {
      ...route.query,
      [getQueryName(activeComponentType.value)]: item.id
    }
  })
  header.header = item.name || `${item.first_name} ${item.last_name}`
  header.filter = true
  await store.actionGetAssignWorkScheduleList(route.query)
}

const onCancelFilter = async (type) => {
  const header = store.headers.find(header => header.field == type)
  header.filter = false
  header.header = HEADERS_TITLE[header.field]
  // clearying query parametr
  await router.replace({
    query: {
      ...route.query,
      [getQueryName(type)]: undefined
    }
  })

  await store.actionGetAssignWorkScheduleList(route.query)
}

const toggleFilterDropdown = (event) => {
  const headerRect = event.originalEvent.currentTarget.getBoundingClientRect()
  // Filter menyusi pozitsiyasini o'rnatish
  filterDropdownRef.value.style.display = filterDropdownRef.value.style.display === "block" ? "none" : "block"
  filterDropdownRef.value.style.top = `${headerRect.bottom}px`
  filterDropdownRef.value.style.left = `${headerRect.left}px`
  if ([HEADERS.DOCUMENT_TYPE, HEADERS.OPERATION_TYPE, HEADERS.STATUS_ABS, HEADERS.TYPE].includes(activeComponentType.value)) {
    filterDropdownRef.value.style.width = `${headerRect.width}px`
  } else {
    filterDropdownRef.value.style.width = `fit-content`
  }
}
</script>

<template>
  <div>
    <action-toolbar
      :action-buttons="[]"
      title="assign-work-schedule"
      :column-menu-items="store.headers"
      :storage-columns-name="HR_ASSIGN_WORK_SCHEDULE_COLUMNS"
      search-field
      :action-list="store.actionGetAssignWorkScheduleList"
      @emit:reset-headers="store.resetHeaders"
    >
      <template #end>
        <base-button
          label="assign-work-schedule"
          rounded
          type="button"
          :disabled="!(selectedItems && selectedItems.length)"
          @click="onAssignClick"
        />
      </template>
    </action-toolbar>

    <BaseDataTableV2
      v-model:selection="selectedItems"
      :action-list="store.actionGetAssignWorkScheduleList"
      :headers="store.headers"
      :value="store.list"
      scroll-height="calc(100vh - 295px)"
      class="flex flex-col h-full"
      :loading="store.listLoading"
      :total-count="store.totalCount"
      :storage-columns-name="HR_ASSIGN_WORK_SCHEDULE_COLUMNS"
      :pageSize="15"
      selective
      @emit:onSort="onSort"
      @emit:set-store-headers="(val) => store.headers = val"
      @emit:on-page-change="selectedItems = null"
    >
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

      <template #employee="{ data }">
        <div class="flex items-center gap-3">
          <base-avatar
            :label="data.employee?.full_name"
            :image="null"
            :color="data.employee?.color"
            detail-dialog
            :meta="data.user"
            avatarClasses="w-7 h-7"
          >
            <span class="text-xs font-semibold text-white">{{ data.employee?.full_name[0] }}</span>
          </base-avatar>
          <div class="text-sm font-medium text-greyscale-900">{{ data.employee?.full_name }}</div>
        </div>
      </template>

      <template  #company="{ data }">
        {{ data?.employee?.company?.name }}
      </template>

      <template #department="{ data }">
        {{ data?.employee?.top_level_department?.name }}
      </template>

      <template #position="{ data }">
        {{ data?.employee?.position?.name }}
      </template>

      <template #schedule="{ data }">
        {{ formatTime(data.schedule?.start_time) }} - {{ formatTime(data.schedule?.end_time) }}
      </template>
    </BaseDataTableV2>

    <!-- FILTER DROPDOWN -->
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
        :apiParams="{ page: 1, page_size: 15 }"
        @onChange="onChangeFilter"
        :key="activeComponentType"
      />
    </div>
    <!-- /FILTER DROPDOWN -->

    <!-- ASSIGN DIALOG -->
    <base-dialog
      v-model="dialog"
      max-width="max-w-[672px]"
      label="assign-work-schedule"
      :draggable="false"
    >
      <template #content>
        <div class="flex flex-col gap-y-4">
          <select-single
            v-model="$v.selectedSchedule.$model"
            :error="$v.selectedSchedule"
            api-url="work-schedules"
            required
            label="schedule"
            placeholder="schedule"
            :show-clear="false"
            fill-first-item
          />

          <div class="flex items-center justify-between pt-4">
            <span class="text-sm font-medium text-greyscale-500">{{ t('start-time') }}</span>
            <div class="flex gap-x-[6px] items-center text-greyscale-900">
              <span>{{ formatTime(model?.selectedSchedule?.start_time) }}</span>
              <base-iconify :icon="AlarmOutlineIcon" class="text-greyscale-500 !w-6 !h-6"/>
            </div>
          </div>

          <div class="flex items-center justify-between pb-4">
            <span class="text-sm font-medium text-greyscale-500">{{ t('end-time') }}</span>
            <div class="flex gap-x-[6px] items-center text-greyscale-900">
              <span>{{ formatTime(model?.selectedSchedule?.end_time) }}</span>
              <base-iconify :icon="AlarmOutlineIcon" class="text-greyscale-500 !w-6 !h-6"/>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center justify-end w-full">
          <base-button
            color="bg-white hover:bg-greyscale-100 text-primary-dark"
            border-color="border-transparent"
            label="cancel"
            rounded
            shadow
            type="button"
            @click="dialog = false"
          />

          <base-button
            label="save"
            :loading="store.buttonLoading"
            rounded
            shadow
            type="button"
            @click="save"
          />
        </div>
      </template>
    </base-dialog>
    <!-- /ASSIGN DIALOG -->
  </div>
</template>

<style scoped>

</style>
