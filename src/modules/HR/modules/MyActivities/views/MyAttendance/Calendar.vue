<script setup>
// core
import { computed, ref, inject, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
// components
import HourStatus from '../../components/HourStatus.vue';
import AttendanceStatus from '../../components/AttendanceStatus.vue';
import AttendanceProccessStatus from '../../components/AttendanceProccessStatus.vue';
import { ReasonProcessModal } from '../../components/ReasonProcessModal';
// enums../../components/ReasonProcessModal
import { WEEK_DAYS_RU, WEEK_DAYS_UZ } from '../../enums';
// constants
import { ATTENDANCE_TYPE, ATTENDANCE_TYPE_TITLES } from '../../enums';
// store
import { useMyAttendanceStore } from '../../store/myAttendence.store';

// composables
const { t, locale } = useI18n()
const attendanceStore = useMyAttendanceStore()
// injects
const calendarDays = inject('calendarDays')
// reactives
const reasonProcessModalOpen = ref(false)
const hoveredBadgeIndex = ref(null)
const selectedDate = ref("")
const weekDays = computed(() => locale.value === 'ru' ? WEEK_DAYS_RU : WEEK_DAYS_UZ)
const calendarDaysWithAttendance = computed(() => calendarDays.value.map(item => {
  item.attendance = attendanceStore.myAttendanceListMap.get(dayjs(item.date).format('DD-MM-YYYY')) || { type: "NO_DATA", hours: 0 }
  return item
}))

// methods
const getCellMergeRangeClass = (index) => {
  const currentValue = calendarDaysWithAttendance.value[index]
  const startIndex = index
  let endIndex = index
  if(currentValue.attendance.type == ATTENDANCE_TYPE.WORK_DAY || !currentValue?.workDay) return '';
  const previousValue = calendarDaysWithAttendance.value[index - 1]  

  if(previousValue.attendance.type == currentValue.attendance.type) return '';
  else {
    for(let i = startIndex + 1; i < calendarDaysWithAttendance.value.length; i++) {
      if(calendarDaysWithAttendance.value[i].attendance.type == currentValue.attendance.type && calendarDaysWithAttendance.value[i]?.workDay ) {
        endIndex = i
      }
      else {
        break
      }
    }
  }
  
  const IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType = 
    !calendarDaysWithAttendance.value[endIndex + 1]?.workDay 
    && !calendarDaysWithAttendance.value[endIndex + 2]?.workDay 
    && calendarDaysWithAttendance.value[endIndex + 3]?.attendance?.type == currentValue.attendance.type
  
  const isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameType = 
    !calendarDaysWithAttendance.value[startIndex - 1]?.workDay 
    && !calendarDaysWithAttendance.value[startIndex - 2]?.workDay 
    && calendarDaysWithAttendance.value[startIndex - 3]?.attendance?.type == currentValue.attendance.type
  
  const IsBothCodition =  IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType && isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameType
  let inlineStyle = {}
  // if next day is saturyday or sunday after end index day is not work day and after two day next day has the same type
  if(IsBothCodition){
    const width = 100*(endIndex - startIndex + 1)
      const extraWidth = 32*(endIndex - startIndex) + 36
      const left = 50*(endIndex - startIndex)
      const extraLeft = 16*(endIndex - startIndex) + 3
      const getMatchStyleForType = ()=> {
        switch(currentValue.attendance.type) {
          case ATTENDANCE_TYPE.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.WITHOUT_PAY: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.SICK_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()
  }
  else if(IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType){
      const width = 100*(endIndex - startIndex + 1)
      const extraWidth = 32*(endIndex - startIndex) + 20 
      const left = 50*(endIndex - startIndex)
      const extraLeft = 16*(endIndex - startIndex) + 10

      const getMatchStyleForType = ()=> {
        switch(currentValue.attendance.type) {
          case ATTENDANCE_TYPE.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.WITHOUT_PAY: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.SICK_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px'
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()

  } else if(isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameType) {
      const width = 100*(endIndex - startIndex + 1)
      const extraWidth = 32*(endIndex - startIndex) + 24
      const left = 50*(endIndex - startIndex)
      const extraLeft = 16*(endIndex - startIndex) - 8
      const getMatchStyleForType = ()=> {
        switch(currentValue.attendance.type) {
          case ATTENDANCE_TYPE.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeftWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.WITHOUT_PAY: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeftWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.SICK_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeftWidth: '0px',
            }
          }
          case ATTENDANCE_TYPE.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeftWidth: '0px',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()

  } else {
      const width = 100*(endIndex - startIndex + 1)
      const extraWidth = 32*(endIndex - startIndex) 
      const left = 50*(endIndex - startIndex)
      const extraLeft = 16*(endIndex - startIndex)

      const getMatchStyleForType = ()=> {
        switch(currentValue.attendance.type) {
          case ATTENDANCE_TYPE.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
            }
          }
          case ATTENDANCE_TYPE.WITHOUT_PAY: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
            }
          }
          case ATTENDANCE_TYPE.SICK_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
            }
          }
          case ATTENDANCE_TYPE.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()
  } 

  return inlineStyle
}

const getCellMergeRangeText = (type, index) => {
  const currentValue = calendarDaysWithAttendance.value[index]
  const previousValue = calendarDaysWithAttendance.value[index - 1]
  if(previousValue?.attendance?.type == currentValue?.attendance?.type) return '';

  return ATTENDANCE_TYPE_TITLES[type]
}

const getToltipText = (type, index) => {
  const currentValue = calendarDaysWithAttendance.value[index]
  const startIndex = index
  let endIndex = index
  let startIndexContinue = index
  let endIndexContinue = index

  // Find the end of the current continuous period
  for(let i = startIndex + 1; i < calendarDaysWithAttendance.value.length; i++) {
    if(calendarDaysWithAttendance.value[i].attendance.type == currentValue.attendance.type && calendarDaysWithAttendance.value[i]?.workDay ) {
      endIndex = i
    }
    else {
      break
    }
  }

  const IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType = 
    !calendarDaysWithAttendance.value[endIndex + 1]?.workDay 
    && !calendarDaysWithAttendance.value[endIndex + 2]?.workDay 
    && calendarDaysWithAttendance.value[endIndex + 3]?.attendance?.type == currentValue.attendance.type

  const isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameType = 
    !calendarDaysWithAttendance.value[startIndex - 1]?.workDay 
    && !calendarDaysWithAttendance.value[startIndex - 2]?.workDay 
    && calendarDaysWithAttendance.value[startIndex - 3]?.attendance?.type == currentValue.attendance.type

  // Handle case where there are weekend days before the current period
  if(isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameType){
    startIndexContinue = startIndex - 3
    endIndexContinue = endIndex

    // Find the actual start of the continuous period
    for(let i = startIndexContinue - 1; i >= 0; i--) {
      if(calendarDaysWithAttendance.value[i].attendance.type == currentValue.attendance.type && calendarDaysWithAttendance.value[i]?.workDay ) {
        startIndexContinue = i
      }
      else {
        break
      }
    }
  }

  // Handle case where there are weekend days after the current period
  if(IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType){
    startIndexContinue = startIndex
    endIndexContinue = endIndex + 3

    // Find the actual end of the continuous period
    for(let i = endIndexContinue + 1; i < calendarDaysWithAttendance.value.length; i++) {
      if(calendarDaysWithAttendance.value[i].attendance.type == currentValue.attendance.type && calendarDaysWithAttendance.value[i]?.workDay ) {
        endIndexContinue = i
      }
      else {
        break
      }
    }
  }

  // Calculate the total number of days including weekends
  const totalDays = endIndexContinue - startIndexContinue + 1
  const workDays = endIndex - startIndex + 1

  const getTitle = (start)=> {
    return `${calendarDaysWithAttendance.value[startIndex].day} - ${calendarDaysWithAttendance.value[endIndex].day}, ${dayjs(calendarDaysWithAttendance.value[startIndex].date).locale(locale.value).format('MMMM')} (${workDays} ${t('day')})`
  }
  if(type == ATTENDANCE_TYPE.LABOR_LEAVE) {
    const startDate = calendarDaysWithAttendance.value[startIndexContinue]
    const endDate = calendarDaysWithAttendance.value[endIndexContinue]
    
    return { 
      title: `${startDate.day} - ${endDate.day}, ${dayjs(startDate.date).locale(locale.value).format('MMMM')} (${totalDays} ${t('day')})`, 
      description: ATTENDANCE_TYPE_TITLES[type] 
    }
  }
  else if(type == ATTENDANCE_TYPE.SICK_LEAVE) {
    return { 
      title: `${calendarDaysWithAttendance.value[startIndex].day} - ${calendarDaysWithAttendance.value[endIndex].day}, ${dayjs(calendarDaysWithAttendance.value[startIndex].date).locale(locale.value).format('MMMM')} (${workDays} ${t('day')})`, 
      description: ATTENDANCE_TYPE_TITLES[type] 
    }
  }
  else if(type == ATTENDANCE_TYPE.WITHOUT_PAY) {
    return { 
      title: `${calendarDaysWithAttendance.value[startIndex].day} - ${calendarDaysWithAttendance.value[endIndex].day}, ${dayjs(calendarDaysWithAttendance.value[startIndex].date).locale(locale.value).format('MMMM')} (${workDays} ${t('day')})`, 
      description: ATTENDANCE_TYPE_TITLES[type] 
    }
  }
  else if(type == ATTENDANCE_TYPE.BUSINESS_TRIP) {
    return { 
      title: `${calendarDaysWithAttendance.value[startIndex].day} - ${calendarDaysWithAttendance.value[endIndex].day}, ${dayjs(calendarDaysWithAttendance.value[startIndex].date).locale(locale.value).format('MMMM')} (${workDays} ${t('day')})`, 
      description: ATTENDANCE_TYPE_TITLES[type] 
    }
  }
  else {
    return { 
      title: "test", 
      description: "test" 
    }
  }
}

const toolTipFun = (data) => {
  return {
    value: `<div class="flex flex-col gap-1">
              <p class="text-sm text-white">${ data?.title }</p>
              <p class="text-sm text-white">${ data.description && t(data.description) }</p>
            </div>`,
    pt: {
      arrow: {
        class: '!text-greyscale-900 !bottom-[4px]'
      },
      text: '!px-3 !py-2 !rounded-[12px] !bg-greyscale-900 !text-white !text-sm !w-max relative top-[-4px] !w-fit',
    },
    escape: true,
    autoHide: false
  }
}

const isCurrentDate = (date) => {
  return new Date().getDate() == date
}

const isNotWorkDay = (attendance) => {
  return ![ATTENDANCE_TYPE.NO_DATA, ATTENDANCE_TYPE.WORK_DAY].includes(attendance?.attendance?.type) 
}

const isLate = (data) => {
  return data?.hours > 9
}

const isBadgeHovered = (index) => {
  return hoveredBadgeIndex.value === index
}

const onHandleBodyCell = (day) => {
  if(day.workDay){
    selectedDate.value = dayjs(day.date).format('D-MMMM, YYYY [г.]')
    reasonProcessModalOpen.value = true
  }
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
          <template v-for="(day, index) in calendarDaysWithAttendance" :key="index">
            <!-- body cell -->   
            <div
              v-if="day.attendance.type != ATTENDANCE_TYPE.ADDITIONAL_DAY_OFF && day.attendance.type != ATTENDANCE_TYPE.LATE || !day.workDay"
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
                  v-if="isNotWorkDay(day) && day?.workDay && !!getCellMergeRangeClass(index)"
                  v-tooltip.top="toolTipFun(getToltipText(day.attendance.type, index))"
                  class="flex justify-center h-[32px] items-center hover:bg-transparent py-[6px] px-2 relative cursor-pointer text-sm text-greyscale-900 font-medium rounded-lg" 
                  :style="getCellMergeRangeClass(index)"
                  @mouseover="hoveredBadgeIndex = index"
                  @mouseout="hoveredBadgeIndex = null"
                >
                  {{ t(getCellMergeRangeText(day.attendance.type, index))}}
                </div>
                <!-- late and reason -->
                <div v-else-if="isLate(day.attendance)" class="flex justify-center items-center py-[6px] px-[6px] rounded-lg bg-success-100 text-xs font-semibold text-greyscale-900">
                   {{ day.attendance?.hours }} ч.
                </div>
                <!-- hour -->
                 <HourStatus 
                  v-else-if="day.workDay" 
                  :hour="day.attendance.hours"
                  :full="false"
                  />
            </div>
            <!-- lating cell -->
            <div 
              v-else-if="day.attendance.type == ATTENDANCE_TYPE.LATE"
              class="flex flex-col justify-between hover:bg-greyscale-50 cursor-pointer items-center text-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r font-medium"
            >
              <h2 class="text-critic-500">{{ day.day }}</h2>
              <div class="flex flex-col gap-[10px]">
                <AttendanceStatus :item="day.attendance" />
                <AttendanceProccessStatus :status="day.attendance.type" />
              </div>
            </div>
            <!-- additional day off cell -->
            <div 
              v-else
              class="flex cursor-pointer flex-col justify-between items-center text-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r text-critic-500 bg-critic-50 font-medium"
            >
              <h2>{{ day.day }}</h2>
              <p class="text-xs">
                {{ t('additional-day-off') }}
              </p>
            </div>
          </template>
        </div>
    </div>
    <ReasonProcessModal v-model="reasonProcessModalOpen" :label="selectedDate" />
</template>