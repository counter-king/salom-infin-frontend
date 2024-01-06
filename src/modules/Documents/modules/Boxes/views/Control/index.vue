<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useControlStore } from '../../stores/control.store'
// Components
import { StatusChip, PriorityChip } from '@/components/Chips'
import { LinkableCell } from '@/components/Table'
// Utils
import { BOXES_CONTROL_COLUMNS } from '../../constants'
// Composable
const controlStore = useControlStore()
// Hooks
onMounted(async () => {
  await controlStore.actionControlList()
})
// Methods
const link = (data) => {
  return { name: 'ControlShow', params: { id: data.id } }
}
</script>

<template>
  <div class="control-view">
    <base-data-table
      :headers="controlStore.headers"
      :value="controlStore.list"
      :loading="controlStore.listLoading"
      :storage-columns-name="BOXES_CONTROL_COLUMNS"
      expandable
    >
      <template #document.priority="{ data }">
        <linkable-cell :to="link(data)">
          <priority-chip :id="data?.document.priority?.id" />
        </linkable-cell>
      </template>

      <template #document.title="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.title }}
        </linkable-cell>
      </template>

      <template #document.document_type.name="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.document_type?.name }}
        </linkable-cell>
      </template>

      <template #document.delivery_type.name="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.delivery_type?.name }}
        </linkable-cell>
      </template>

      <template #document.description="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.description }}
        </linkable-cell>
      </template>

      <template #document.journal.name="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.journal?.name }}
        </linkable-cell>
      </template>

      <template #document.language.name="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.language?.name }}
        </linkable-cell>
      </template>

      <template #document.number_of_papers="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.number_of_papers }}
        </linkable-cell>
      </template>

      <template #document.outgoing_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.outgoing_date }}
        </linkable-cell>
      </template>

      <template #document.outgoing_number="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.outgoing_number }}
        </linkable-cell>
      </template>

      <template #document.register_number="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.register_number }}
        </linkable-cell>
      </template>

      <template #document.register_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.register_date }}
        </linkable-cell>
      </template>

      <template #status="{ data }">
        <linkable-cell :to="link(data)">
          <status-chip :status="data?.status"/>
        </linkable-cell>
      </template>

      <template #document.correspondent.name="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.correspondent?.name }}
        </linkable-cell>
      </template>

      <template #document.code="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.code }}
        </linkable-cell>
      </template>

      <template #document.grif="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.document.grif }}
        </linkable-cell>
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
