<script setup>
// core
import { ref, inject, watch } from 'vue'
import { useRoute} from 'vue-router'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
// components
import AttendanceReasonCellStatus from '../../components/AttendanceReasonCellStatus.vue'
import AttendanceWorkStatus from '../../components/AttendanceWorkStatus.vue'
import { ReasonProcessModal } from '../../components/ReasonProcessModal'
import LateCameReasonModal from '@/modules/Dashboard/components/Attendance/LateCameReasonModal.vue'
// store
import { useMyAttendanceStore } from '../../store/myAttendence.store'
// utils
import { formatDate, formatHour } from '@/utils/formatDate'
import { formatSecondsToHoursMinutes } from '@/utils'
// constants
import { WEEK_DAYS_LIST } from '../../constants'
// enums
import { USER_STATUS_CODES } from '@/enums'
// composibles
const attendanceStore = useMyAttendanceStore()
const  { t, locale } = useI18n()
const route = useRoute()
// inject
const calendarDaysWithAttendance = inject('calendarDaysWithAttendance')
const reasonListForSubmit = inject('reasonListForSubmit')
// reactives
const reasonProcessModalOpen = ref(false)
const lateCameReasonModalOpen = ref(false)
const selectedDay = ref("")

const isEnterReason = (day) => {
  if(day?.attendance?.type == USER_STATUS_CODES.WORKERS && day?.attendance?.violations?.length > 0 && day?.attendance?.violations?.some(violation => !violation.has_appeal)) return true
  else {
    return false
  }
}

const onClickRow = (day) => {
  
  if(isEnterReason(day)) {
    lateCameReasonModalOpen.value = true
  } else {
    const today = new Date()
    const isTheDayLargeFromToday = dayjs(day.date).isAfter(dayjs(today))
    if(day?.attendance?.type == USER_STATUS_CODES.WORKERS && !isTheDayLargeFromToday){
      selectedDay.value = day
      reasonProcessModalOpen.value = true
   }
  }
}

</script>
<template>
  <div class="mt-4">
    <base-data-table
      :headers="attendanceStore.headers"
      :loading="attendanceStore.myAttendanceListLoading"
      :total-count="attendanceStore.myAttendanceListTotalCount"
      :value="calendarDaysWithAttendance.filter(item => item.currentMonth)"
      scroll-height="calc(100vh - 495px)"
      :lazy="false"
      @emit:row-click="onClickRow"
    >
      <template #date="{ data }">
        <div class="text-sm font-medium text-greyscale-900">
          {{ formatDate(data?.date) }}
        </div>
      </template>
      <template #week_days="{ data }">
        <div class="text-sm font-medium text-greyscale-900">
          {{ WEEK_DAYS_LIST[locale][data.dayOfWeek] }}
        </div>
      </template>
      <template #status="{ data }">
        <AttendanceWorkStatus :data="data"/>
      </template>
      <template #first_check_in="{ data }">
        <div class="text-sm font-medium text-greyscale-900">
          {{ formatHour(data?.attendance?.first_check_in) }}
        </div>
      </template>
      <template #last_check_out="{ data }">
        <div class="text-sm font-medium text-greyscale-900">
          {{ formatHour(data?.attendance?.last_check_out) }}
        </div>
      </template>
      <template #worked_time="{ data }">
        <div class="text-sm font-medium text-greyscale-900">
          {{ formatSecondsToHoursMinutes(data?.attendance?.worked_seconds, locale) }}
        </div>
      </template>
      <template #status2="{ data }">
        <div class="flex gap-2">
          <template v-for="violation in data?.attendance?.violations" :key="violation.id">
            <AttendanceReasonCellStatus :item="violation"/>
          </template>
        </div>
      </template>
    </base-data-table> 
  </div>
  <ReasonProcessModal v-if="reasonProcessModalOpen" v-model="reasonProcessModalOpen" :data="selectedDay" />
  <LateCameReasonModal :key="lateCameReasonModalOpen" v-model="lateCameReasonModalOpen" :reasonList="reasonListForSubmit" />
</template>