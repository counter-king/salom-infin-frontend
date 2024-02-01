<script setup>
// Core
import { ref } from 'vue'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Enums
import { CALENDAR_TYPES } from '../enums'
// Reactive
const routes = ref([
  {
    title: 'День',
    link: 'Calendar',
    params: {
      type: CALENDAR_TYPES.DAYS
    }
  },
  {
    title: 'Неделя',
    link: 'Calendar',
    params: {
      type: CALENDAR_TYPES.WEEKS
    }
  },
  {
    title: 'Месяц',
    link: 'Calendar',
    params: {
      type: CALENDAR_TYPES.MONTHS
    }
  },
])
</script>

<template>
  <div class="calendar-view flex w-full">
    <div class="flex flex-col flex-1 overflow-y-auto p-6">
      <the-navigation :navs="routes" />

      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
