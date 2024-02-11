<script setup>
// Core
import { ref, provide, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
// Components
import { ActionToolbar } from '@/components/Actions'
import Calendar from '../components/Calendar.vue'
import CreateEventMenu from '../components/CreateEventMenu.vue'
import SidebarActions from '../components/SidebarActions.vue'
// Stores
import { useCalendarStore } from '../stores/calendar.store'
// Utils
import { isModelEmpty } from '@/utils'
// Enums
import { EVENT_TYPES } from '../enums'
// Composable
const route = useRoute()
const router = useRouter()
const calendarStore = useCalendarStore()
// Reactive
const currentDate = ref(new Date())
const date = ref(isModelEmpty(route.params, ['type'])
  ? new Date(
    +route.params.y,
    +route.params.m,
    +route.params.d
  ) :
  new Date()
)
const daysList = ref([])
const events = ref([
  {
    title: 'Тестового задания',
    date: '2024.02.01',
    type: EVENT_TYPES.EVENT
  },
  {
    title: 'Тестового задания 2',
    date: '2024.02.02',
    type: EVENT_TYPES.TASK
  },
  {
    title: 'Тестового задания 3',
    date: '2024.02.03',
    type: EVENT_TYPES.EVENT
  },
  {
    title: 'Тестового задания 4',
    date: '2024.02.01',
    type: EVENT_TYPES.TASK
  },
])
// Methods
const daysRange = (start, end, unit) => {
  let current = start
  daysList.value = []

  while (!current.isAfter(end)) {
    daysList.value.push({
      date: current.$D,
      month: current.$M,
      year: current.$y,
      day: current.$W,
      status: dayjs(date.value).month() - 1 === current.$M ? 'past' : dayjs(date.value).month() + 1 === current.$M ? 'future' : 'now',
      format: dayjs(current.$d).format('DD.MM.YYYY'),
      events: calendarStore.eventList.filter(event => dayjs(dayjs(event.date).format('YYYY.MM.DD')).isSame(current))
    })
    current = current.add(1, unit)
  }
}
const generateDays = () => {
  let dateInMonth = dayjs(date.value).daysInMonth()
  let startMonthDay = dayjs(date.value).startOf('month').day()
  let endMonthDay = dayjs(date.value).endOf('month').day()
  let startInterval = null
  let endInterval = null

  switch(startMonthDay) {
    case 0: // Если начало месяца начинается с воскресение
      startInterval = dayjs(date.value).date(1 - 6).format("YYYY-MM-DD")
      break
    case 1: // Если начало месяца начинается с понедельника
      startInterval = dayjs(date.value).date(1).format("YYYY-MM-DD")
      break
    default: // Остальные дни
      startInterval = dayjs(date.value).date(2 - startMonthDay).format("YYYY-MM-DD")
  }

  switch(endMonthDay) {
    case 0: // Если конец месяца начинается с воскресение
      endInterval = dayjs(date.value).date(dateInMonth).format("YYYY-MM-DD")
      break
    case 1: // Если конец месяца начинается с понедельника
      endInterval = dayjs(date.value).date(dateInMonth + 7 - endMonthDay).format("YYYY-MM-DD")
      break
    default: // Остальные дни
      endInterval = dayjs(date.value).date(dateInMonth + (7 - endMonthDay)).format("YYYY-MM-DD")
  }

  daysRange(dayjs(startInterval), dayjs(endInterval), 'day')
}
const setCalendarToday = async () => {
  date.value = currentDate.value
  await router.replace({
    name: 'CalendarDate',
    params: {
      ...route.params,
      y: dayjs(currentDate.value).year(),
      m: dayjs(currentDate.value).month(),
      d: dayjs(currentDate.value).date()
    }
  })
}
// Watch
watch(
  () => date.value,
  async () => {
    await calendarStore.actionGetList()
    generateDays()
  },
  { immediate: true }
)
// Provide
provide('calendar', {
  currentDate,
  date,
  daysList,
  generateDays
})
</script>

<template>
  <div class="calendar-view flex flex-col flex-1">
    <action-toolbar title="Календарь" storage-columns-name="asd">
      <template #title-after>
        <base-button
          color="bg-primary-0 text-primary-dark"
          border-color="border-transparent"
          label="Сегодня"
          rounded
          shadow
          type="button"
          @click="setCalendarToday"
        />
      </template>

      <template #filters>
        <span></span>
      </template>

      <template #end>
        <create-event-menu />
      </template>
    </action-toolbar>

    <div class="flex gap-6 h-[calc(100vh-245px)]">
      <calendar :events="events" class="flex-1" />

      <sidebar-actions class="w-[354px]" />
    </div>
  </div>
</template>

<style scoped>

</style>
