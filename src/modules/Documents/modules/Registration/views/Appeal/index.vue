<script setup>
// Core
import {ref, onMounted, unref } from 'vue'
// Store
import { useRegAppeal } from "../../stores/appeal.store"
import { useDocFlowStore } from '../../stores/docflow.store'
// Constants
import { R_APPEAL_COLUMNS } from "../../constants";
import AppealForm from '../../components/Form/Appeal.vue'

// Components
import { DocTypeChip, StatusChip } from '@/components/Chips'
import { ActionToolbar } from "@/components/Actions";
// Composable
const docFlowStore = useDocFlowStore()
const regAppeal = useRegAppeal()
// Reactive
const formRef = ref(null)
const sidebarRef = ref(null)
const sidebar = ref(false)
// Hooks
onMounted(async () => {
  await regAppeal.actionGetList()
})
// Methods
const createDocument = async () => {
  const _sidebarRef = unref(sidebarRef)
  const _formRef = unref(formRef)
  const valid = await _formRef.$v.$validate()

  if(!valid) return

  try {
    _sidebarRef.successButtonLoading = true
    let appealModel = {
      ...regAppeal.detailModel,
      reviewers: regAppeal.detailModel.__reviewers.map(item => ({ user: item.id }))
    }
    await docFlowStore.actionCreateDocument(appealModel)
    _sidebarRef.successButtonLoading = false
    sidebar.value = false
    await regAppeal.actionGetList()
  }
  catch (error) {
    _sidebarRef.successButtonLoading = false
  }
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
          @click="sidebar = !sidebar"
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

    <base-sidebar
      ref="sidebarRef"
      v-model="sidebar"
      title="create-document"
      @emit:cancel-button="(value) => sidebar = value"
      @emit:success-button="createDocument"
    >
      <template #content>
        <appeal-form ref="formRef" />
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>

</style>
