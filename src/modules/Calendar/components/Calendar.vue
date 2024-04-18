<script setup>
// Core
import { inject } from 'vue'
import { useRoute } from 'vue-router'
// Components
import WeekCell from './WeekCell.vue'
import DaysCell from './DaysCell.vue'
// Utils
import { CALENDAR_TYPES } from '../enums'
// Composable
const route = useRoute()
// Macros
const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: CALENDAR_TYPES.MONTHS,
    validator(value) {
      return Object.values(CALENDAR_TYPES).includes(value)
    }
  }
})
// Inject
const {
  date,
  daysList,
} = inject('calendar')
</script>

<template>
  <div class="calendar-container-view flex flex-col bg-white rounded-2xl shadow-button overflow-hidden">
    <week-cell :type="props.type" />

    <days-cell
      :interval="daysList"
      :events="props.events"
      :type="props.type"
    />
  </div>
</template>

<style scoped>

</style>
