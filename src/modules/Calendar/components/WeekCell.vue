<script setup>
// Core
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
// Components
import { AltArrowLeftIcon, AltArrowRightIcon } from '@/components/Icons'
// Enums
import { CALENDAR_TYPES, WEEK_DAYS } from '../enums'
// Macros
const props = defineProps({
  type: {
    type: String,
    default: CALENDAR_TYPES.MONTHS,
    validator(value) {
      return Object.values(CALENDAR_TYPES).includes(value)
    }
  }
})
// Inject
const { date } = inject('calendar')
// Computed
const route = useRoute()
const router = useRouter()
const dateCopy = computed(() => new Date(
  date.value.getFullYear(),
  date.value.getMonth(),
  date.value.getDate(),
  8,
  0,
  0
))
const firstDateOfWeek = computed(() => dateCopy.value.getDate() - dateCopy.value.getDay() + 1)
const beginOfWeek = computed(() => new Date(dateCopy.value.setDate(firstDateOfWeek.value)))
const weekInterval = computed(() => {
  return [...Array(7).keys()].map(week => {
    return {
      index: week,
      date: dayjs(beginOfWeek.value).add(week, 'day'),
      isDateCurrent: date.value.getDate() === dayjs(beginOfWeek.value).add(week, 'day').get('date')
    }
  })
})
const gridClass = computed(() => {
  return {
    'grid-header-days grid-cols-[90px_1fr]': props.type === CALENDAR_TYPES.DAYS,
    'grid-header-month grid-cols-7': props.type === CALENDAR_TYPES.MONTHS,
    'grid-header-week grid-cols-[90px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]': props.type === CALENDAR_TYPES.WEEKS
  }
})
// Methods
const nextWeek = async () => {
  let next = dayjs(date.value).add(1, 'week')
  await router.replace({
    name: 'CalendarDate',
    params: {
      ...route.params,
      y: next.$y,
      m: next.$M,
      d: next.$D
    }
  })
}
const prevWeek = async () => {
  let next = dayjs(date.value).add(-1, 'week')
  await router.replace({
    name: 'CalendarDate',
    params: {
      ...route.params,
      y: next.$y,
      m: next.$M,
      d: next.$D
    }
  })
}
</script>

<template>
  <div class="grid" :class="gridClass">
    <template v-if="props.type === CALENDAR_TYPES.DAYS">
	    <div class="flex items-center justify-center gap-2 h-[88px] border-r border-greyscale-200"></div>

	    <div class="flex items-center px-3">
		    <h1 class="font-bold text-lg text-primary-900 capitalize">
          {{ dayjs(date).locale('ru').format('D-MMMM, YYYY') }}
          <span class="lowercase">год</span>
        </h1>
	    </div>
    </template>

    <template v-else-if="props.type === CALENDAR_TYPES.WEEKS">
      <div class="flex items-center justify-center gap-2 h-[88px] border-r border-greyscale-200">
        <div
          v-tooltip.top="{
            value: `<h4 class='text-xs text-white -my-1'>Назад</h4>`,
            escape: true,
            autoHide: false
          }"
          @click="prevWeek"
        >
          <base-iconify
            :icon="AltArrowLeftIcon"
            class="text-gray-2 cursor-pointer"
          ></base-iconify>
        </div>

        <div
          v-tooltip.top="{
            value: `<h4 class='text-xs text-white -my-1'>Вперед</h4>`,
            escape: true,
            autoHide: false
          }"
          @click="nextWeek"
        >
          <base-iconify
            :icon="AltArrowRightIcon"
            class="text-gray-2 cursor-pointer"
          ></base-iconify>
        </div>
      </div>

      <template v-for="week in weekInterval">
        <div class="flex flex-col items-center justify-center h-100 [&:not(:last-child)]:border-r border-greyscale-200">
          <div
            class="flex flex-col items-center justify-center px-2 py-2 rounded-xl"
            :class="{ 'bg-primary-500': week.isDateCurrent }"
          >
            <span
              class="text-xl font-semibold text-primary-900"
              :class="{ 'text-white': week.isDateCurrent }"
            >
              {{ dayjs(week.date).format('D') }}
            </span>
            <span
              class="text-sm font-medium capitalize text-gray-2"
              :class="{ 'text-white': week.isDateCurrent }"
            >
              {{ dayjs(week.date).locale(ru).format('dd') }}
            </span>
          </div>
        </div>
      </template>
    </template>

    <template v-else>
      <template v-for="week in WEEK_DAYS">
        <div class="flex items-center justify-center h-16 [&:not(:last-child)]:border-r border-greyscale-200">
          <span class="text-sm font-medium text-gray-2">{{ week }}</span>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
