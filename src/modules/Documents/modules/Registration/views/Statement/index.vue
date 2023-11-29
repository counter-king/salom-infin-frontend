<script setup>
// Core
import { ref, onMounted, unref } from 'vue'
// Store
import { useRegStatement } from "../../stores/statement.store"
import { useDocFlowStore } from '../../stores/docflow.store'
// Constants
import { R_STATEMENT_COLUMNS } from "../../constants";
import StatementForm from '../../components/Form/Statement.vue'
// Composable
import { DocTypeChip } from '@/components/Chips'
import { ActionToolbar } from "@/components/Actions";
// Composable
const docFlowStore = useDocFlowStore()
const regStatement = useRegStatement()
// Reactive
const formRef = ref(null)
const sidebarRef = ref(null)
const sidebar = ref(false)
// Hooks
onMounted(async () => {
  await regStatement.actionGetList()
})
// Methods
const createDocument = async () => {
  const _sidebarRef = unref(sidebarRef)
  const _formRef = unref(formRef)
  const valid = await _formRef.$v.$validate()

  if(!valid) return

  try {
    _sidebarRef.successButtonLoading = true
    let statementnModel = {
      ...regStatement.detailModel,
      reviewers: regStatement.detailModel.__reviewers.map(item => ({ user: item.id }))
    }
    await docFlowStore.actionCreateDocument(statementnModel)
    _sidebarRef.successButtonLoading = false
    sidebar.value = false
    await regStatement.actionGetList()
  }
  catch (error) {
    _sidebarRef.successButtonLoading = false
  }
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
          @click="sidebar = !sidebar"
        />
      </template>
    </action-toolbar>

    <base-data-table
      :headers="regStatement.headers"
      :value="regStatement.list"
      :loading="regStatement.listLoading"
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

    <base-sidebar
      ref="sidebarRef"
      v-model="sidebar"
      title="create-document"
      @emit:cancel-button="(value) => sidebar = value"
      @emit:success-button="createDocument"
    >
      <template #content>
        <statement-form ref="formRef" />
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>

</style>
