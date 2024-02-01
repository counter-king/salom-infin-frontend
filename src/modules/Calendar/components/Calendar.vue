<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import duration from 'dayjs/plugin/duration'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(isBetween)
dayjs.extend(duration)
dayjs.extend(calendar)
// Components
import WeekCell from './WeekCell.vue'
import DaysCell from './DaysCell.vue'
// Composable
const route = useRoute()
// Reactive
const date = ref(new Date())
const daysList = ref([])
// Methods
const daysRange = (start, end, unit) => {
  let current = start

  while (!current.isAfter(end)) {
    daysList.value.push({
      date: current.$D,
      month: current.$M,
      year: current.$y,
      day: current.$W,
      status: dayjs(date.value).month() - 1 === current.$M ? 'past' : dayjs(date.value).month() + 1 === current.$M ? 'future' : 'now',
      format: dayjs(current.$d).format('DD.MM.YYYY')
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

  console.log('daysList', daysList.value)
}
// Hooks
onMounted(() => {
  generateDays()
})
</script>

<template>
  <div class="calendar-container-view flex flex-col bg-white rounded-2xl shadow-button">
    <week-cell />

    <days-cell :interval="daysList" />
  </div>
</template>

<style scoped>

</style>
