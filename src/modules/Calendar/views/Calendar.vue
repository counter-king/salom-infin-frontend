<script setup>
// Core
import { provide, ref, watch } from 'vue'
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
const startInterval = ref(null)
const endInterval = ref(null)
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
      events: []
    })
    current = current.add(1, unit)
  }
}
const generateDays = () => {
  let dateInMonth = dayjs(date.value).daysInMonth()
  let startMonthDay = dayjs(date.value).startOf('month').day()
  let endMonthDay = dayjs(date.value).endOf('month').day()

  switch(startMonthDay) {
    case 0: // Если начало месяца начинается с воскресение
      startInterval.value = dayjs(date.value).date(1 - 6).format("YYYY-MM-DD")
      break
    case 1: // Если начало месяца начинается с понедельника
      startInterval.value = dayjs(date.value).date(1).format("YYYY-MM-DD")
      break
    default: // Остальные дни
      startInterval.value = dayjs(date.value).date(2 - startMonthDay).format("YYYY-MM-DD")
  }

  switch(endMonthDay) {
    case 0: // Если конец месяца начинается с воскресение
      endInterval.value = dayjs(date.value).date(dateInMonth).format("YYYY-MM-DD")
      break
    case 1: // Если конец месяца начинается с понедельника
      endInterval.value = dayjs(date.value).date(dateInMonth + 7 - endMonthDay).format("YYYY-MM-DD")
      break
    default: // Остальные дни
      endInterval.value = dayjs(date.value).date(dateInMonth + (7 - endMonthDay)).format("YYYY-MM-DD")
  }

  daysRange(dayjs(startInterval.value), dayjs(endInterval.value), 'day')
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
    generateDays()
    await calendarStore.actionGetList({
	    start_date: startInterval.value,
	    end_date: endInterval.value,
      page_size: 50
    })
  },
  { immediate: true }
)
watch(
  () => calendarStore.eventList,
  (days) => {
    for (let day of daysList.value) {
      day.events = days.filter(event => day?.format === dayjs(event.start_date).format('DD.MM.YYYY'))
    }
  },
  { deep: true }
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
      <calendar class="flex-1" />

      <sidebar-actions class="w-[354px]" />
    </div>
  </div>
</template>

<style scoped>

</style>
