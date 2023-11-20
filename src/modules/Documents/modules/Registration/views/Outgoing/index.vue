<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegOutgoing } from "../../stores/outgoing.store"
// Constants
import { R_OUTGOING_COLUMNS } from "../../constants";
// Components
import { DocTypeChip, StatusChip } from '@/components/Chips'
import { ActionToolbar } from "@/components/Actions";
// Composable
const regOutgoing = useRegOutgoing()
// Hooks
onMounted(async () => {
  await regOutgoing.actionGetList()
})
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
        />
      </template>
    </action-toolbar>

    <base-data-table
      :headers="regOutgoing.headers"
      :value="regOutgoing.list"
      :storage-columns-name="R_OUTGOING_COLUMNS"
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
