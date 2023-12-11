<script setup>
// Core
import { ref, unref, onMounted } from 'vue'
// Store
import { useAssignmentStore } from '../../stores/assignment.store'
// Components
import { DocTypeChip, StatusChip, PriorityChip } from '@/components/Chips'
// Utils
import { BOXES_ASSIGNMENT_COLUMNS } from '../../constants'
// Composable
const assignmentStore = useAssignmentStore()
// Hooks
onMounted(async () => {
  await assignmentStore.actionAssignmentList()
})
</script>

<template>
  <div class="incoming-view">
    <base-data-table
      :headers="assignmentStore.headers"
      :value="assignmentStore.list"
      :loading="assignmentStore.listLoading"
      :storage-columns-name="BOXES_ASSIGNMENT_COLUMNS"
      expandable
    >
      <template #document.priority="{ data }">
        <priority-chip :id="data.document.priority?.id" />
      </template>

      <template #document.title="{ data }">
        {{ data.document.title }}
      </template>

      <template #document.document_type.name="{ data }">
        {{ data.document.document_type?.name }}
      </template>

      <template #document.delivery_type.name="{ data }">
        {{ data.document.delivery_type?.name }}
      </template>

      <template #document.description="{ data }">
        {{ data.document.description }}
      </template>

      <template #document.journal.name="{ data }">
        {{ data.document.journal?.name }}
      </template>

      <template #document.language.name="{ data }">
        {{ data.document.language?.name }}
      </template>

      <template #document.number_of_papers="{ data }">
        {{ data.document.number_of_papers }}
      </template>

      <template #document.outgoing_date="{ data }">
        {{ data.document.outgoing_date }}
      </template>

      <template #document.outgoing_number="{ data }">
        {{ data.document.outgoing_number }}
      </template>

      <template #document.register_number="{ data }">
        {{ data.document.register_number }}
      </template>

      <template #document.register_date="{ data }">
        {{ data.document.register_date }}
      </template>

      <template #status="{ data }">
        <status-chip :status="data.status"/>
      </template>

      <template #document.correspondent.name="{ data }">
        {{ data.document.correspondent?.name }}
      </template>

      <template #document.code="{ data }">
        {{ data.document.code }}
      </template>

      <template #document.grif="{ data }">
        {{ data.document.grif }}
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
