<script setup>
// Core
import { onBeforeUnmount } from 'vue'
// Stores
import { useSalaryStore } from '../../stores/salary.store'
// Composable
const salaryStore = useSalaryStore()
// Components
import SalaryChart from './components/Chart.vue'
import SalaryTable from './components/Table.vue'
import SalaryDialog from './components/Dialog.vue'
// Hooks
onBeforeUnmount(() => {
  salaryStore.resetStore()
  console.log(salaryStore)
})
</script>

<template>
  <div class="salary-view">
    <salary-dialog />

    <div class="space-y-5">
      <salary-chart />

      <salary-table />
    </div>
  </div>
</template>
