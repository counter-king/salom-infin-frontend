<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegInner } from '../../stores/inner.store'
import { useDocFlowStore } from '../../stores/docflow.store'
// Components
import { DocTypeChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
// Constants
import { R_INNER_COLUMNS } from '../../constants'
// Composable
const docFlowStore = useDocFlowStore()
const regInner = useRegInner()
// Hooks
onMounted(async () => {
  await regInner.actionGetList()
})
// Methods
const openModal = () => {
  docFlowStore.actionLoadFormCreateDocument('Inner')
  docFlowStore.actionToggleModalCreateDocument(true)
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      title="inner"
      :column-menu-items="regInner.headers"
      :storage-columns-name="R_INNER_COLUMNS"
      @emit:reset-headers="regInner.resetHeaders"
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
      :headers="regInner.headers"
      :value="regInner.list"
      :loading="regInner.listLoading"
      :storage-columns-name="R_INNER_COLUMNS"
      expandable
    >
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
