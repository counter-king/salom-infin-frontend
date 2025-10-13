<script setup>
// core
import { provide, ref } from 'vue';
// components
import HeaderToolbar from '../../components/MyAttendance/HeaderToolbar.vue';
import ActivityCard from '../../components/ActivityCard.vue';
import { AlarmBoldIcon, AlarmTurnOffBoldIcon, CalendarDateBoldIcon, CalendarSearchBoldIcon, CheckCircleBoldIcon, TreePalmIcon } from '@/components/Icons';
// constatns
import { activityData } from '../../constants';
// composibles
import { useCalendar } from '../../composibles/useCalendar';

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
<div class="flex flex-col">
    <!-- header-toolbar -->
    <HeaderToolbar />
    <!-- activity cards -->
    <div class="flex items-center gap-2">
        <ActivityCard v-for="activity in activityData" :key="activity.id" :data="activity" />
    </div>
    <!-- components -->
    <router-view />
</div>
</template>