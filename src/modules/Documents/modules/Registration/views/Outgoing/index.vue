<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegOutgoing } from "../../stores/outgoing.store"
// Components
import { DocTypeChip, StatusChip } from '@/components/Chips'
// Composable
const regOutgoing = useRegOutgoing()
// Hooks
onMounted(async () => {
  await regOutgoing.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Исходящие</h1>
    </div>

    <base-data-table
      :headers="regOutgoing.headers"
      :value="regOutgoing.list"
    >
      <template #correspondent="{ data }">
        {{data.correspondent.name}}
      </template>

      <template #document_type="{ data }">
        <doc-type-chip :type="data.document_type.name"/>
      </template>

      <template #status="{ data }">
        <status-chip :status="data.status"/>
      </template>

      <template #action="{ data }">
        <base-button
          color="text-critic-500"
          icon-left="TrashIcon"
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
