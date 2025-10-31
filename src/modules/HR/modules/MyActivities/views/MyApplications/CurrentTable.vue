<script setup>
// core
import { ref, inject, watch, onMounted } from 'vue'
import { useRoute} from 'vue-router'
import dayjs from 'dayjs'
// components
import Status from '../../components/MyAttendance/Status.vue'
import { ReasonProcessModal } from '../../components/ReasonProcessModal'
import ExplanationReasonStatus from '../../components/ExplanationReasonStatus.vue'
import AttendanceExceptionsStatus from '../../components/AttendanceExceptionsStatus.vue'

// utils
import { formatDate, formatTimeDate } from '@/utils/formatDate'
// store
import { useAttendanceExpectionsStore } from '../../store/attendanceExceptions.store.js'
import { useMyApplicationStore } from '../../store/myApplication.store.js'
// enums
import { ATTENDANCE_EXCEPTION_STATUS } from '../../enums'

// composibles
const myApplicationStore = useMyApplicationStore()

const route = useRoute()
// reactives
const reasonProcessModalOpen = ref(false)
const selectedDay = ref({})
const onClickRow = (day) => {
  selectedDay.value = day
  reasonProcessModalOpen.value = true
}

</script>
<template>
  <div class="mt-4">
    <base-data-table
      :action-list="myApplicationStore.getAttendanceExceptionsList"
      :api-params="{ ...route.query, status: ATTENDANCE_EXCEPTION_STATUS.PENDING }"
      :headers="myApplicationStore.currentHeaders"
      :loading="myApplicationStore.attendanceExpectionsListLoading"
      :total-count="myApplicationStore.attendanceExpectionsListTotalCount"
      :value="myApplicationStore.attendanceExpectionsList"
      scroll-height="calc(100vh - 295px)"
      @emit:row-click="onClickRow"
    >
      <template #date="{ data }">
        <div class="text-sm font-medium text-greyscale-900">
          {{ formatDate(data?.attendance?.date) }}
        </div>
      </template>
      <template #kind="{ data }">
        <ExplanationReasonStatus :status="data.kind"/>
      </template>
      <template #reason="{ data }">
        <div class="text-sm font-medium text-greyscale-900"> {{ data.reason.name }}</div>
      </template>
      <template #created_date="{ data }">
        <div class="text-sm font-medium text-greyscale-900"> {{ formatTimeDate(data.created_date) }}</div>
      </template>
      <template #status="{ data }">
        <AttendanceExceptionsStatus :status="data.status"/>
      </template>
    </base-data-table> 
  </div>
  <ReasonProcessModal v-model="reasonProcessModalOpen" :key="reasonProcessModalOpen" :data="selectedDay" />
</template>