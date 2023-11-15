<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegIncoming } from "../../stores/incoming.store"
// Components
import { DocTypeChip, StatusChip, PriorityChip } from '@/components/Chips'
// Composable
const regStore = useRegIncoming()
// Hooks
onMounted(async () => {
  await regStore.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Входящие</h1>
    </div>

    <base-data-table
      :headers="regStore.headers"
      :value="regStore.list"
    >
      <template  #priority="{ data }">
        <priority-chip :id="data.priority.id" />
      </template>

      <template  #delivery_type="{ data }">
        {{data.delivery_type.name}}
      </template>

      <template  #journal="{ data }">
        {{data.journal.name}}
      </template>

      <template  #language="{ data }">
        {{data.language.name}}
      </template>

      <template #document_type="{ data }">
        <doc-type-chip :type="data.document_type.name"/>
      </template>

      <template #status="{ data }">
        <status-chip :status="data.status"/>
      </template>

      <template #reviewers="{ data }">
        <base-avatar-group
          :items="data.reviewers"
          shape="circle"
          avatar-classes="w-8 h-8"
        />
      </template>

      <template #correspondent="{ data }">
        {{data.correspondent.name}}
      </template>

      <template #action="{ data }">
        <base-button
          color="text-primary-900"
          icon-left="AltArrowDownIcon"
          only-icon
          text
          rounded
        />
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
