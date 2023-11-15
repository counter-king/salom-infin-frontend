<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegIncoming } from "../../stores/incoming.store"
// Constants
import { R_INCOMING_COLUMNS } from "../../constants";
// Components
import { DocTypeChip, StatusChip, PriorityChip } from '@/components/Chips'
import { ActionToolbar } from "@/components/Actions";
// Composable
const regStore = useRegIncoming()
// Hooks
onMounted(async () => {
  await regStore.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      title="incoming"
      :column-menu-items="regStore.headers"
      :storage-columns-name="R_INCOMING_COLUMNS"
      @emit:reset-headers="regStore.resetHeaders"
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
      :headers="regStore.headers"
      :value="regStore.list"
      :storage-columns-name="R_INCOMING_COLUMNS"
    >
      <template  #priority="{ data }">
        <priority-chip :id="data.priority.id" />
      </template>

      <template  #delivery_type="{ data }">
        {{data.delivery_type.name}}
      </template>

      <template  #journal="{ data }">
        {{data.journal.name}}
      </template>

      <template  #language="{ data }">
        {{data.language.name}}
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

      <template #correspondent="{ data }">
        {{data.correspondent.name}}
      </template>

      <template #action="{ data }">
        <base-button
          color="text-primary-900"
          icon-left="AltArrowDownIcon"
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
