<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegOrderInstruction } from '../../stores/orderInstruction.store'
import { useDocFlowStore } from '../../stores/docflow.store'
// Components
import { DocTypeChip, StatusChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
// Constants
import { R_ORDERINSTRUCTION_COLUMNS } from '../../constants'
// Composable
const docFlowStore = useDocFlowStore()
const regOrderInstruction = useRegOrderInstruction()
// Hooks
onMounted(async () => {
  await regOrderInstruction.actionOrderGetList()
})
// Methods
const openModal = () => {
  docFlowStore.actionLoadFormCreateDocument('OrderInstruction')
  docFlowStore.actionToggleModalCreateDocument(true)
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      title="orderInstruction"
      :column-menu-items="regOrderInstruction.headers"
      :storage-columns-name="R_ORDERINSTRUCTION_COLUMNS"
      @emit:reset-headers="regOrderInstruction.resetHeaders"
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
      :headers="regOrderInstruction.headers"
      :value="regOrderInstruction.list"
      :loading="regOrderInstruction.listLoading"
      :storage-columns-name="R_ORDERINSTRUCTION_COLUMNS"
      expandable
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
