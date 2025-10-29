<script setup>
// core
import { provide, ref, watch, computed } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
// components
import HeaderToolbar from '../../components/MyAttendance/HeaderToolbar.vue';
import ActivityCard from '../../components/ActivityCard.vue';
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
provide('calendarDaysWithAttendance', calendarDaysWithAttendance)


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