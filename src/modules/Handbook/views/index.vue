<script setup>
// Components
import { ActionToolbar } from '@/components/Actions'
import { LinearTable } from '@/components/Table'
// Stores
import { useHandbookStore } from '../stores'
// Composable
const handbookStore = useHandbookStore()
</script>

<template>
  <div class="handbook-view w-full p-10 pt-7">
    <action-toolbar title="Справочник">
      <template #filters>
        <span></span>
      </template>
    </action-toolbar>

    <div class="h-[calc(100vh-200px)] rounded-2xl bg-white shadow-button p-5">
      <linear-table
        :headers="handbookStore.headers"
        :value="handbookStore.list"
        row-group-mode="subheader"
        group-rows-by="sub.dep_name"
      >
        <template #fio="{ data }">
          <span>{{ data.fio }}</span>
        </template>

        <template #position="{ data }">
          <span>{{ data.position }}</span>
        </template>

        <template #status="{ data }">
          <span>{{ data.status }}</span>
        </template>

        <template #ip_phone="{ data }">
          <span>{{ data.ip_phone }}</span>
        </template>

        <template #corp_mail="{ data }">
          <span>{{ data.corp_mail }}</span>
        </template>
      </linear-table>
    </div>
  </div>
</template>
