<script setup>
import { ref } from 'vue'
import { CalendarLinearIcon, SettingsIcon} from "@/components/Icons";
import TheNavigation from '@/components/TheNavigation.vue'

const navs = ref([
  {
    title: 'tests',
    icon: CalendarLinearIcon,
    link: 'TestsIndex',
  },
  {
    title: 'surveys',
    icon: SettingsIcon,
    link: 'SurveyIndex',
  }
])
</script>

<template>
  <the-navigation :navs="navs"  />

  <router-view />
</template>

<style scoped>

</style>
