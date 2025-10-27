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
import { CHECK_IN_STATUS, CHECK_OUT_STATUS, WEEK_DAYS_RU, WEEK_DAYS_UZ,  } from '../../enums';
import { USER_STATUS_CODES } from '@/enums';
// store
import { useMyAttendanceStore } from '../../store/myAttendence.store';
// composables
import { useAttendanceCalendar } from '../../composibles/useAttendanceCalendar';
// composables
const { t, locale } = useI18n()
const attendanceStore = useMyAttendanceStore()
// injects
const calendarDaysWithAttendance = inject('calendarDaysWithAttendance')
// reactives
const reasonProcessModalOpen = ref(false)
const lateCameReasonModalOpen = ref(false)
const hoveredBadgeIndex = ref(null)
const selectedDate = ref("")
const weekDays = computed(() => locale.value === 'ru' ? WEEK_DAYS_RU : WEEK_DAYS_UZ)

// Composable'dan funksiyalarni olish
const { 
  getCellMergeRangeClass, 
  getCellMergeRangeText, 
  getToltipText,
  toolTipFun
} = useAttendanceCalendar(calendarDaysWithAttendance)

const isCurrentDate = (date) => {
  return new Date().getDate() == date
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
  if((CHECK_IN_STATUS.LATE_ARRIVAL == day?.attendance?.check_in_status 
    || CHECK_OUT_STATUS.EARLY_DEPARTURE == day?.attendance?.check_out_status 
    || CHECK_IN_STATUS.NO_ENTRY_MARKED == day?.attendance?.check_in_status 
    || CHECK_OUT_STATUS.NO_EXIT_MARKED == day?.attendance?.check_out_status 
    || CHECK_IN_STATUS.NOT_CAME == day?.attendance?.check_in_status 
    || CHECK_OUT_STATUS.NOT_CAME == day?.attendance?.check_out_status
    ) && day?.workDay && !day?.attendance?.has_reason ) return true
  else {
    return false
  }
}

const onHandleBodyCell = (day) => {
  if(day.workDay){
    selectedDate.value = dayjs(day.date).format('D-MMMM, YYYY [г.]')
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
              @click="onHandleBodyCell(day)"
              class="select-none cursor-pointer flex flex-col justify-between items-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r border-greyscale-200"
              :class="{'!bg-primary-10': isCurrentDate(day.day),
                'hover:bg-greyscale-50': !isBadgeHovered(index)
              }"
             
            >
                <!-- number area -->
                <div 
                  class="text-base font-medium text-greyscale-900"
                  :class="[{'!text-greyscale-400': index % 7 == 5 || index % 7 == 6 }, 
                  {'!text-primary-500': isCurrentDate(day.day)}]"
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
              v-else-if="!!day.attendance && isEnterReasonCell(day)"
              class="flex flex-col justify-between hover:bg-greyscale-50 cursor-pointer items-center text-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r font-medium"
              @click="onHandleLateCameReasonModal(day)"
            >
              <h2 class="text-critic-500">{{ day.day }}</h2>
              <div class="flex flex-col gap-[10px]">
                <AttendanceReasonCellStatus :data="day.attendance" />
                <AttendanceProccessStatus :status="day.attendance.type" />
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
              class="select-none cursor-pointer flex flex-col justify-between items-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r border-greyscale-200"
              :class="{'!bg-primary-10': isCurrentDate(day.day)}" 
            >
                <!-- number area -->
                <div 
                  class="text-base font-medium text-greyscale-900"
                  :class="[{'!text-greyscale-400': index % 7 == 5 || index % 7 == 6 }, 
                  {'!text-primary-500': isCurrentDate(day.day)}]"
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
    <ReasonProcessModal v-model="reasonProcessModalOpen" :label="selectedDate" />
    <LateCameReasonModal v-model="lateCameReasonModalOpen" />
</template>