<script setup>
// core
import { provide, ref, watch, computed } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
// components
import HeaderToolbar from '../../components/MyAttendance/HeaderToolbar.vue';
import ActivityCard from '../../components/ActivityCard.vue';
// enums
import { KIND } from '../../enums';
// composibles
import { useCalendar } from '../../composibles/useCalendar';

// store
import { useMyAttendanceStore } from '../../store/myAttendence.store';
// composables
const { t } = useI18n()
const attendanceStore = useMyAttendanceStore()

const { goToPrevMonth, goToNextMonth, handleMonthChange, currentMonthFirstDate, currentMonth, calendarDays, handleClickCurrentMonth } = useCalendar()
provide('goToPrevMonth', goToPrevMonth)
provide('goToNextMonth', goToNextMonth)
provide('handleMonthChange', handleMonthChange)
provide('currentMonthFirstDate', currentMonthFirstDate)
provide('currentMonth', currentMonth)
provide('calendarDays', calendarDays)
provide('handleClickCurrentMonth', handleClickCurrentMonth)

const calendarDaysWithAttendance = computed(() => calendarDays.value.map(item => {
  item.attendance = attendanceStore.myAttendanceListMap.get(dayjs(item.date).format('YYYY-MM-DD'))
  return item
}))

const reasonListForSubmit = computed(() => {
  return calendarDaysWithAttendance.value
    // 1. Faqat violations bor va has_appeal: false bo'lganlarni olish
    .filter(item => 
      item.attendance?.violations?.some(violation => !violation.has_appeal)
    )
    // 2. Har bir kun uchun violations arrayini ochish
    .flatMap(item => {
      const attendance = item.attendance
      
      // Faqat has_appeal: false bo'lgan violationslarni olish
      return attendance.violations
        .filter(violation => !violation.has_appeal)
        .map(violation => {
          // Base obyekt
          const result = {
            kind: violation.kind,
            has_appeal: violation.has_appeal,
            attendance: attendance.id, // ← attendance ID
            date: attendance.date,
          }
          
          // Kind ga qarab tegishli minutlarni qo'shish
          if (violation.kind === KIND.LATE) {
            result.late_minutes = attendance.late_minutes || 0
            result.first_check_in = attendance.first_check_in
          }

          else if (violation.kind === KIND.EARLY_LEAVE) {
            result.early_leave_minutes = attendance.early_leave_minutes || 0
            result.last_check_out = attendance.last_check_out
          }

          else if (violation.kind === KIND.MISSED_CHECKOUT) {
            result.first_check_in = attendance.first_check_in
          }

          else if (violation.kind === KIND.MISSED_CHECKIN) {
            result.last_check_out = attendance.last_check_out
          }
          else if (violation.kind === KIND.ABSENT) {
            result.date = attendance.date
          }
          
          return result
        })
    })
})

provide('calendarDaysWithAttendance', calendarDaysWithAttendance)
provide('reasonListForSubmit', reasonListForSubmit)

watch(()=>currentMonthFirstDate.value, async () => {
    attendanceStore.getMyAttendanceList({ start_date: dayjs(currentMonthFirstDate.value).format('YYYY-MM-DD'), end_date: dayjs(currentMonthFirstDate.value).endOf('month').format('YYYY-MM-DD') })
    attendanceStore.getMyAttendanceSummary({ start_date: dayjs(currentMonthFirstDate.value).format('YYYY-MM-DD'), end_date: dayjs(currentMonthFirstDate.value).endOf('month').format('YYYY-MM-DD') })
}, { immediate: true })

</script>           
<template>
<div class="flex flex-col">
    <!-- header-toolbar -->
    <HeaderToolbar />
    <!-- activity cards -->
    <div class="flex items-center gap-2">
        <ActivityCard v-for="statistic in attendanceStore.myStatistics" :key="statistic.id" :data="statistic" />
    </div>
    <!-- components -->
    <router-view />
</div>
</template>