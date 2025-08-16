<script setup>
import { ref } from 'vue'
import { CalendarLinearIcon, FileTextIcon } from '@/components/Icons'
import TheNavigation from '@/components/TheNavigation.vue'

const navs = ref([
  {
    title: 'tests',
    icon: CalendarLinearIcon,
    link: 'TestsIndex',
  },
  {
    title: 'surveys',
    icon: FileTextIcon,
    link: 'SurveysIndex',
  },
  {
    title: 'test-constructor',
    icon: FileTextIcon,
    link: 'TestConstructorIndex',
  },
  {
    title: 'survey-constructor',
    icon: FileTextIcon,
    link: 'SurveyConstructorIndex',
  },
])
</script>

<template>
  <the-navigation :navs="navs"  />

  <router-view />
</template>

<style scoped>

</style>
