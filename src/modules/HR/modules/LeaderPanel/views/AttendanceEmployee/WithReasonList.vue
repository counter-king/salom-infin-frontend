<script setup>
// core
import { ref, onMounted, computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
// components
import DataTable from '@/modules/HR/modules/InteractionABS/components/DataTable.vue';
import ApplicationStatus from '@/modules/HR/modules/LeaderPanel/components/ApplicationStatus.vue';
import AttendanceReasonStatus from '@/modules/HR/modules/LeaderPanel/components/AttendanceReasonStatus.vue';
import AttendanceStatus from '@/modules/HR/modules/LeaderPanel/components/AttendanceStatus.vue';
import { ReasonProcessModal } from '@/modules/HR/modules/LeaderPanel/components/ReasonProcessModal';
import { CloseCircleBoldIcon, AltArrowUpIcon, AltArrowDownIcon } from '@/components/Icons';
import { CalendarFilter, SimpleFilter } from '../../components/Filters';
// stores
import { useAttendanceWithReasonStore } from '../../stores/attendanceWithReason.store.js';
// utils
import { formatDate, formatHour } from '@/utils/formatDate';
import { formatLateTime } from '@/utils';

// composables
const { t, locale } = useI18n()
const attendanceWithReasonStore = useAttendanceWithReasonStore()
const route = useRoute()
const router = useRouter()
// reactives
const reasonProcessModalOpen = ref(false)
const selectedDay = ref({})
const filterDropdownRef = ref(null)
const activeComponentType = ref(null)
const activeFilterComponent = shallowRef(null)
const activeApiAction = ref(null)

const onClickRow = (data) => {
  selectedDay.value = data
  reasonProcessModalOpen.value = true
}

const tableHeaderNameList = ['employee', 'position','arrival_time', 'departure_time', 'status', 'application_status']

// filter  dropdown components
const tableFilters = {
  date: CalendarFilter, // date
  arrival_time: SimpleFilter, // arrival time
  departure_time: SimpleFilter, // departure time
  status: SimpleFilter, // status
  application_status: SimpleFilter, // application status
}

const QUERY_NAMES = {
  date: 'date',
  arrival_time: 'arrival_time',
  departure_time: 'departure_time',
  status: 'status',
  application_status: 'application_status'
}

// computed
const dataList = computed(() => {
  switch (activeComponentType.value) {
    default:
      return []
  }
})

const apiAction =(activeComponentType) => {
  switch (activeComponentType) {
    case 'date':
      return attendanceWithReasonStore.getAttendanceExceptionsWithReasonList
    default:
      return null
  }
}

const sortableColumnsList = ['date', 'arrival_time', 'departure_time', 'status']

const toogleFilterDropdown = (event) => {
  const headerRect = event.originalEvent.currentTarget.getBoundingClientRect()
  // Filter menyusi pozitsiyasini o'rnatish
  filterDropdownRef.value.style.display = filterDropdownRef.value.style.display === "block" ? "none" : "block"
  filterDropdownRef.value.style.top = `${headerRect.bottom}px`
  filterDropdownRef.value.style.left = `${headerRect.left}px`

  if(tableHeaderNameList.includes(activeComponentType.value)){
    filterDropdownRef.value.style.width = `${headerRect.width}px`
  } else {
    filterDropdownRef.value.style.width = `fit-content`
  }

}

const onSort = (event) => {
  // to avoid event bubbling
  event.originalEvent.stopPropagation()
  if (!sortableColumnsList.includes(event.sortField)) return
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

const onChangeFilter = (item) => {
  console.log("item", item)
  filterDropdownRef.value.style.display = 'none'
  const header = attendanceWithReasonStore.headers.find(header => header.field === activeComponentType.value)
  // set query according to filter type
  router.replace({
    query: {
      ...route.query,
      [QUERY_NAMES[activeComponentType.value]]: item.id
    }
  })
  header.header = item.name || `${item.first_name} ${item.last_name}`
  header.filter = true
}

const onCancelFilter = (type) => {
  const header = attendanceWithReasonStore.headers.find(header => header.field == type)
  header.filter = false
  // clearying query parametr
  router.replace({
    query: {
      ...route.query,
      [getQueryName(type)]: undefined
    }
  })
}
onMounted(async() => {
  document.addEventListener('click', handleOutsideClick)
})

</script>
<template>
    <div class="flex flex-col h-full">
      <DataTable
        :headers="attendanceWithReasonStore.headers"
        :value="attendanceWithReasonStore.attendanceWithReasonList"
        :actionList="attendanceWithReasonStore.getAttendanceExceptionsWithReasonList"
        :apiParams="{ page: 1, page_size: 10, ...route.query }"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="attendanceWithReasonStore.attendanceWithReasonListLoading"
        :total-count="attendanceWithReasonStore.attendanceWithReasonListTotalCount"
        :pageSize="15"
        @emit:onSort="onSort"
        @emit:row-click="onClickRow"
        >
        <!-- header -->
        <template #headerIcondate="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter('date')"
                class="!w-5 !h-5 text-greyscale-500"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
         </template>
        <!-- body -->
          <template #employee="{ data }">
            <div class="flex items-center gap-3">
              <base-avatar  
                :label="data?.employee?.full_name"
                :image="null"
                :color="data?.employee?.color"
                detail-dialog
                :meta="data?.employee"
                avatarClasses="w-7 h-7"
              >
                <span class="text-xs font-semibold text-white">{{ data?.employee?.full_name[0] }}</span>
              </base-avatar>
              <p class="text-sm font-medium text-greyscale-900">{{ data?.employee?.full_name }}</p>
            </div>
          </template>
          <template #position="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data.employee?.position?.name }}</p>
          </template>
          <template #date="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ formatDate(data?.attendance.date) }}</p>
          </template>
          <template #arrival_time="{ data }">
            <div class="flex items-center gap-8">
              <p class="text-sm font-medium text-greyscale-900">{{ formatHour(data?.attendance.first_check_in) }}</p>
              <p class="text-sm font-medium text-critic-500">{{ formatLateTime(data?.attendance.late_minutes, locale) }}</p>
            </div>
          </template>
          <template #departure_time="{ data }">
            <div class="flex items-center gap-8">
              <p class="text-sm font-medium text-greyscale-900">{{ formatHour(data?.attendance.last_check_out) }}</p>
              <p class="text-sm font-medium text-warning-500">{{ formatLateTime(data?.attendance.early_leave_minutes, locale) }}</p>
            </div>
          </template>

          <template #status="{ data }">
            <AttendanceReasonStatus :status="data?.kind" />
            <!-- <attendance-status
              :item="data?.attendance"
            /> -->
          </template>
          <template #application_status="{ data }">
              <ApplicationStatus :status="data?.approvals[0]?.is_approved" />
          </template>
      </DataTable>
      <!-- Filter dropdown -->
      <div 
        ref="filterDropdownRef"
        class="hidden fixed z-10 bg-[#2B2D33] rounded-xl p-1"
        :class="{ '!bg-white !p-0': activeComponentType == 'date' }"
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
    </div>
    <ReasonProcessModal  v-if="reasonProcessModalOpen" v-model="reasonProcessModalOpen" :data="selectedDay" />
</template>
