<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegIncoming } from '../../stores/incoming.store'
import { useDocFlowStore } from '../../stores/docflow.store'
// Components
import { DocTypeChip, StatusChip, PriorityChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
// Constants
import { R_INCOMING_COLUMNS } from '../../constants'
// Utils
import { formatDate } from '@/utils/formatDate'
// Composable
const docFlowStore = useDocFlowStore()
const regIncoming = useRegIncoming()
// Hooks
onMounted(async () => {
  await regIncoming.actionGetList()
})
// Methods
const openModal = () => {
  docFlowStore.actionLoadFormCreateDocument('Incoming')
  docFlowStore.actionToggleModalCreateDocument(true)
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
          @click="openModal"
        />
      </template>
    </action-toolbar>

    <base-data-table
      :headers="regIncoming.headers"
      :value="regIncoming.list"
      :loading="regIncoming.listLoading"
      :storage-columns-name="R_INCOMING_COLUMNS"
      expandable
      @emit:set-store-headers="(val) => regIncoming.headers = val"
    >
      <template #priority="{ data }">
        <linkable-cell :to="link(data)">
	        <priority-chip :id="data.priority?.id" />
        </linkable-cell>
      </template>

      <template #title="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.title }}
        </linkable-cell>
      </template>

      <template #document_type="{ data }">
        <linkable-cell :to="link(data)">
          <doc-type-chip :type="data.document_type?.name"/>
        </linkable-cell>
      </template>

      <template #delivery_type="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.delivery_type?.name }}
        </linkable-cell>
      </template>

      <template #description="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.description }}
        </linkable-cell>
      </template>

      <template #journal="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.journal.name }}
        </linkable-cell>
      </template>

      <template #language="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.language?.name }}
        </linkable-cell>
      </template>

      <template #number_of_papers="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.number_of_papers }}
        </linkable-cell>
      </template>

      <template #outgoing_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDate(data.outgoing_date) }}
        </linkable-cell>
      </template>

      <template #outgoing_number="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.outgoing_number }}
        </linkable-cell>
      </template>

      <template #register_number="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.register_number }}
        </linkable-cell>
      </template>

      <template #register_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDate(data.register_date) }}
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

      <template #status="{ data }">
        <linkable-cell :to="link(data)">
          <status-chip :status="data.status"/>
        </linkable-cell>
      </template>

      <template #correspondent="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.correspondent?.name }}
        </linkable-cell>
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
