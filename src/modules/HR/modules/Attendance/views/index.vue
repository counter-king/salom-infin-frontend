<script setup>
// Components
import { CalendarLinearIcon, SettingsIcon } from "@/components/Icons"
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
  // }
]
</script>

<template>
  <the-navigation :navs="navs" />
  <router-view />
</template>

<style scoped>

</style>
