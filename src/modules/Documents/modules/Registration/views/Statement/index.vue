<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegStatement } from '../../stores/statement.store'
import { useDocFlowStore } from '../../stores/docflow.store'
// Components
import { DocTypeChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
// Constants
import { R_STATEMENT_COLUMNS } from '../../constants'
// Composable
const docFlowStore = useDocFlowStore()
const regStatement = useRegStatement()
// Hooks
onMounted(async () => {
  await regStatement.actionGetList()
})
// Methods
const openModal = () => {
  docFlowStore.actionLoadFormCreateDocument('Statement')
  docFlowStore.actionToggleModalCreateDocument(true)
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      title="statement"
      :column-menu-items="regStatement.headers"
      :storage-columns-name="R_STATEMENT_COLUMNS"
      @emit:reset-headers="regStatement.resetHeaders"
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
      :headers="regStatement.headers"
      :value="regStatement.list"
      :loading="regStatement.listLoading"
      :storage-columns-name="R_STATEMENT_COLUMNS"
      expandable
    >
      <template #correspondent="{ data }">
        {{data.correspondent.name}}
      </template>

      <template #document_type="{ data }">
        <doc-type-chip :type="data.document_type.name"/>
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
