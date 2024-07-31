<script setup>
// Components
import { ActionToolbar, ExportButton } from '@/components/Actions'
import SalaryChart from './components/Chart.vue'
import SalaryTable from './components/Table.vue'
import SalaryDialog from './components/Dialog.vue'
</script>

<template>
  <div class="salary-view">
    <salary-dialog />

    <action-toolbar title="Моя зарплата">
      <template #filters>
        <export-button />
      </template>
    </action-toolbar>

    <div class="space-y-5">
      <salary-chart />

      <salary-table />
    </div>
  </div>
</template>
