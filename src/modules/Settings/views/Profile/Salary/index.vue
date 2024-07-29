<script setup>
// Core
import { ref } from 'vue'
// Reactive
const dialog = ref(false)
// Components
import { ActionToolbar, ExportButton } from '@/components/Actions'
import SalaryChart from './components/Chart.vue'
import SalaryTable from './components/Table.vue'
</script>

<template>
  <div class="salary-view">
    <base-dialog
      v-model="dialog"
      label="Войти в зарплату"
      max-width="max-w-[545px]"
      blur
    >
      <template #content>
        <div class="bg-white">123</div>
      </template>
    </base-dialog>

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
