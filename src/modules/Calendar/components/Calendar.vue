<script setup>
// Core
import { inject } from 'vue'
import { useRoute } from 'vue-router'
// Components
import WeekCell from './WeekCell.vue'
import DaysCell from './DaysCell.vue'
// Composable
const route = useRoute()
// Macros
const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
})
// Inject
const {
  date,
  daysList,
} = inject('calendar')
</script>

<template>
  <div class="calendar-container-view flex flex-col bg-white rounded-2xl shadow-button">
    <week-cell />

    <days-cell :interval="daysList" :events="props.events" />
  </div>
</template>

<style scoped>

</style>
