<script setup>
// Components
import { CalendarLinearIcon, FileTextIcon, NotebookIcon, SettingsIcon } from "@/components/Icons"
import TheNavigation from "@/components/TheNavigation.vue"

const navs = [
  {
    title: 'emp-attendance',
    icon: CalendarLinearIcon,
    link: 'EmployeesAttendanceList'
  },
  // {
  //   title: 'schedule-settings',
  //   icon: SettingsIcon,
  //   link: 'WorkScheduleSettings'
  // },
  // {
  //   title: 'assign-work-schedule',
  //   icon: FileTextIcon,
  //   link: 'AssignWorkSchedule'
  // },
  // {
  //   title: 'reasons-reference',
  //   icon: NotebookIcon,
  //   link: 'AttendanceReasonsReference'
  // }
]
</script>

<template>
  <the-navigation :navs="navs" />
  <router-view />
</template>

<style scoped>

</style>
