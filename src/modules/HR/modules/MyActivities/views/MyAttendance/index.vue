<script setup>
// core
import { provide, ref, watch } from 'vue';
// components
import HeaderToolbar from '../../components/MyAttendance/HeaderToolbar.vue';
import ActivityCard from '../../components/ActivityCard.vue';
import { AlarmBoldIcon, AlarmTurnOffBoldIcon, CalendarDateBoldIcon, CalendarSearchBoldIcon, CheckCircleBoldIcon, TreePalmIcon } from '@/components/Icons';
// composibles
import { useCalendar } from '../../composibles/useCalendar';
// store
import { useMyAttendanceStore } from '../../store/myAttendence.store';
const attendanceStore = useMyAttendanceStore()

const { goToPrevMonth, goToNextMonth, handleMonthChange, currentDate, currentMonth, calendarDays, handleClickCurrentMonth } = useCalendar()
provide('goToPrevMonth', goToPrevMonth)
provide('goToNextMonth', goToNextMonth)
provide('handleMonthChange', handleMonthChange)
provide('currentDate', currentDate)
provide('currentMonth', currentMonth)
provide('calendarDays', calendarDays)
provide('handleClickCurrentMonth', handleClickCurrentMonth)

const activityData = ref([
    {
        id: 1,
        icon: CalendarDateBoldIcon,
        iconClass: "bg-success-500 text-white",
        title: '23 д.',
        description: 'working-days',
        toolTipInfo: {
            value: 'attendance-tooltip.working-days'
        }
    },
    {
        id: 2,
        icon: AlarmBoldIcon,
        iconClass: "bg-primary-500 text-white",
        title: '160 ч.',
        description: 'working-hours',
        toolTipInfo: {
            value: 'attendance-tooltip.working-hours'
        }
    },
    {
        id: 3,
        icon: TreePalmIcon,
        iconClass: "bg-critic-300 text-white",
        title: '8 д.',
        description: 'weekend-days',
        toolTipInfo: {
            value: 'attendance-tooltip.weekend-days'
        }
    },
    {
        id: 4,
        icon: CheckCircleBoldIcon,
        iconClass: "bg-primary-500 text-white",
        title: '56 ч.',
        description: 'worked-hours',
        toolTipInfo: {
            value: 'attendance-tooltip.worked-hours'
        }
    },
    {
        id: 5,
        icon: AlarmTurnOffBoldIcon,
        iconClass: "bg-warning-500 text-white",
        title: '48 ч.',
        description: 'absence-hours',
        toolTipInfo: {
            value: 'attendance-tooltip.absence-hours'
        }
    },
    {
        id: 6,
        icon: CalendarSearchBoldIcon,
        iconClass: "bg-critic-300 text-white",
        title: '-83 ч.',
        description: 'remaining-hours',
        toolTipInfo: {
            value: 'attendance-tooltip.remaining-hours',
            placement: "left"
        }
    }
])


watch(()=>calendarDays.value, () => {
  attendanceStore.getMyAttendanceList()
},{ immediate: true })

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