<script setup>
// core
import { ref, inject, watch } from 'vue'
import { useRoute} from 'vue-router'
// components
import Status from '../../components/MyAttendance/Status.vue'
import { ReasonProcessModal } from '../../components/ReasonProcessModal'
// store
import { useMyApplicationStore } from '../../store/myApplication.store.js'
// utils
import { formatDate } from '@/utils/formatDate'
// composibles
const applicationStore = useMyApplicationStore()
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
      :action-list="applicationStore.getArchiveApplicationList"
      :api-params="{ ...route.query, page_size: 15 } ?? null"
      :headers="applicationStore.archiveHeaders"
      :loading="applicationStore.archiveApplicationListLoading"
      :total-count="applicationStore.archiveApplicationTotalCount"
      :value="applicationStore.archiveApplicationList"
      scroll-height="calc(100vh - 295px)"
      @emit:row-click="onClickRow"
    >
      <template #current_status="{ data }">
        <status :status="data.current_status"/>
      </template>
    </base-data-table> 
  </div>
  <ReasonProcessModal v-model="reasonProcessModalOpen" :label="selectedDate" />
</template>