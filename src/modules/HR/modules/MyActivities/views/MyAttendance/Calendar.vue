<script setup>
// core
import { computed, ref, inject, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
// components
import HourStatus from '../../components/HourStatus.vue';
import AttendanceReasonCellStatus from '../../components/AttendanceReasonCellStatus.vue';
import AttendanceProccessStatus from '../../components/AttendanceProccessStatus.vue';
import { ReasonProcessModal } from '../../components/ReasonProcessModal';
import LateCameReasonModal from '@/modules/Dashboard/components/Attendance/LateCameReasonModal.vue';
// enums
import { CHECK_IN_STATUS, CHECK_OUT_STATUS, KIND,  } from '../../enums';
import { USER_STATUS_CODES } from '@/enums';
// store
import { useMyAttendanceStore } from '../../store/myAttendence.store';
// composables
import { useAttendanceCalendar } from '../../composibles/useAttendanceCalendar';
import { WEEK_DAYS_UZ, WEEK_DAYS_RU } from '../../constants';
// composables
const { t, locale } = useI18n()
const attendanceStore = useMyAttendanceStore()
// injects
const calendarDaysWithAttendance = inject('calendarDaysWithAttendance')
const reasonListForSubmit = inject('reasonListForSubmit')
// reactives
const reasonProcessModalOpen = ref(false)
const lateCameReasonModalOpen = ref(false)
const hoveredBadgeIndex = ref(null)
const selectedDay = ref("")
// computed
const weekDays = computed(() => locale.value === 'ru' ? WEEK_DAYS_RU : WEEK_DAYS_UZ)

// Composable'dan funksiyalarni olish
const { 
  getCellMergeRangeClass, 
  getCellMergeRangeText, 
  getToltipText,
  toolTipFun
} = useAttendanceCalendar(calendarDaysWithAttendance)

const isCurrentDate = (day) => {
  return dayjs(day.date).format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD')
}

const isBadgeHovered = (index) => {
  return hoveredBadgeIndex.value === index
}

const isCellLineThrough = (day) => {
  return  !!day?.attendance && day?.attendance?.type != USER_STATUS_CODES.WORKERS
}

const isAdditionalDayOffCell = (day) => {
  return false
}

const isEnterReasonCell = (day) => {
  if(day?.attendance?.type == USER_STATUS_CODES.WORKERS && day?.attendance?.violations?.length > 0 && day?.attendance?.violations?.some(violation => !violation.has_appeal)) return true
  else {
    return false
  }
}

const onHandleBodyCell = (day) => {
  const today = new Date()
  const isTheDayLargeFromToday = dayjs(day.date).isAfter(dayjs(today))
  if(day?.attendance?.type == USER_STATUS_CODES.WORKERS && !isEnterReasonCell(day) && !isTheDayLargeFromToday){
    selectedDay.value = day
    reasonProcessModalOpen.value = true
  }
}

const onHandleLateCameReasonModal = (day) => {
  lateCameReasonModalOpen.value = true
}
</script>
<template>
    <div class="flex flex-col bg-white  rounded-2xl overflow-hidden shadow-button mt-4">
        <!-- table header -->
        <div class="grid grid-cols-7">
          <!-- header cell -->
          <template v-for="day in weekDays" :key="day">
            <div class="flex items-center justify-center p-4 h-[48px] text-sm font-medium text-greyscale-500 [&:not(:nth-child(7n))]:border-r border-greyscale-200">{{ day }}</div>
          </template>
        </div>
        <!-- table body -->
        <div class="grid grid-cols-7">
          <!-- body cells -->
          <template v-for="(day, index) in calendarDaysWithAttendance" :key="index">
            <!-- cell line-through; -->
            <div
              v-if="isCellLineThrough(day)"
              class="select-none cursor-pointer flex flex-col justify-between items-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r border-greyscale-200"
              :class="{'!bg-primary-10': isCurrentDate(day),
                'hover:bg-greyscale-50': !isBadgeHovered(index)
              }"
             
            >
                <!-- number area -->
                <div 
                  class="text-base font-medium text-greyscale-900"
                  :class="[{'!text-greyscale-400': index % 7 == 5 || index % 7 == 6 }, 
                  {'!text-primary-500': isCurrentDate(day)}]"
                  >
                  {{ day.day }} 
                </div>
                <!-- type area line -->
                <div 
                  v-if="!!getCellMergeRangeClass(index)"
                  v-tooltip.top="toolTipFun(getToltipText(day.attendance, index))"
                  class="flex justify-center h-[32px] items-center hover:bg-transparent py-[6px] px-2 relative cursor-pointer text-sm text-greyscale-900 font-medium rounded-lg" 
                  :style="getCellMergeRangeClass(index)"
                  @mouseover="hoveredBadgeIndex = index"
                  @mouseout="hoveredBadgeIndex = null"
                >
                  {{ getCellMergeRangeText(day.attendance, index)}}
                </div>
            </div>
            <!-- enter reason cell -->
            <div 
              v-else-if="isEnterReasonCell(day)"
              class="flex flex-col justify-between items-center hover:bg-greyscale-50 cursor-pointer text-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r font-medium"
              @click="onHandleLateCameReasonModal(day)"
            >
              <h2 class="text-critic-500">{{ day.day }}</h2>
              <div class="flex flex-col gap-[2px] items-center">
                <template v-for="violation in day.attendance.violations" :key="violation.id">
                  <AttendanceReasonCellStatus :item="violation" />
                </template>
                <div 
                  class="flex justify-center items-center px-3 py-[6px] text-xs font-semibold rounded-[8px] w-fit"
                  :class="'bg-critic-30 border border-critic-100 text-critic-500'"
                  >
                  {{ t('no-reason-provided') }}
                </div>
              </div>
            </div>
            <!-- additional day off cell -->
            <div 
              v-else-if="!!day.attendance && isAdditionalDayOffCell(day)"
              class="flex cursor-pointer flex-col justify-between items-center text-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r text-critic-500 bg-critic-50 font-medium"
            >
              <h2>{{ day.day }}</h2>
              <p class="text-xs">
                {{ t('additional-day-off') }}
              </p>
            </div>
            <!-- cell Everythink ok -->
            <div
              v-else
              @click="onHandleBodyCell(day)"
              class="select-none cursor-pointer hover:bg-greyscale-50 flex flex-col justify-between items-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r border-greyscale-200"
              :class="{'!bg-primary-10': isCurrentDate(day)}" 
            >
                <!-- number area -->
                <div 
                  class="text-base font-medium text-greyscale-900"
                  :class="[{'!text-greyscale-400': index % 7 == 5 || index % 7 == 6 }, 
                  {'!text-primary-500': isCurrentDate(day)}]"
                  >
                  {{ day.day }} 
                </div>
                <!-- hour -->
                 <HourStatus 
                  v-if="day.workDay && !!day.attendance?.type"
                  :hours="day.attendance?.hours"
                  :full="false"
                  />
            </div>
          </template>
        </div>
    </div>
    <ReasonProcessModal  v-if="reasonProcessModalOpen" v-model="reasonProcessModalOpen" :data="selectedDay" type="double" />
    <LateCameReasonModal :key="lateCameReasonModalOpen"  v-model="lateCameReasonModalOpen" :reasonList="reasonListForSubmit" :apiCallAfterSubmit="attendanceStore.getMyAttendanceList"/>
</template>