<script setup>
// core
import { provide } from 'vue';
// components
import HeaderToolbar from '../../components/AttendanceEmployee/HeaderToolbar.vue';
// composibles
import { useCalendar } from '../../composibles/useCalendar';
// provides
const { goToPrevMonth, goToNextMonth, handleMonthChange, currentDate, currentMonth, calendarDays, handleClickCurrentMonth } = useCalendar()
provide('goToPrevMonth', goToPrevMonth)
provide('goToNextMonth', goToNextMonth)
provide('handleMonthChange', handleMonthChange)
provide('currentDate', currentDate)
provide('currentMonth', currentMonth)
provide('calendarDays', calendarDays)
provide('handleClickCurrentMonth', handleClickCurrentMonth)

</script>
<template>
    <div>
      <header-toolbar />
      <router-view />
    </div>
</template>
