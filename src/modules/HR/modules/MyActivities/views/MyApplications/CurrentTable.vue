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
      :action-list="applicationStore.getCurrentApplicationList"
      :api-params="{ ...route.query, page_size: 15 } ?? null"
      :headers="applicationStore.currentHeaders"
      :loading="applicationStore.currentApplicationListLoading"
      :total-count="applicationStore.currentApplicationTotalCount"
      :value="applicationStore.currentApplicationList"
      scroll-height="calc(100vh - 295px)"
    >
      <template #status="{ data }">
        <status :status="data.status"/>
      </template>
    </base-data-table> 
  </div>
</template>