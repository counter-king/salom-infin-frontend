<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegStatement } from "../../stores/statement.store"
// Constants
import { R_STATEMENT_COLUMNS } from "../../constants";
// Components
import { DocTypeChip } from '@/components/Chips'
import { ActionToolbar } from "@/components/Actions";
// Composable
const regStatement = useRegStatement()
// Hooks
onMounted(async () => {
  await regStatement.actionGetList()
})
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
        />
      </template>
    </action-toolbar>

    <base-data-table
      :headers="regStatement.headers"
      :value="regStatement.list"
      :storage-columns-name="R_STATEMENT_COLUMNS"
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
