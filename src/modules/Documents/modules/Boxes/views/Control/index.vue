<script setup>
// Store
import { useControlStore } from '../../stores/control.store'
// Components
import { StatusChip, PriorityChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
// Utils
import { BOXES_CONTROL_COLUMNS } from '../../constants'
// Composable
const controlStore = useControlStore()
// Reactive
const filterKeys = ['approvers', 'author', 'curator', 'signers', 'departments', 'register_number', 'status']
const keysToIncludeOnClearFilter = ['type']
// Methods
const link = (data) => {
  return { name: 'ControlShow', params: { id: data.id } }
}
</script>

<template>
  <div class="control-view">
    <action-toolbar
      title="to-control"
      :column-menu-items="controlStore.headers"
      :storage-columns-name="BOXES_CONTROL_COLUMNS"
      :action-list="controlStore.actionControlList"
      :filter-keys="filterKeys"
      :keys-to-include-on-clear-filter="keysToIncludeOnClearFilter"
      @emit:reset-headers="controlStore.resetHeaders"
    />

    <base-data-table
      :action-list="controlStore.actionControlList"
      :headers="controlStore.headers"
      :value="controlStore.list"
      :total-count="controlStore.totalCount"
      :loading="controlStore.listLoading"
      :storage-columns-name="BOXES_CONTROL_COLUMNS"
      expandable
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => controlStore.headers = val"
    >
      <template #count="{ index, data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ index + 1 }}

          <template v-if="!data.read_time">
            <div class="absolute top-4 left-0 w-[3px] h-6 rounded-2xl bg-primary-500"></div>
          </template>
        </linkable-cell>
      </template>

      <template #document.priority="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          <priority-chip :id="data?.document.priority?.id" />
        </linkable-cell>
      </template>

      <template #document.title="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.title }}
        </linkable-cell>
      </template>

      <template #document.document_type.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.document_type?.name }}
        </linkable-cell>
      </template>

      <template #document.delivery_type.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.delivery_type?.name }}
        </linkable-cell>
      </template>

      <template #document.description="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.description }}
        </linkable-cell>
      </template>

      <template #document.journal.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.journal?.name }}
        </linkable-cell>
      </template>

      <template #document.language.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.language?.name }}
        </linkable-cell>
      </template>

      <template #document.number_of_papers="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.number_of_papers }}
        </linkable-cell>
      </template>

      <template #document.outgoing_date="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.outgoing_date }}
        </linkable-cell>
      </template>

      <template #document.outgoing_number="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.outgoing_number }}
        </linkable-cell>
      </template>

      <template #document.register_number="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.register_number }}
        </linkable-cell>
      </template>

      <template #document.register_date="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.register_date }}
        </linkable-cell>
      </template>

      <template #status="{ data }">
        <linkable-cell
          v-if="data?.status"
          :to="link(data)"
          :is-not-read="!data.read_time"
        >
          <status-chip :status="data?.status"/>
        </linkable-cell>
      </template>

      <template #document.correspondent.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.correspondent?.name }}
        </linkable-cell>
      </template>

      <template #document.code="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.code }}
        </linkable-cell>
      </template>

      <template #document.grif="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data?.document.grif }}
        </linkable-cell>
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
