<script setup>
// core
import { ref, inject, watch } from 'vue'
import { useRoute} from 'vue-router'
// components
import Status from '../../components/MyAttendance/Status.vue'
// store
// constants
// utils
// store
import { useMyAttendanceStore } from '../../stores/myAttendance.store.js'
// composibles
const attendanceStore = useMyAttendanceStore()
// inject
const calendarDays = inject('calendarDays')

watch(()=>calendarDays.value, () => {
    // console.log(calendarDays.value)
},{ immediate: true })

const route = useRoute()
</script>
<template>
  <div class="mt-4">
    <base-data-table
      :action-list="attendanceStore.actionGetMyAttendanceList"
      :api-params="{ ...route.query, page_size: 15 } ?? null"
      :headers="attendanceStore.headers"
      :loading="attendanceStore.myAttendanceListLoading"
      :total-count="attendanceStore.myAttendanceTotalCount"
      :value="[{
        date: '2025-05-15',
        week_days: 'Понедельник',
        status: {
          id: 1,
          name: 'Трудовой отпуск'
        }
      },
      {
        date: '2025-05-15',
        week_days: 'Понедельник',
        status: {
          id: 2,
          name: 'Трудовой отпуск'
        }
      },
      {
        date: '2025-05-15',
        week_days: 'Понедельник',
        status: {
          id: 3,
          name: 'Трудовой отпуск'
        }
      },
      {
        date: '2025-05-15',
        week_days: 'Понедельник',
        status: {
          id: 4,
          name: '8 час'
        }
      },
      ]"
      scroll-height="calc(100vh - 295px)"
    >
      <template #status="{ data }">
        <status :status="data.status"/>
      </template>
    </base-data-table> 
  </div>
</template>