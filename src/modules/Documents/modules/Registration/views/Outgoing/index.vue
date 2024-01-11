<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegOutgoing } from '../../stores/outgoing.store'
import { useDocFlowStore } from '../../stores/docflow.store'
// Components
import { DocTypeChip, StatusChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
// Constants
import { R_OUTGOING_COLUMNS } from '../../constants'
// Composable
const docFlowStore = useDocFlowStore()
const regOutgoing = useRegOutgoing()
// Hooks
onMounted(async () => {
  await regOutgoing.actionOutgoingGetList()
})
// Methods
const openModal = () => {
  docFlowStore.actionLoadFormCreateDocument('Outgoing')
  docFlowStore.actionToggleModalCreateDocument(true)
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      title="outgoing"
      :column-menu-items="regOutgoing.headers"
      :storage-columns-name="R_OUTGOING_COLUMNS"
      @emit:reset-headers="regOutgoing.resetHeaders"
    >
      <template #end>
        <base-button
          label="create"
          icon-left="AddIcon"
          rounded
          type="button"
          @click="openModal"
        />
      </template>
    </action-toolbar>

    <base-data-table
      :headers="regOutgoing.headers"
      :value="regOutgoing.list"
      :loading="regOutgoing.listLoading"
      :storage-columns-name="R_OUTGOING_COLUMNS"
      expandable
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
