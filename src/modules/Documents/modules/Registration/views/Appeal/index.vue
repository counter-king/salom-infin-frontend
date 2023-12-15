<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegAppeal } from '../../stores/appeal.store'
import { useDocFlowStore } from '../../stores/docflow.store'
// Components
import { DocTypeChip, StatusChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
// Constants
import { R_APPEAL_COLUMNS } from '../../constants'
// Composable
const docFlowStore = useDocFlowStore()
const regAppeal = useRegAppeal()
// Hooks
onMounted(async () => {
  await regAppeal.actionGetList()
})
// Methods
const openModal = () => {
  docFlowStore.actionLoadFormCreateDocument('Appeal')
  docFlowStore.actionToggleModalCreateDocument(true)
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      title="appeal"
      :column-menu-items="regAppeal.headers"
      :storage-columns-name="R_APPEAL_COLUMNS"
      @emit:reset-headers="regAppeal.resetHeaders"
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
      :headers="regAppeal.headers"
      :value="regAppeal.list"
      :storage-columns-name="R_APPEAL_COLUMNS"
      :loading="regAppeal.listLoading"
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
