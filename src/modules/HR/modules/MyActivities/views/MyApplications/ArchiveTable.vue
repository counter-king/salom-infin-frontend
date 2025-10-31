<script setup>
// core
import { ref, inject, watch, onMounted } from 'vue'
import { useRoute} from 'vue-router'
import dayjs from 'dayjs'
// components
import Status from '../../components/MyAttendance/Status.vue'
import { ReasonProcessModal } from '../../components/ReasonProcessModal'
// utils
import { formatDate } from '@/utils/formatDate'
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
const selectedDate = ref("")

const onClickRow = (day) => {
  selectedDate.value = dayjs(day.date).format(locale.value === 'ru' ? 'D-MMMM, YYYY [г.]' : 'D-MMMM, YYYY [y.]')
  reasonProcessModalOpen.value = true
}


</script>
<template>
  <div class="mt-4">
    <base-data-table
      :action-list="myApplicationStore.getAttendanceExceptionsList"
      :api-params="{ ...route.query, status: `${ATTENDANCE_EXCEPTION_STATUS.APPROVED},${ATTENDANCE_EXCEPTION_STATUS.REJECTED}`  }"
      :headers="myApplicationStore.archiveHeaders"
      :loading="myApplicationStore.attendanceExpectionsListLoading"
      :total-count="myApplicationStore.attendanceExpectionsListTotalCount"
      :value="myApplicationStore.attendanceExpectionsList"
      scroll-height="calc(100vh - 295px)"
      @emit:row-click="onClickRow"
    >
      <template #status="{ data }">
        <status :status="data.status"/>
      </template>
    </base-data-table> 
  </div>
  <ReasonProcessModal v-model="reasonProcessModalOpen" :label="selectedDate" />
</template>