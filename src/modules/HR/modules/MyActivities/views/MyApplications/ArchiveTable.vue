<script setup>
// core
import { ref, inject, watch } from 'vue'
import { useRoute} from 'vue-router'
// components
import Status from '../../components/MyAttendance/Status.vue'
// store
import { useMyApplicationStore } from '../../store/myApplication.store.js'
// composibles
const applicationStore = useMyApplicationStore()
const route = useRoute()
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
    >
      <template #current_status="{ data }">
        <status :status="data.current_status"/>
      </template>
    </base-data-table> 
  </div>
</template>