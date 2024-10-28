<script setup>
// Core
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import MyCalendars from './MyCalendars.vue'
import Categories from './Categories.vue'
// Composable
const route = useRoute()
const router = useRouter()
// Inject
const { date } = inject('calendar')
// Macros
const emit = defineEmits(['emit:month-change', 'emit:day-select'])
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
const daySelect = async (value) => {
  date.value = new Date(value)
  await router.replace({
    name: 'CalendarDate',
    params: {
      ...route.params,
      y: new Date(value).getFullYear(),
      m: new Date(value).getMonth(),
      d: new Date(value).getDate()
    }
  })
  emit('emit:day-select')
}
</script>

<template>
  <div class="sidebar-actions-view bg-white rounded-2xl shadow-button overflow-hidden">
    <div class="h-full pl-6 pr-5 py-3 overflow-y-auto">
      <base-calendar
        v-model="date"
        inline
        @emit:month-change="monthChange"
        @emit:day-select="daySelect"
      />

      <div class="mt-[10px] pt-3 border-t border-greyscale-200">
        <my-calendars />
      </div>

      <div class="mt-[10px] pt-3 border-t border-greyscale-200">
        <Categories />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
