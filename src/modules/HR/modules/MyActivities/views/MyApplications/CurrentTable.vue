<script setup>
// core
import { ref, inject, watch } from 'vue'
import { useRoute} from 'vue-router'
// components
import Status from '../../components/MyAttendance/Status.vue'
import { ReasonProcessModal } from '../../components/ReasonProcessModal'
// utils
import { formatDate } from '@/utils/formatDate'
// store
import { useMyApplicationStore } from '../../store/myApplication.store.js'
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
      :action-list="applicationStore.getCurrentApplicationList"
      :api-params="{ ...route.query, page_size: 15 } ?? null"
      :headers="applicationStore.currentHeaders"
      :loading="applicationStore.currentApplicationListLoading"
      :total-count="applicationStore.currentApplicationTotalCount"
      :value="applicationStore.currentApplicationList"
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