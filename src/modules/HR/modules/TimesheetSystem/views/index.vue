<script setup>
// Components
import { CalendarIcon } from "@/components/Icons"
import TheNavigation from "@/components/TheNavigation.vue"

const navs = [
  {
    title: 'timesheet-system',
    icon: CalendarIcon,
    link: 'TimesheetSystemIndex',
  }
]
</script>

<template>
  <the-navigation :navs="navs"/>
  <router-view/>
</template>

<style scoped>

</style>
