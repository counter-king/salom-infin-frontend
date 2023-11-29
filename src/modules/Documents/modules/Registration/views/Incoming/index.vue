<script setup>
// Core
import {ref, onMounted, unref } from 'vue'
// Store
import { useRegIncoming } from "../../stores/incoming.store"
import { useDocFlowStore } from '../../stores/docflow.store'
// Constants
import { R_INCOMING_COLUMNS } from "../../constants";
import IncomingForm from '../../components/Form/Incoming.vue'

// Components
import { DocTypeChip, StatusChip, PriorityChip } from '@/components/Chips'
import { ActionToolbar } from "@/components/Actions";
// Composable
const docFlowStore = useDocFlowStore()
const regIncoming = useRegIncoming()
// Reactive
const formRef = ref(null)
const sidebarRef = ref(null)
const sidebar = ref(false)
// Hooks
onMounted(async () => {
  await regIncoming.actionGetList()
})
// Methods
const createDocument = async () => {
  const _sidebarRef = unref(sidebarRef)
  const _formRef = unref(formRef)
  const valid = await _formRef.$v.$validate()

  if(!valid) return

  try {
    _sidebarRef.successButtonLoading = true
    let model = {
      ...regIncoming.detailModel,
      reviewers: regIncoming.detailModel.__reviewers.map(item => ({ user: item.id }))
    }
    await docFlowStore.actionCreateDocument(model)
    _sidebarRef.successButtonLoading = false
    sidebar.value = false
    await regIncoming.actionGetList()
  }
  catch (error) {
    _sidebarRef.successButtonLoading = false
  }
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      title="incoming"
      :column-menu-items="regIncoming.headers"
      :storage-columns-name="R_INCOMING_COLUMNS"
      @emit:reset-headers="regIncoming.resetHeaders"
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
      :headers="regIncoming.headers"
      :value="regIncoming.list"
      :loading="regIncoming.listLoading"
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

    <base-sidebar
      ref="sidebarRef"
      v-model="sidebar"
      title="create-document"
      @emit:cancel-button="(value) => sidebar = value"
      @emit:success-button="createDocument"
    >
      <template #content>
        <incoming-form ref="formRef" />
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>

</style>
