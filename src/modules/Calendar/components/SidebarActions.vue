<script setup>
// Core
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Composable
const route = useRoute()
const router = useRouter()
// Inject
const { date } = inject('calendar')
// Macros
const emit = defineEmits(['emit:month-change'])
// Methods
const monthChange = async ({ day, month, year }) => {
  date.value = new Date(year, month, day)
  await router.replace({
    name: 'CalendarDate',
    params: {
      ...route.params,
      y: year,
      m: month,
      d: day
    }
  })
	emit('emit:month-change')
}
</script>

<template>
  <div class="sidebar-actions-view bg-white rounded-2xl shadow-button overflow-hidden">
    <div class="h-full pl-6 pr-5 py-3 overflow-y-auto">
      <base-calendar
        v-model="date"
        :min-date="new Date() /* Минимальная дата сегодняшние число */"
        inline
        @emit:month-change="monthChange"
      />

      <div class="mt-3 pt-3 border-t border-greyscale-200">
        <h1>Cumque fugiat, magnam?</h1>
        <h1>Earum laudantium, sequi.</h1>
      </div>


      <div class="mt-3 pt-3 border-t border-greyscale-200">
        <h1>Dignissimos, mollitia, quis.</h1>
        <h1>Labore, libero, officiis.</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
