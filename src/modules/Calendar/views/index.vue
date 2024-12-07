<script setup>
// Core
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import TheFooter from '@/components/TheFooter.vue';

// Enums
import { CALENDAR_TYPES } from '../enums'
// Composable
const { t, locale } = useI18n()
// Reactive
const routes = ref([])
// Watch
watch(
  () => locale.value,
  () => {
    routes.value = [
      {
        title: t('day'),
        link: 'Calendar',
        params: {
          type: CALENDAR_TYPES.DAYS
        }
      },
      {
        title: t('week'),
        link: 'Calendar',
        params: {
          type: CALENDAR_TYPES.WEEKS
        }
      },
      {
        title: t('month'),
        link: 'Calendar',
        params: {
          type: CALENDAR_TYPES.MONTHS
        }
      },
    ]
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="calendar-view flex w-full">
    <div class="flex flex-col flex-1 overflow-y-auto p-6">
      <the-navigation
        :navs="routes"
        route-include-params="type"
      />

      <router-view />
      <the-footer/>
    </div>
  </div>
</template>

<style scoped>

</style>
