<script setup>
// Core
import { ref } from 'vue'
// Components
import { CardTable } from '@/components/Table'
// Reactive
const header = ref([
  {
    field: 'user'
  },
  {
    field: 'action'
  },
])
const list = ref([
  {
    user: 'uploaded'
  },
  {
    user: 'deleted'
  },
  {
    user: 'forward'
  },
  {
    user: 'done'
  },
])
</script>

<template>
  <div class="layout-history-view p-6 pt-4">
    <card-table
      :headers="header"
      :value="list"
      :shadow="false"
      tableClass="border-spacing-y-2"
      body-cell-class="bg-greyscale-50"
      paginator-root-class="bg-greyscale-50"
    >
      <template #user="{ data }">
        <div class="flex">
          <base-avatar
            :action-chip-type="data.user"
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            shape="circle"
            avatar-classes="w-8 h-8"
          />
        </div>
      </template>
    </card-table>
  </div>
</template>

<style scoped>

</style>
