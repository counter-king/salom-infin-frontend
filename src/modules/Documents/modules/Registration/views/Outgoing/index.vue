<script setup>
// Core
import { ref, onMounted, unref } from 'vue'
// Store
import { useRegOutgoing } from "../../stores/outgoing.store"
import { useDocFlowStore } from '../../stores/docflow.store'
// Constants
import { R_OUTGOING_COLUMNS } from "../../constants";
import OutgoingForm from '../../components/Form/Outgoing.vue'


// Components
import { DocTypeChip, StatusChip } from '@/components/Chips'
import { ActionToolbar } from "@/components/Actions";
// Composable
const docFlowStore = useDocFlowStore()
const regOutgoing = useRegOutgoing()
// Reactive
const formRef = ref(null)
const sidebarRef = ref(null)
const sidebar = ref(false)
// Hooks
onMounted(async () => {
  await regOutgoing.actionGetList()
})
// Methods
const createDocument = async () => {
  const _sidebarRef = unref(sidebarRef)
  const _formRef = unref(formRef)
  const valid = await _formRef.$v.$validate()

  if(!valid) return

  try {
    _sidebarRef.successButtonLoading = true
    await docFlowStore.actionCreateDocument(regOutgoing.detailModel)
    _sidebarRef.successButtonLoading = false
    sidebar.value = false
    await regOutgoing.actionGetList()
  }
  catch (error) {
    _sidebarRef.successButtonLoading = false
  }
}
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
          @click="sidebar = !sidebar"
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

    <base-sidebar
      ref="sidebarRef"
      v-model="sidebar"
      title="create-document"
      @emit:cancel-button="(value) => sidebar = value"
      @emit:success-button="createDocument"
    >
      <template #content>
        <outgoing-form ref="formRef" />
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>

</style>
