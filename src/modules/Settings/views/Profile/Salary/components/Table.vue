<script setup>
// Stores
import { salaryStore } from '../../../../stores/profile/salary.store'
// Composable
const salary = salaryStore()
</script>

<template>
  <base-data-table
    :headers="salary.headers"
    :value="salary.list"
    :total-count="salary.totalCount"
    :loading="salary.listLoading"
    scroll-height="calc(100vh - 470px)"
  >
    <template #empty>
      <div
        class="w-full flex justify-center items-center rounded-lg"
        style="height: calc(100vh - 470px)"
      >
        <div class="text-center">
          <img src="/images/cloud-table-empty.svg" alt="EmptyFolder" class="block mb-5" />

          <h1 class="text-greyscale-500 font-medium text-sm">У вас нет данных</h1>
        </div>
      </div>
    </template>

    <template #salary_date="{ data }">
      <span class="text-sm text-greyscale-900">{{ data.salary_date }}</span>
    </template>

    <template #naming="{ data }">
      <span class="text-sm text-greyscale-900">{{ data.naming }}</span>
    </template>

    <template #tax="{ data }">
      <span class="text-sm text-greyscale-900">{{ data.tax }}</span>
    </template>

    <template #total_sum="{ data }">
      <span class="text-sm text-greyscale-900">{{ data.total_sum }}</span>
    </template>

    <template #on_hand="{ data }">
      <span class="text-sm text-greyscale-900">{{ data.on_hand }}</span>
    </template>
  </base-data-table>
</template>
