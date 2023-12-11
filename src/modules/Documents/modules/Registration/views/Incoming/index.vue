<script setup>
// Core
import { ref, onMounted, unref } from 'vue'
// Store
import { useRegIncoming } from '../../stores/incoming.store'
import { useDocFlowStore } from '../../stores/docflow.store'
// Components
import { DocTypeChip, StatusChip, PriorityChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
import IncomingForm from '../../components/Form/Incoming.vue'
// Constants
import { R_INCOMING_COLUMNS } from '../../constants'
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
const link = (data) => {
  return { name: 'RegistrationIncomingShow', params: { id: data.id } }
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
      expandable
    >
      <template #priority="{ data }">
        <linkable-cell :to="link(data)">
          <priority-chip :id="data.priority.id" />
        </linkable-cell>
      </template>

      <template #delivery_type="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.delivery_type.name }}
        </linkable-cell>
      </template>

      <template #journal="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.journal.name }}
        </linkable-cell>
      </template>

      <template #language="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.language.name }}
        </linkable-cell>
      </template>

      <template #document_type="{ data }">
        <linkable-cell :to="link(data)">
          <doc-type-chip :type="data.document_type.name"/>
        </linkable-cell>
      </template>

      <template #status="{ data }">
        <linkable-cell :to="link(data)">
          <status-chip :status="data.status"/>
        </linkable-cell>
      </template>

      <template #reviewers="{ data }">
        <linkable-cell :to="link(data)">
          <base-avatar-group
            :items="data.reviewers"
            shape="circle"
            avatar-classes="w-8 h-8"
          />
        </linkable-cell>
      </template>

      <template #correspondent="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.correspondent.name }}
        </linkable-cell>
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
