<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegOrderInstruction } from "../../stores/orderInstruction.store"
// Components
import { DocTypeChip, StatusChip } from '@/components/Chips'
// Composable
const regOrderInstruction = useRegOrderInstruction()
// Hooks
onMounted(async () => {
  await regOrderInstruction.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Приказы и распоряжения</h1>
    </div>

    <base-data-table
      :headers="regOrderInstruction.headers"
      :value="regOrderInstruction.list"
    >

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
